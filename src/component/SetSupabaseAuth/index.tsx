import { useSession } from "next-auth/react";
import type { FC } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { supabase } from "src/util/supabase";

export const SetSupabaseAuth: FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [isLoading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      supabase.auth.setAuth(session.token);
      if (isLoading) {
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  if (status === "loading" || isLoading) {
    return <div>...loading</div>;
  }

  return children;
};
