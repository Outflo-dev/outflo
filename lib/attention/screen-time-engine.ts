/* ==========================================================
   OUTFLO — SCREEN TIME ENGINE
   File: lib/attention/screen-time-engine.ts
   Scope: Own runtime capture and deterministic close for Outflō screen sessions
   Last Updated:
   - ms: <PASTE_USER_TIMESTAMP_MS>
   - iso: <PASTE_USER_TIMESTAMP_ISO>
   - note: add Outflō-only screen-session runtime engine
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
type ScreenSessionReason =
  | "init"
  | "focus"
  | "blur"
  | "visibilitychange"
  | "pagehide"
  | "destroy";

type ActiveSession = {
  started_ms: number;
};

type ScreenSessionWriteBody = {
  started_ms: number;
};

/* ------------------------------
   Constants
-------------------------------- */
const SCREEN_SESSION_ROUTE = "/api/attention/screen-session";

/* ------------------------------
   Helpers
-------------------------------- */
function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function isActiveNow(): boolean {
  if (!isBrowser()) return false;
  return document.visibilityState === "visible" && document.hasFocus();
}

async function writeCompletedSession(body: ScreenSessionWriteBody): Promise<void> {
  await fetch(SCREEN_SESSION_ROUTE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    keepalive: true,
    body: JSON.stringify(body),
  });
}

/* ------------------------------
   Engine
-------------------------------- */
export class ScreenTimeEngine {
  private activeSession: ActiveSession | null = null;
  private isClosing = false;
  private isStarted = false;

  private readonly handleFocus = () => {
    this.reconcile("focus");
  };

  private readonly handleBlur = () => {
    this.reconcile("blur");
  };

  private readonly handleVisibilityChange = () => {
    this.reconcile("visibilitychange");
  };

  private readonly handlePageHide = () => {
    void this.closeActiveSession("pagehide");
  };

  start(): void {
    if (!isBrowser()) return;
    if (this.isStarted) return;

    this.isStarted = true;

    window.addEventListener("focus", this.handleFocus);
    window.addEventListener("blur", this.handleBlur);
    window.addEventListener("pagehide", this.handlePageHide);
    document.addEventListener("visibilitychange", this.handleVisibilityChange);

    this.reconcile("init");
  }

  async destroy(): Promise<void> {
    if (!isBrowser()) return;
    if (!this.isStarted) return;

    window.removeEventListener("focus", this.handleFocus);
    window.removeEventListener("blur", this.handleBlur);
    window.removeEventListener("pagehide", this.handlePageHide);
    document.removeEventListener("visibilitychange", this.handleVisibilityChange);

    this.isStarted = false;

    await this.closeActiveSession("destroy");
  }

  private reconcile(reason: ScreenSessionReason): void {
    if (isActiveNow()) {
      this.ensureActiveSession(reason);
      return;
    }

    void this.closeActiveSession(reason);
  }

  private ensureActiveSession(_reason: ScreenSessionReason): void {
    if (this.activeSession) return;

    this.activeSession = {
      started_ms: Date.now(),
    };
  }

  private async closeActiveSession(_reason: ScreenSessionReason): Promise<void> {
    if (!this.activeSession) return;
    if (this.isClosing) return;

    this.isClosing = true;

    const session = this.activeSession;
    this.activeSession = null;

    try {
      await writeCompletedSession({
        started_ms: session.started_ms,
      });
    } catch {
      // Intentionally swallow runtime write failures here.
      // Canonical truth must not duplicate due to local retry loops.
    } finally {
      this.isClosing = false;
    }
  }
}

/* ------------------------------
   Factory
-------------------------------- */
export function createScreenTimeEngine(): ScreenTimeEngine {
  return new ScreenTimeEngine();
}