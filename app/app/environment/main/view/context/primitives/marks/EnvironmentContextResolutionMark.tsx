/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT RESOLUTION MARK
   File: app/app/environment/main/view/context/primitives/marks/EnvironmentContextResolutionMark.tsx
   Scope: Render the Environment resolution-state mark
   ========================================================== */

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentContextResolutionMark() {
    return (
        <svg
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="1.5"
            />

            <path
                d="M7.5 8.25L12 12M16.5 8.25L12 12M12 16.75V12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <circle
                cx="7.5"
                cy="8.25"
                r="1.15"
                fill="currentColor"
            />

            <circle
                cx="16.5"
                cy="8.25"
                r="1.15"
                fill="currentColor"
            />

            <circle
                cx="12"
                cy="16.75"
                r="1.15"
                fill="currentColor"
            />

            <circle
                cx="12"
                cy="12"
                r="1.6"
                fill="currentColor"
            />
        </svg>
    );
}