-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

CREATE POLICY "Enable update for own todo"
    ON public.todos
    AS PERMISSIVE
    FOR UPDATE
    TO public
    USING ((requesting_user_id() = user_id))
    WITH CHECK ((requesting_user_id() = user_id));
