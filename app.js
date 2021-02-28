import { Application } from "./deps.js";
import { viewEngine, engineFactory, adapterFactory } from "./deps.js";
import { router } from "./routes/routes.js";
import { errorMiddleware, serveStaticFilesMiddleware } from "./middlewares/middlewares.js";

const app = new Application();

const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();
app.use(viewEngine(oakAdapter, ejsEngine, {
    viewRoot: "./views",
    useCache: true
}));

app.use(errorMiddleware);
app.use(serveStaticFilesMiddleware);

app.use(router.routes());

let port = 7777;
if (Deno.args.length > 0) {  
    const lastArgument = Deno.args[Deno.args.length - 1];  
    port = Number(lastArgument);
}

app.listen({ port: port });
