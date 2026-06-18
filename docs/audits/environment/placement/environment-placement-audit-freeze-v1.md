/* ==========================================================
   OUTFLO — ENVIRONMENT PLACEMENT AUDIT
   STATUS: ACTIVE
   VERSION: v2
   PURPOSE: Canonical ownership map for Environment
   LAST UPDATED: 2026-06-11
   ========================================================== */

THREAD MODE
-----------

Environment is undergoing a placement audit.

Goals:

- stop patching from memory
- map ownership
- identify bloat
- identify future split candidates
- lock canonical placement
- establish confidence before DB/settings work

This is NOT:

- a refactor pass
- a feature pass
- an optimization pass

It is an ownership audit.


PRIMARY CONCLUSION
------------------

Environment architecture has earned confidence.

Primary risk:

UNPLACED COMPLEXITY

not

BROKEN ARCHITECTURE.

Complexity comes from:

- repo growth
- repeated visual patterns
- compiler expansion
- ownership boundaries
- future runtime/DB wiring


AUDIT STATUS
------------

Completed:

✓ lib
✓ app-state
✓ page/controller
✓ compiler
✓ view
✓ frame
✓ scene
✓ header
✓ hero
✓ forecast
✓ summary
✓ data
✓ records
✓ footer

Remaining:

- API runtime
- environment context
- ingest routes
- MQTT ingest
- profile environment
- DB ownership
- settings ownership


==========================================================
LIB AUDIT
==========================================================

KEEP

lib/environment/environment-engine.ts

Owns:

- baseline
- device/manual/off
- weather eligibility
- snapshot eligibility
- fallback reasons
- active manual place

Does NOT own:

- DB
- provider fetch
- UI
- weather adapters
- snapshot writes

Status:

KEEP
CANONICAL

Future:

Split only if naturally earned.


----------------------------------------------------------

KEEP

lib/environment/baseline-place.ts

System owned baseline render location.

System baseline:

NOT:

- default user place
- user truth
- snapshot truth

KEEP

Minor:

placeholder timestamp.


----------------------------------------------------------

KEEP

lib/environment/use-environment.ts

Client memo wrapper.

Owns:

client resolution only.

Never:

DB
weather
permission
policy

KEEP.


----------------------------------------------------------

KEEP FOR NOW

lib/environment/mqtt/environment-mqtt-worker.ts

Current responsibilities:

- mqtt boot
- env loading
- topic parsing
- payload parsing
- emitter lookup
- event insert
- snapshot upsert
- logging

Finding:

Largest split candidate.

DO NOT SPLIT.

Dedicated ingest audit later.


----------------------------------------------------------

KEEP

lib/location/get-device-location.ts

Location acquisition

!=

Environment participation.

Correct placement.


==========================================================
APP STATE AUDIT
==========================================================

KEEP

environment-units.ts

Owns:

- types
- defaults
- validators

Kelvin survives.

Kelvin remains canon.


----------------------------------------------------------

KEEP

environment-preferences.ts

Owns:

- modes
- defaults
- validators
- normalization

Future:

May split later.

Not now.


----------------------------------------------------------

WATCH

environment-preferences.server.ts

Currently temperature.

Likely future Environment persistence owner.

No action.


----------------------------------------------------------

KEEP

environment-preferences.actions.ts

Simple server action.

Good placement.


==========================================================
APP / ENVIRONMENT AUDIT
==========================================================

KEEP

page.tsx

Good server boundary.

Loads:

- auth
- snapshot
- preferences

Hands to controller.


----------------------------------------------------------

KEEP

EnvironmentController

Owns:

- refresh
- router
- state
- model compilation

Does NOT own:

business logic.


----------------------------------------------------------

KEEP

environment.sections.ts

Thin wrapper.


----------------------------------------------------------

KEEP

environment.types.ts

Canonical display contract.

Watch growth.


==========================================================
COMPILER AUDIT
==========================================================

Architecture:

GOOD

Current:

environment.compiler
environment.display
environment.forecast
environment.location
environment.record
environment.summary
environment.weather
environment.compiler.utils

Previous giant compiler successfully decomposed.

KEEP.


----------------------------------------------------------

environment.display

KEEP

System units.

Kelvin harmless.


----------------------------------------------------------

environment.forecast

KEEP

Forecast compilation.


----------------------------------------------------------

environment.location

KEEP

Place/source formatting.


----------------------------------------------------------

environment.record

KEEP

Proof model.


----------------------------------------------------------

environment.summary

KEEP

Weather
Atmosphere
Sun
Air Quality
Altitude

Taxonomy preserved.


----------------------------------------------------------

environment.weather

KEEP

Scene ownership.

Watch:

future asset map.


----------------------------------------------------------

environment.compiler.utils

KEEP

Shared helpers.


==========================================================
VIEW AUDIT
==========================================================

EnvironmentView

KEEP

Good composition root.


----------------------------------------------------------

EnvironmentRouteFrame

KEEP

Thin AppFrame wrapper.


----------------------------------------------------------

EnvironmentAtmosphere

KEEP

Simple scene owner.

Future atmosphere work belongs here.


----------------------------------------------------------

EnvironmentFooter

KEEP

Correct substrate footer.

Copy reinforces permission boundary.


==========================================================
HEADER AUDIT
==========================================================

KEEP

EnvironmentHeader

EnvironmentHeaderFrame

EnvironmentBackButton

EnvironmentRefreshButton

EnvironmentSubstrateSelector

EnvironmentSettingsMenu

EnvironmentMenuButton

Finding:

Good ownership.

Future:

Menu primitive comparison only.


==========================================================
HERO AUDIT
==========================================================

KEEP

EnvironmentHeroSection
EnvironmentHeroStage
EnvironmentHeroCard
EnvironmentHeroContent
EnvironmentHeroTemperature
EnvironmentHeroMeta
EnvironmentHeroLivePill
EnvironmentHeroWeatherObject
EnvironmentHeroIcon

Finding:

Excellent decomposition.

Watch:

Hero icon asset map.


==========================================================
FORECAST AUDIT
==========================================================

KEEP

EnvironmentForecastSection

EnvironmentForecastHeader

EnvironmentForecastStrip

EnvironmentForecastItem

Watch:

Chevron interaction.

Duplicate hero icon mapping.

Possible shared asset map later.


==========================================================
SUMMARY AUDIT
==========================================================

KEEP

EnvironmentSummarySection

Watch:

Subtitle hidden.

Grid pattern later.


----------------------------------------------------------

KEEP

EnvironmentSummaryTile

Watch:

title-driven icon mapping.

Future:

compiler/model kind.

No extraction.


==========================================================
DATA AUDIT
==========================================================

KEEP

EnvironmentDataSection

KEEP

EnvironmentFieldCard

Watch:

label-driven accent mapping.

Future:

compiler/model semantic kinds.

No extraction.


==========================================================
RECORDS AUDIT
==========================================================

KEEP

EnvironmentRecordSection

KEEP

EnvironmentRecordHeader

Watch:

View-all affordance should become intentional navigation.


----------------------------------------------------------

KEEP

EnvironmentRecordCard

Watch:

Chevron implies future interaction.

Local RecordIcon acceptable.

No extraction.


==========================================================
UI FREEZE
==========================================================

Environment landing UI is structurally sound.

No rebuild.

No extraction.

No opportunistic rewrites.

UI should change only when:

- ownership changes
- runtime/API demands it
- dedicated visual pass exists

Current UI risk:

placement drift

not

structural failure.


==========================================================
RECURRING FINDINGS
==========================================================

1.

Environment architecture stronger than expected.

2.

Largest risk:

placement drift

NOT

logic drift.

3.

Repeated style patterns:

- pills
- mini cards
- section surfaces

Watch.

Do not extract.

4.

Repeated weather asset mapping.

Watch.

Do not extract.

5.

MQTT worker largest split candidate.

Do not split.

6.

Many apparently reusable components
remain Environment-owned.

Extraction has not been earned.

Prefer watching over promoting.


==========================================================
CURRENT STATUS
==========================================================

Environment placement audit:

ACTIVE

Completed:

- lib
- app-state
- controller
- compiler
- view
- frame
- scene
- header
- hero
- forecast
- summary
- data
- records
- footer

Remaining:

- API runtime
- environment context
- ingest
- MQTT
- profile environment
- DB ownership
- settings ownership


==========================================================
NEXT AUDIT BOUNDARY
==========================================================

Continue one file at a time.

Move into:

app/api/environment/context/pull/

then:

app/api/environment/context/probe/

then:

app/api/ingest/location/owntracks/

then:

lib/environment/mqtt/

then:

profile environment

then:

DB

then:

settings


FINAL RULE
----------

For every remaining file:

OWNER

ROLE

TRUTH

READ PATH

WRITE PATH

RISK

DECISION

No guessing.

No rework.

No opportunistic extraction.

Audit first.

Refactor later.

Ship after ownership is understood.