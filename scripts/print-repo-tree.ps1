##### ==========================================================
##### OUTFLO - REPOSITORY TREE PRINTER
##### File: scripts/print-repo-tree.ps1
##### Scope: Generate current repository tree, timestamped snapshots, and terminal-only subsection views
##### ==========================================================

param(
  [switch]$WriteToDocs,
  [int]$MaxDepth = 6,
  [string]$Only
)

$ErrorActionPreference = "Stop"

##### ------------------------------
##### Repo Root + Output Paths
##### ------------------------------
$RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
Set-Location $RepoRoot

$RepositoryDir = Join-Path $RepoRoot "docs\repository"
$CurrentDir = Join-Path $RepositoryDir "current"
$SnapshotsDir = Join-Path $RepositoryDir "snapshots"

$CurrentOutPath = Join-Path $CurrentDir "repository-tree.txt"

##### ------------------------------
##### Config
##### ------------------------------
$IncludeRoots = @(
  "app",
  "components",
  "hooks",
  "lib",
  "public",
  "docs",
  "scripts"
)

$ExcludeDirs = @(
  "node_modules",
  ".next",
  ".git",
  ".vercel",
  ".turbo",
  "dist",
  "build",
  "out",
  "coverage"
)

$ExcludeFiles = @(
  ".DS_Store"
)

##### ------------------------------
##### Guards
##### ------------------------------
if ($WriteToDocs -and $Only) {
  throw "Do not combine -WriteToDocs with -Only. Use -Only for terminal preview only."
}

##### ------------------------------
##### Helpers
##### ------------------------------
function Is-ExcludedPath {
  param([string]$FullName)

  foreach ($d in $ExcludeDirs) {
    $pattern = "(^|[\\/])$([Regex]::Escape($d))([\\/]|$)"
    if ($FullName -match $pattern) {
      return $true
    }
  }

  return $false
}

function Is-ExcludedFile {
  param([string]$Name)

  return $ExcludeFiles -contains $Name
}

function Get-Children {
  param([string]$Path)

  Get-ChildItem -LiteralPath $Path -Force |
    Where-Object {
      if ($_.PSIsContainer) {
        -not (Is-ExcludedPath $_.FullName)
      }
      else {
        (-not (Is-ExcludedPath $_.FullName)) -and (-not (Is-ExcludedFile $_.Name))
      }
    } |
    Sort-Object @{ Expression = { -not $_.PSIsContainer } }, Name
}

function Print-Node {
  param(
    [string]$Path,
    [string]$Prefix,
    [int]$Depth,
    [int]$LimitDepth
  )

  if ($Depth -gt $LimitDepth) {
    return @()
  }

  $lines = @()
  $items = @(Get-Children -Path $Path)

  for ($i = 0; $i -lt $items.Count; $i++) {
    $item = $items[$i]
    $isLast = ($i -eq $items.Count - 1)

    $branch = "+-- "
    $nextPrefix = $Prefix + $(if ($isLast) { "    " } else { "|   " })

    if ($item.PSIsContainer) {
      $lines += ($Prefix + $branch + $item.Name + "\")
      $lines += Print-Node -Path $item.FullName -Prefix $nextPrefix -Depth ($Depth + 1) -LimitDepth $LimitDepth
    }
    else {
      $lines += ($Prefix + $branch + $item.Name)
    }
  }

  return $lines
}

function Ensure-Directory {
  param([string]$Path)

  if (!(Test-Path -LiteralPath $Path)) {
    New-Item -ItemType Directory -Path $Path | Out-Null
  }
}

function Build-TreeLines {
  param(
    [string]$RootPath,
    [string]$Label,
    [int]$DepthLimit
  )

  $lines = @()
  $lines += ($Label + "\")
  $lines += Print-Node -Path $RootPath -Prefix "" -Depth 1 -LimitDepth $DepthLimit
  $lines += ""

  return $lines
}

##### ------------------------------
##### Build Output
##### ------------------------------
$Now = Get-Date
$UnixSeconds = ([DateTimeOffset]$Now).ToUnixTimeSeconds()
$HumanStamp = $Now.ToString("yyyy-MM-dd_HH-mm")
$SnapshotFileName = "$UnixSeconds" + "__" + "$HumanStamp.txt"
$SnapshotOutPath = Join-Path $SnapshotsDir $SnapshotFileName

$Lines = @()
$Lines += "OUTFLO - REPOSITORY TREE"
$Lines += ("Generated: " + $Now.ToString("yyyy-MM-dd HH:mm:ss"))
$Lines += ("Unix: " + $UnixSeconds)
$Lines += ("Root: " + $RepoRoot)
$Lines += ""

if ($Only) {
  $NormalizedOnly = $Only.Trim().TrimStart('\').TrimStart('/')
  $OnlyPath = Join-Path $RepoRoot $NormalizedOnly

  if (!(Test-Path -LiteralPath $OnlyPath)) {
    $Lines += ($NormalizedOnly + "\ (missing)")
  }
  else {
    $Lines += Build-TreeLines -RootPath $OnlyPath -Label $NormalizedOnly -DepthLimit $MaxDepth
  }
}
else {
  foreach ($root in $IncludeRoots) {
    $full = Join-Path $RepoRoot $root

    if (!(Test-Path -LiteralPath $full)) {
      $Lines += ($root + "\ (missing)")
      $Lines += ""
      continue
    }

    $Lines += Build-TreeLines -RootPath $full -Label $root -DepthLimit $MaxDepth
  }
}

##### ------------------------------
##### Output
##### ------------------------------
if ($WriteToDocs) {
  Ensure-Directory -Path $RepositoryDir
  Ensure-Directory -Path $CurrentDir
  Ensure-Directory -Path $SnapshotsDir

  $Lines | Set-Content -LiteralPath $CurrentOutPath -Encoding UTF8
  $Lines | Set-Content -LiteralPath $SnapshotOutPath -Encoding UTF8

  Write-Host ("Wrote current tree: " + $CurrentOutPath)
  Write-Host ("Wrote snapshot: " + $SnapshotOutPath)
}
else {
  $Lines | ForEach-Object { Write-Output $_ }
}