import { Application, Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";

const router = new Router({ prefix: "/oak" });

router
  .post("/", (context) => {
    context.response.body = "Hello world!";
  })
  .post("/hello", (context) => {
    context.response.body = "Hello Hello!";
  });

const app = new Application();

app.use(router.routes());

await app.listen({ port: 8000 });
