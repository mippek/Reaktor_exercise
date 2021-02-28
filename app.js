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

app.listen({ port: 7777 });