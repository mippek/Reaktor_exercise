import { send } from "../deps.js";

/* Middleware for handling errors. */
const errorMiddleware = async (context, next) => {
    try {
        await next();
    } catch (e) {
        console.log(e)
    }
}

/* Middleware for serving static files. All requests to paths that starts with '/static' are
 * handled by the middleware to use the files in the folder static. */
const serveStaticFilesMiddleware = async (context, next) => {
    if (context.request.url.pathname.startsWith('/static')) {
      const path = context.request.url.pathname.substring(7);
  
      await send(context, path, {
        root: `${Deno.cwd()}/static`
      });
  
    } else {
      await next();
    }
  }

export { errorMiddleware, serveStaticFilesMiddleware };