import { fetchCachedProductData } from "../../services/productService.js";

/* Cache that is used for data that is shown on the web page. */
let workerProductCache = {};

/* Initializes a worker that takes care of updating the data received from the API. The worker
 * runs the code in the file worker.js in the folder services. */
const worker = new Worker(new URL("../../services/worker.js", import.meta.url).href, { type: "module", deno: true });

/* When the main thread receives a message from the worker updates the workerProductCache with
 * the new data received in the message. */
worker.onmessage = (event) => {
    workerProductCache = event.data;
}

/* Requests to the main page, route '/', are redirected to the path '/gloves'. */
const hello = async({response}) => {
    if (!(workerProductCache["gloves"] && workerProductCache["facemasks"] && workerProductCache["beanies"])) {
        worker.postMessage("");
    }
    response.redirect('/gloves');
}

/* Gets the data for gloves from the cache and passes it to a view that is rendered. */
const gloves = async ({render}) => {
    const gloves = workerProductCache["gloves"];
    render('products.ejs', { product: "Gloves", data: gloves });
}

/* Gets the data for facemasks from the cache and passes it to a view that is rendered. */
const faceMasks = async ({render}) => {
    const facemasks = workerProductCache["facemasks"];
    render('products.ejs', { product: "Face masks", data: facemasks });
}

/* Gets the data for beanies from the cache and passes it to a view that is rendered. */
const beanies = async ({render}) => {
    const beanies = workerProductCache["beanies"];
    render('products.ejs', { product: "Beanies", data: beanies });
}

export { hello, gloves, faceMasks, beanies };