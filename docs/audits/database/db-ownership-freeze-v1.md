OUTFLŌ DB OWNERSHIP AUDIT — FINAL FREEZE

STATUS:
LOCKED FOR CONTRACT REWRITE

PURPOSE:
Audit Supabase reality before Database Contract v5.

MODE:
No refactor.
No migration.
No contract rewrite yet.
Ownership discovery only.

CORE FINDING:
The DB is structurally coherent.

The problem is not broken schema.
The problem is missing explicit ownership language.

==================================================
PRIMARY DB MODEL
==================================================

Time:
user_epochs
= canonical Begin / epoch anchor

Money:
receipts
= canonical money-out ledger

Environment:
environment_emitters
= emitter registry

environment_emitter_events
= emitter emission history / proof

environment_context_events
= provider pull history / proof

environment_snapshots
= current/latest resolved Environment state

Ingest:
ingest_aliases
= routing truth

ingest_events
= mutable processing audit state

ingest_jobs
= operational queue/retry state

inbound_email_stub
= dormant raw intake capture

Settings:
user_preferences
= primary settings / participation root

environment_user_settings
= narrow Environment unit setting

Profile:
profiles
= account shell / account number

user_identity_assets
= presentation identity

Email Mirror:
email_mirror_state
= operational mirror state

forwarding_verifications
= dormant/overlapping verification lifecycle

Attention:
screen_sessions
= append-only attention/session event stream

Legacy:
user_system
= non-canonical shadow of epoch/system state

==================================================
TABLE AUDIT
==================================================

profiles

OWNER:
Account / Identity

ROLE:
User account shell and account_number holder.

TRUTH TYPE:
Identity support / ingest-routing support.

READ PATH:
Profile, account setup, ingest display.

WRITE PATH:
auth.users trigger → handle_new_user()

LAW CHECK:
Clean.

RISK:
Low.

DECISION:
KEEP / CANONICAL SUPPORT


--------------------------------------------------

user_identity_assets

OWNER:
Profile

ROLE:
Name, username, avatar, gallery identity presentation.

TRUTH TYPE:
Profile presentation truth.

READ PATH:
Profile UI, app shell/profile surfaces.

WRITE PATH:
Profile identity/avatar actions.

LAW CHECK:
Clean.

RISK:
Low.

DECISION:
KEEP


--------------------------------------------------

user_epochs

OWNER:
Time

ROLE:
Begin / epoch anchor.

TRUTH TYPE:
Canonical time anchor.

READ PATH:
Time, orbit, derived windows.

WRITE PATH:
Begin/bootstrap/dev reset.

LAW CHECK:
Clean as anchor.

RISK:
Medium.

Reason:
Delete policy and observed deletes exist.
Likely dev reset behavior, but v5 must distinguish production invariant from admin/dev reset.

DECISION:
CANONICAL / WATCH DELETE


--------------------------------------------------

user_system

OWNER:
Legacy

ROLE:
Old system/epoch shadow.

TRUTH TYPE:
Non-canonical legacy state.

READ PATH:
Unknown / legacy.

WRITE PATH:
Legacy/dev reset.

LAW CHECK:
Fails if active.

RISK:
High.

Reason:
Competes with user_epochs if used as epoch truth.

DECISION:
NON-CANONICAL / WATCH


--------------------------------------------------

user_preferences

OWNER:
Settings / Profile

ROLE:
Global display preferences and Environment participation controls.

TRUTH TYPE:
Mutable settings truth.

READ PATH:
Layouts, app-state, profile settings, Environment runtime.

WRITE PATH:
Profile/settings actions.

LAW CHECK:
Clean if treated as preference/permission only.

RISK:
Medium.

Reason:
Large settings surface; must not become ledger or Environment truth.

DECISION:
KEEP / SETTINGS ROOT


--------------------------------------------------

environment_user_settings

OWNER:
Environment Settings

ROLE:
Temperature unit preference.

TRUTH TYPE:
Narrow Environment display preference.

READ PATH:
Environment compiler/menu.

WRITE PATH:
Environment preference action.

LAW CHECK:
Clean.

RISK:
Medium.

Reason:
Split pressure with user_preferences.

DECISION:
KEEP / WATCH MERGE PRESSURE


--------------------------------------------------

environment_emitters

OWNER:
Environment Ingest

ROLE:
Registered emitter/source ownership.

TRUTH TYPE:
Emitter registry truth.

READ PATH:
OwnTracks HTTP/MQTT lookup.

WRITE PATH:
Setup/admin/manual seed.

LAW CHECK:
Clean.

RISK:
Low.

DB evidence:
UNIQUE(provider, device_id)

DECISION:
CANONICAL EMITTER REGISTRY


--------------------------------------------------

environment_emitter_events

OWNER:
Environment Ingest

ROLE:
Append emitter payload/proof history.

TRUTH TYPE:
Emission history.

READ PATH:
Diagnostics, current-state construction.

WRITE PATH:
OwnTracks HTTP/MQTT ingest.

LAW CHECK:
Clean.

RISK:
Medium.

Reason:
user_id is nullable, appropriate for pre-resolution/emission intake.
Must not become current Environment truth.

DECISION:
KEEP / EMISSION HISTORY


--------------------------------------------------

environment_context_events

OWNER:
Environment Runtime

ROLE:
Provider pull record.

TRUTH TYPE:
Provider proof / enrichment history.

READ PATH:
Context diagnostics, current-state construction.

WRITE PATH:
Environment context pull route.

LAW CHECK:
Clean.

RISK:
Medium.

Reason:
Must remain provider history, not current state.

DECISION:
KEEP / PROVIDER HISTORY


--------------------------------------------------

environment_snapshots

OWNER:
Environment

ROLE:
Current/latest resolved Environment state.

TRUTH TYPE:
Current Environment truth.

READ PATH:
Environment page/compiler, runtime, receipt joins.

WRITE PATH:
OwnTracks ingest and provider context upsert.

LAW CHECK:
Clean only under current/latest model.

RISK:
High.

DB evidence:
UNIQUE(user_id)
1 live row
1513 updates
user_id/moment indexes

Reason:
Name suggests immutable snapshot stream, but behavior proves current-state row.

DECISION:
CANONICAL CURRENT STATE / WATCH NAME


--------------------------------------------------

receipt_environment

OWNER:
Money × Environment Projection

ROLE:
Receipt-to-environment association.

TRUTH TYPE:
Projection / link truth.

READ PATH:
Receipt detail, money/environment joins.

WRITE PATH:
After receipt creation.

LAW CHECK:
Excellent.

DB evidence:
receipt_id → receipts.id ON DELETE CASCADE
environment_snapshot_id → environment_snapshots.id ON DELETE SET NULL
RLS checks receipt ownership.

Meaning:
Receipt environment belongs to the receipt.
It may reference Environment.
It does not own Environment.

RISK:
Medium.

DECISION:
KEEP / PROJECTION


--------------------------------------------------

receipts

OWNER:
Money

ROLE:
Money-out event ledger.

TRUTH TYPE:
Canonical money truth.

READ PATH:
Money routes, outflows, receipt detail.

WRITE PATH:
Ingest processor / dev actions.

LAW CHECK:
Target is clean.

RISK:
High.

DB evidence:
639 inserts
747 updates
71 deletes

Reason:
Conceptually canonical ledger, but actual dev behavior includes mutation/deletion.
v5 must distinguish ledger invariant from dev/admin reset behavior.

DECISION:
CANONICAL / WATCH MUTATION


--------------------------------------------------

ingest_aliases

OWNER:
Ingest

ROLE:
Alias/local_part to user routing.

TRUTH TYPE:
Ingest routing truth.

READ PATH:
Resend ingest, account setup.

WRITE PATH:
auth trigger/bootstrap.

LAW CHECK:
Clean.

DB evidence:
UNIQUE(local_part)

RISK:
Low.

DECISION:
CANONICAL INGEST ROUTING


--------------------------------------------------

inbound_email_stub

OWNER:
Ingest

ROLE:
Raw inbound email stub.

TRUTH TYPE:
Raw intake proof.

READ PATH:
Replay/debug/processor.

WRITE PATH:
Resend webhook.

LAW CHECK:
Clean but dormant.

RISK:
Medium.

Reason:
0 rows currently.
Built but not active.

DECISION:
KEEP / DORMANT RAW CAPTURE


--------------------------------------------------

ingest_events

OWNER:
Ingest

ROLE:
Webhook event and processing state.

TRUTH TYPE:
Mutable ingest process truth.

READ PATH:
Processor, admin, replay, status.

WRITE PATH:
Webhook and processor.

LAW CHECK:
Clean.

DB evidence:
UNIQUE(event_id)
UNIQUE(user_id, message_id)
processed_at / claimed_at indexes
unprocessed partial index

RISK:
Medium.

Reason:
Mutable processing state; must not be described as immutable ledger.

DECISION:
KEEP / PROCESSING AUDIT


--------------------------------------------------

ingest_jobs

OWNER:
Ingest Ops

ROLE:
Queue, retry, worker state.

TRUTH TYPE:
Operational job state.

READ PATH:
Worker, admin, cron.

WRITE PATH:
Enqueue, claim, retry.

LAW CHECK:
Clean.

DB evidence:
ingest_event_id → ingest_events.id ON DELETE CASCADE
status/next_attempt index

RISK:
Low.

DECISION:
KEEP / OPERATIONAL


--------------------------------------------------

email_mirror_state

OWNER:
Email Mirror

ROLE:
Mirror window, nonce, verification timestamps.

TRUTH TYPE:
Operational account state.

READ PATH:
Email mirror page/poll.

WRITE PATH:
Open/close/poll routes.

LAW CHECK:
Clean.

RISK:
Medium.

Reason:
No RLS currently.
Update-heavy state row.

DECISION:
KEEP / WATCH SECURITY


--------------------------------------------------

forwarding_verifications

OWNER:
Email Mirror

ROLE:
Forwarding verification lifecycle.

TRUTH TYPE:
Verification state.

READ PATH:
Email mirror/account setup.

WRITE PATH:
Verification routes.

LAW CHECK:
Structurally clean, but dormant.

RISK:
Medium.

Reason:
0 rows.
Overlaps conceptually with email_mirror_state.

DECISION:
WATCH / DUPLICATE LIFECYCLE


--------------------------------------------------

screen_sessions

OWNER:
Attention / Time

ROLE:
App screen-use sessions.

TRUTH TYPE:
Attention event history.

READ PATH:
Time/attention summaries.

WRITE PATH:
screen-session API.

LAW CHECK:
Clean.

DB evidence:
2176 inserts
0 updates
0 deletes
user_id, started_ms DESC index

RISK:
Medium.

Reason:
Active event stream; may become future substrate but not core DB contract root yet.

DECISION:
KEEP / EVENT STREAM


==================================================
SYSTEM FINDINGS
==================================================

1.
The DB is not random.

It has coherent ownership centers:
Time, Money, Environment, Ingest, Settings, Profile, Email Mirror, Attention.

2.
Environment is structurally split:

environment_emitters
→ who may emit

environment_emitter_events
→ what emitters emitted

environment_context_events
→ what providers returned

environment_snapshots
→ current resolved Environment state

3.
environment_snapshots is not an immutable snapshot stream today.

It is current/latest state.

This is proven by:
UNIQUE(user_id)
1 live row
1513 updates

4.
receipt_environment is a projection.

It is subordinate to receipts.
It may reference Environment.
It does not own Environment.

5.
Ingest is real operational infrastructure.

ingest_events owns event/process state.
ingest_jobs owns queue/retry state.
inbound_email_stub exists but is dormant.

6.
Money is real.

receipts is the ledger root.
But mutation/deletion history means v5 must separate:
production law
from dev/admin reset behavior.

7.
Settings are split.

user_preferences is the main settings root.
environment_user_settings is narrow unit preference.
This is not broken, but it creates future merge/naming pressure.

8.
Security is partial.

RLS/policies exist for:
profiles
ingest_aliases
receipts
receipt_environment
user_epochs
user_identity_assets
user_preferences
user_system
forwarding_verifications
environment_snapshots policies exist even though RLS status needs hardening verification

Runtime/event tables are mostly not hardened yet.

9.
DB-owned behavior is narrow.

No public triggers.
Auth trigger exists:
auth.users INSERT
→ on_auth_user_created
→ handle_new_user()
→ profiles
→ ingest_aliases

10.
No table comments exist.

The database explains itself through:
names
columns
constraints
indexes
policies
row counts
write behavior

Database Contract v5 must become the missing explanation layer.

==================================================
AUDIT LAW
==================================================

Columns tell what exists.

Constraints tell what must be true.

Population tells what is alive.

Write counts tell what mutates.

Policies tell who owns access.

Indexes tell how reality is traversed.

Foreign keys tell dependency.

Functions/triggers tell what the DB secretly does.

Comments tell whether the DB explains itself.

In this DB:

comments are silent.

structure speaks.

==================================================
FINAL LOCK
==================================================

Database Contract v5 should not invent owners.

It should preserve the owners the database already reveals.

The contract is not architecture.

The contract is a receipt.
