import type { CustomNextPage } from "next";
import { FluidLayout } from "src/layout";
import { Todo } from "src/pages/todo";

const TodoPage: CustomNextPage = () => {
  return <Todo />;
};

TodoPage.getLayout = FluidLayout;

export default TodoPage;
