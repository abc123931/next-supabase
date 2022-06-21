import { getSession, signIn, signOut } from "next-auth/react";
import type { FC } from "react";
import { Button } from "src/component/Button";
import { supabase } from "src/util/supabase";

export const Index: FC = () => {
  const getUser = async () => {
    const session = await getSession();
    if (session?.token) {
      supabase.auth.setAuth(session.token);
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", session.user.id);
      console.info({ data });
      console.info({ error });
    }
  };

  const handleClick = async () => {
    await getUser();
  };

  return (
    <div>
      <h2>Index</h2>
      <Button tag="button" className="p-2" onClick={handleClick}>
        Click me!
      </Button>
      <Button
        tag="button"
        className="p-2"
        onClick={() => {
          signIn("line");
        }}
      >
        ログイン
      </Button>
      <Button
        tag="button"
        className="p-2"
        onClick={() => {
          signOut();
        }}
      >
        ログアウト
      </Button>
    </div>
  );
};
