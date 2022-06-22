-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

CREATE OR REPLACE FUNCTION public.requesting_user_id()
    RETURNS text
    LANGUAGE 'sql'
    STABLE
    PARALLEL UNSAFE
    COST 100
    
AS $BODY$
  select nullif(current_setting('request.jwt.claims', true)::json->>'userId', '')::text;
$BODY$;
