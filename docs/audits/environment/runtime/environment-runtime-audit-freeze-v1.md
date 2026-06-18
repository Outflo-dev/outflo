/* ==========================================================
   OUTFLO — ENVIRONMENT API / RUNTIME AUDIT FREEZE
   STATUS: LOCKED FOR CURRENT PASS
   DATE: 2026-06-11
   PURPOSE: Freeze Environment API/runtime ownership findings before profile/DB/settings audit
   ========================================================== */

AUDIT MODE
----------

Environment UI placement audit is frozen.

Current audit boundary:

API / runtime / ingest ownership.

This is NOT a refactor patch.

This is NOT a feature pass.

This is an ownership map before hard DB/settings wiring.


PRIMARY API / RUNTIME FINDING
-----------------------------

The Environment API/runtime layer is conceptually coherent.

The current model is:

environment_emitter_events
= append-only emitter history / proof

environment_context_events
= provider pull history / proof

environment_snapshots
= current/latest resolved Environment state per user

This means:

environment_snapshots is currently acting as MOST RECENT / CURRENT STATE,
not immutable historical snapshot stream.

That model is confirmed by:

- upsert on environment_snapshots by user_id
- context pull updating environment_snapshots
- OwnTracks ingest updating environment_snapshots

This is acceptable for current implementation.

WATCH:

The name "environment_snapshots" may create future philosophical pressure
if snapshots later become immutable historical observations.

For now:

KEEP CURRENT MODEL.


==========================================================
API ROUTE AUDIT
==========================================================

KEEP / WATCH

app/api/environment/context/pull/route.ts

OWNER:
Environment API runtime layer.

ROLE:
Authenticated route that pulls provider context for the current Environment snapshot,
records a provider context event, and updates current Environment state.

READS:
- auth user
- environment_snapshots current row
- user_preferences.weather_mode

WRITES:
- environment_context_events
- environment_snapshots context fields

FLOW:
auth
→ current snapshot
→ weather preference
→ provider context pull
→ build event row
→ permission filter
→ insert context event
→ build snapshot update
→ permission filter
→ update current snapshot

DECISION:
KEEP.
WATCH.

RISK:
Medium-high.

Reason:
This route writes Environment truth.

Main watch:
- GET route causes writes
- Date.now boundary for pulled_at_ms
- current snapshot selection via maybeSingle
- permission model currently too narrow
- snapshot mutation is okay only under current/latest-state model


----------------------------------------------------------

SPLIT

app/api/environment/context/pull/internal/environment-context-provider.ts

OWNER:
Environment API runtime provider adapter.

ROLE:
Pull Open-Meteo provider data and normalize into internal Environment context.

READS:
- lat/lng/moment/snapshot input
- Open-Meteo forecast API
- Open-Meteo air-quality API

WRITES:
None directly.

DOES NOT OWN:
- DB
- auth
- permissions
- persistence
- route response semantics

DECISION:
SPLIT.

Reason:
Correct ownership, but file is large enough that decomposition is now required
before hard runtime work.

Suggested split:

environment-context-provider.ts
- public orchestration/export

environment-context-provider.types.ts
- provider/result/context types

environment-context-provider.urls.ts
- forecast URL builder
- air-quality URL builder

environment-context-provider.client.ts
- provider fetch/readJson

environment-context-provider.normalize.ts
- forecast/air/sun/context normalization

Important:
Split preserves ownership.
Split does not move responsibility.


----------------------------------------------------------

SPLIT

app/api/environment/context/pull/internal/environment-context-rows.ts

OWNER:
Environment API runtime persistence row-builder layer.

ROLE:
Build DB persistence payloads from normalized provider context.

READS:
- NormalizedContext
- ProviderResult
- EnvironmentSnapshotRow

WRITES:
None directly.

ROUTE WRITES RETURNED PAYLOADS TO:
- environment_context_events
- environment_snapshots

DECISION:
SPLIT.

Reason:
This file builds two different persistence shapes:

1. event history row
2. current snapshot update row

Those should not remain bundled during hard runtime work.

Suggested split:

environment-context-event-row.ts
environment-context-snapshot-row.ts
environment-context-rows.types.ts

Optional temporary bridge:

environment-context-rows.ts
- re-export only

Watch:
- ozone_ppb and ozone_ug_m3 currently use same normalized source
- pressure_hpa maps from pressure_msl_hpa
- verify unit meaning before DB hardening


----------------------------------------------------------

SPLIT / REWORK

app/api/environment/context/pull/internal/environment-context-permissions.ts

OWNER:
Environment API runtime persistence permission layer.

ROLE:
Filter persistence payload fields according to user participation controls.

READS:
- row
- weatherEnabled boolean

WRITES:
None directly.

DECISION:
SPLIT / REWORK.

Reason:
This file is a permission boundary, not a casual helper.

Current filter only removes some weather fields when weather is off.

It removes:
- weather_code
- temperature_c
- apparent_temperature_c
- dew_point_c
- precipitation_mm
- rain_mm
- showers_mm
- forecast_raw
- forecast_units

But leaves possible provider-derived fields:
- humidity_pct
- is_day
- cloud_cover_pct
- pressure_hpa
- pressure_msl_hpa
- surface_pressure_hpa
- wind fields
- uv fields
- sun fields
- air quality fields
- provider metadata
- latest_environment_context

Core unresolved question:

weather_mode = off means which of these?

A. no forecast/weather fields only
B. no provider-derived enrichment
C. weather off, but sun/air/altitude/location context may persist under their own controls

Current behavior is partial and underspecified.

Required next shape:

filterEnvironmentContextPersistenceRow({
    row,
    participation: {
        weather,
        airQuality,
        sun,
        location,
        altitude,
    },
})

or:

filterWeatherFields
filterAirQualityFields
filterSunFields
filterProviderMetadataFields
filterLocationPrecisionFields

DO NOT hard-wire more settings through this current helper
until participation categories are explicit.


----------------------------------------------------------

SPLIT / REWORK

app/api/environment/context/probe/route.ts

OWNER:
Environment API diagnostic/runtime layer.

ROLE:
Probe provider context from current Environment snapshot without DB mutation.

READS:
- auth user
- environment_snapshots current row
- Open-Meteo APIs

WRITES:
None.

DECISION:
SPLIT / REWORK.

Reason:
Useful diagnostic route, but duplicates provider logic from pull provider.

Duplicated:
- toNumber
- forecast URL builder
- air-quality URL builder
- readJson
- Open-Meteo current fields
- Open-Meteo air fields

Required next shape:

probe route
→ read auth/current snapshot
→ call shared provider adapter
→ return diagnostic result

pull route
→ read auth/current snapshot
→ call shared provider adapter
→ persist event/update current snapshot

Do not allow probe and pull provider behavior to drift.


==========================================================
INGEST AUDIT
==========================================================

SPLIT

app/api/ingest/location/owntracks/route.ts

OWNER:
Environment ingest API layer.

ROLE:
Legacy/fallback HTTP receiver for OwnTracks emitter payloads.

READS:
- HTTP request body
- HTTP headers
- environment_emitters ownership row

WRITES:
- environment_emitter_events
- environment_snapshots current/latest state

FLOW:
OwnTracks HTTP payload
→ device id header
→ emitter ownership lookup
→ event insert
→ location snapshot upsert

DECISION:
SPLIT.

Reason:
Conceptually correct, but route owns too much implementation detail.

Responsibilities currently bundled:
- JSON parsing
- timestamp resolution
- numeric normalization
- pressure conversion
- capture mode mapping
- emitter lookup
- event row construction
- snapshot row construction
- HTTP response handling

Suggested split:

app/api/ingest/location/owntracks/internal/owntracks-payload.ts
app/api/ingest/location/owntracks/internal/owntracks-normalize.ts
app/api/ingest/location/owntracks/internal/owntracks-rows.ts

Keep route.ts as HTTP handler.

Watch:
- createAdminClient is appropriate for webhook ingest but must stay scoped
- onConflict user_id confirms current/latest snapshot model
- event_ms derived from payload seconds into canonical ms
- HTTP route capture_mode differs from MQTT route behavior


----------------------------------------------------------

SPLIT

lib/environment/mqtt/environment-mqtt-worker.ts

OWNER:
Environment MQTT ingest worker.

ROLE:
Consume OwnTracks MQTT messages and write emitter history + current Environment snapshot.

READS:
- env config
- MQTT topic
- MQTT message payload
- environment_emitters ownership row

WRITES:
- environment_emitter_events
- environment_snapshots current/latest state

FLOW:
MQTT broker
→ owntracks/+/+ topic
→ topic parse
→ payload parse
→ emitter ownership lookup
→ event insert
→ valid location
→ snapshot upsert

DECISION:
SPLIT.

Reason:
Correct owner and placement, but this is now primary ingest infrastructure.
It has earned decomposition.

Responsibilities currently bundled:
- env loading
- MQTT connection
- subscription lifecycle
- topic parsing
- payload parsing
- OwnTracks normalization
- emitter ownership lookup
- event row construction
- snapshot row construction
- DB writes
- logging

Suggested split:

lib/environment/mqtt/environment-mqtt-worker.ts
- load env
- connect
- subscribe
- delegate message

lib/environment/mqtt/environment-mqtt-handler.ts
- handleMessage orchestration

lib/environment/mqtt/owntracks-topic.ts
- parseOwnTracksTopic

lib/environment/mqtt/owntracks-payload.ts
- OwnTracksPayload type
- resolveEventMs
- numeric guards
- getMotionActivities
- buildRawPayload

lib/environment/mqtt/owntracks-rows.ts
- buildEmitterEventInsert
- buildSnapshotUpsert

Watch:
- MQTT route preserves raw trigger while HTTP maps "u" to "manual"
- MQTT battery keeps raw number while HTTP rounds battery
- source_mode differs: owntracks_mqtt vs owntracks
- normalize these intentionally


==========================================================
API / RUNTIME RECURRING FINDINGS
==========================================================

1.

Runtime placement is mostly correct.

Problem is not wrong folders.

Problem is files that grew into multiple internal responsibilities.


2.

Current Environment storage model is now clear:

environment_emitter_events
= emitter history

environment_context_events
= provider enrichment history

environment_snapshots
= current/latest resolved Environment state


3.

Provider pull and diagnostic probe must share provider adapter logic.

No duplicated Open-Meteo field lists.


4.

Permission filtering is the highest-risk runtime boundary.

Participation categories must become explicit before more settings are wired.


5.

OwnTracks HTTP and MQTT ingest must normalize consistently.

Current differences:
- trigger/capture_mode
- battery integer/raw handling
- source_mode naming


6.

SPLIT does not mean ownership is wrong.

SPLIT means:

Correct owner.
Correct placement.
Grown large enough to decompose now.


==========================================================
ACTION VOCABULARY
==========================================================

KEEP

Correct ownership.
No action.

WATCH

Correct ownership.
Observe growth or future pressure.

SPLIT

Correct ownership.
Correct placement.
Decompose during current active work.

MOVE

Incorrect ownership.
Relocate.

CANONICAL

Critical ownership anchor.
Protect.


==========================================================
CURRENT API / RUNTIME STATUS
==========================================================

Frozen for current pass.

KEEP / WATCH:
- app/api/environment/context/pull/route.ts

SPLIT:
- environment-context-provider.ts
- environment-context-rows.ts
- app/api/ingest/location/owntracks/route.ts
- lib/environment/mqtt/environment-mqtt-worker.ts

SPLIT / REWORK:
- environment-context-permissions.ts
- app/api/environment/context/probe/route.ts


==========================================================
NEXT AUDIT BOUNDARY
==========================================================

Move next into:

profile environment

Then:

DB ownership

Then:

settings ownership / write path

Then:

runtime split implementation plan


FINAL RULE
----------

No UI churn.

No provider duplication.

No more settings through vague permission filters.

No runtime hardening before participation categories are explicit.

No large-file guilt.

If ownership is correct but the file is too large:

SPLIT.