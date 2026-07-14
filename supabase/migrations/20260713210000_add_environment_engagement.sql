/* ==========================================================
   OUTFLO — ADD ENVIRONMENT ENGAGEMENT
   File: supabase/migrations/20260713210000_add_environment_engagement.sql
   Scope: Add canonical Guide-owned Environment engagement state
   ========================================================== */

/* ------------------------------
   Columns
-------------------------------- */
alter table public.user_preferences
    add column if not exists engagement_enabled boolean
        not null
        default false;

alter table public.user_preferences
    add column if not exists engagement_mode text
        not null
        default 'system';

/* ------------------------------
   Constraint
-------------------------------- */
do $$
begin
    if not exists (
        select 1
        from pg_constraint
        where conname = 'user_preferences_engagement_mode_check'
          and conrelid = 'public.user_preferences'::regclass
    ) then
        alter table public.user_preferences
            add constraint user_preferences_engagement_mode_check
            check (
                engagement_mode in (
                    'system',
                    'precise',
                    'capture'
                )
            );
    end if;
end
$$;

/* ------------------------------
   Legacy Backfill
-------------------------------- */
update public.user_preferences
set
    engagement_enabled = case capture_mode
        when 'moment' then true
        when 'continuous' then true
        else false
    end,
    engagement_mode = case capture_mode
        when 'moment' then 'capture'
        when 'continuous' then 'precise'
        else 'system'
    end;

/* ------------------------------
   Documentation
-------------------------------- */
comment on column public.user_preferences.engagement_enabled is
    'Whether the Guide permits Environment context to be saved.';

comment on column public.user_preferences.engagement_mode is
    'Saved Environment engagement mode: system, precise, or capture.';