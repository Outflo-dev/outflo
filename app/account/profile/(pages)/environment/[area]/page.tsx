/* ==========================================================
   OUTFLO — PROFILE ENVIRONMENT CONTROL PAGE
   File: app/account/profile/(pages)/environment/[area]/page.tsx
   Scope: Render environment category control switches
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add environment category control drilldown route
   ========================================================== */

export const dynamic = "force-dynamic";

/* ------------------------------
   Imports
-------------------------------- */
import EnvironmentControlController from "./EnvironmentControlController";

/* ------------------------------
   Types
-------------------------------- */
type PageProps = {
    params: Promise<{
        area: string;
    }>;
};

/* ------------------------------
   Page
-------------------------------- */
export default async function Page({ params }: PageProps) {
    const { area } = await params;

    return <EnvironmentControlController area={area} />;
}