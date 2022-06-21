import { useSession } from "next-auth/react";
import type { FC } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "src/util/supabase";

type TodoType = {
  id: string;
  content: string;
  done: boolean;
  user_id: string;
};

export const Todo: FC = () => {
  const { data: session } = useSession();
  const { handleSubmit, register, reset } = useForm<{
    content: string;
  }>();

  const handleClick = handleSubmit(async (data) => {
    if (!session) {
      return;
    }

    const { error } = await supabase
      .from<TodoType>("todos")
      .insert({ content: data.content, user_id: session.user.id });

    if (error) {
      alert("エラーです");
      return;
    }

    reset({ content: "" });
  });

  return (
    <div>
      <input type="text" {...register("content")} />
      <button type="button" onClick={handleClick}>
        作成
      </button>
      <TodoList />
    </div>
  );
};

const TodoList: FC = () => {
  const { data: session } = useSession();
  const [todos, setTodos] = useState<TodoType[]>();

  const fetchTodos = async () => {
    if (!session) {
      return;
    }

    const { data, error } = await supabase
      .from<TodoType>("todos")
      .select("*")
      .eq("user_id", session.user.id);

    if (!data || error) {
      alert("エラーです");
      return;
    }
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ul>
      {todos?.map((todo) => {
        return (
          <li key={todo.id}>
            <TodoItem todo={todo} />
          </li>
        );
      })}
    </ul>
  );
};

const TodoItem: FC<{ todo: TodoType }> = ({ todo }) => {
  const handleDelete = useCallback(async () => {
    const { error } = await supabase
      .from<TodoType>("todos")
      .delete()
      .eq("id", todo.id);

    if (error) {
      alert("エラー");
    }
  }, [todo.id]);

  return (
    <div>
      <p>{todo.content}</p>
      <button type="button" onClick={handleDelete}>
        削除
      </button>
    </div>
  );
};
