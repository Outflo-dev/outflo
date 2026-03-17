# OUTFLO — HOME INTEGRATION FLOW v1

Status: Locked  
Scope: Home orchestration architecture

---

## Layer Hierarchy

environment-engine.ts  
→ Pure orbital math  
→ No I/O  
→ Deterministic  

use-environment.ts  
→ Time cadence (1s interval)  
→ Feeds engine  
→ No location logic  

get-device-location.ts  
→ Browser geolocation wrapper  
→ Promise-based  
→ No UI  

resolve-location.ts  
→ Determines authoritative source  
→ Priority:
   1. Device
   2. Manual
   3. None  

get-weather.ts  
→ Provider-isolated weather fetch  
→ Normalized Outflō weather model  
→ Forecast-ready  

use-home-environment.ts  
→ Orchestration layer  
→ Calls location  
→ Resolves authority  
→ Fetches weather  
→ Feeds useEnvironment  
→ Returns Home-ready state  

/app/home/page.tsx  
→ Rendering only  
→ No business logic  
→ No provider knowledge  

---

## Data Flow

Device → Resolver → Weather → Environment → Home Render

Flow is strictly top-down.

No lateral calls.
No upward mutation.

---

## Authority Model

Location source priority:
1. Device (if granted)
2. Manual (if set)
3. None (time-only mode)

Weather never overrides location.
Environment never overrides weather.
Home never computes state.

---

## Non-Negotiables

- Environment engine must remain deterministic.
- Weather provider must remain isolated.
- Home must not contain orchestration logic.
- No layer may reach across abstraction boundaries.