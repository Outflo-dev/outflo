/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT USD TILE
   File: app/app/environment/main/view/context/tiles/EnvironmentContextUsdTile.tsx
   Scope: Own Environment USD tile identity and local currency mark
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import {
    VISUAL,
} from "../../../../../../../components/system/primitives/visuals";

import EnvironmentContextMetric from "../primitives/EnvironmentContextMetric";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentContextUsdTileProps = {
    value: string;
};

/* ------------------------------
   Styles
-------------------------------- */
const USD_MARK_STYLE: CSSProperties = {
    display: VISUAL.display[6],
    alignItems: "center",
    justifyContent: "center",

    width: 22,
    height: 22,

    fontFamily: VISUAL.type.family[2],
    fontSize: 21,
    fontWeight: VISUAL.type.weight[8],
    lineHeight: 1,
    letterSpacing: "-0.04em",

    transform: "translateY(-1px)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentContextUsdTile({
    value,
}: EnvironmentContextUsdTileProps) {
    return (
        <EnvironmentContextMetric
            label="USD"
            value={value}
            mark={
                <span style={USD_MARK_STYLE}>
                    $
                </span>
            }
            accent={VISUAL.state.good[18]}
            ariaLabel={`${value} US dollars`}
        />
    );
}