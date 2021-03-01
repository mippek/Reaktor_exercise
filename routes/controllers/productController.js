
/* Cache that is used for data that is shown on the web page. */
let workerProductCache = {};

/* Load text that is shown on the page when the app is started, at first it is 'Loading...' but
 * changed to an empty string when the data has been loaded. */
let loadText = "Loading...";

/* Initializes a worker that takes care of updating the data received from the API. The worker
 * runs the code in the file worker.js in the folder services. */
const worker = new Worker(new URL("../../services/worker.js", import.meta.url).href, { type: "module", deno: true });

/* When the main thread receives a message from the worker updates the workerProductCache with
 * the new data received in the message. */
worker.onmessage = async (event) => {
    if (typeof event.data === "string") {
        /* If the type of the event data is string, the data is stored in loadText. */
        loadText = event.data;
    } else {
        /* Otherwise it contains the list of products and is stored in workerProductCache */
        workerProductCache = event.data;
    }
}

/* Requests to the main page, route '/', are redirected to the path '/gloves'. */
const hello = async({response}) => {
    if (!(workerProductCache["gloves"] && workerProductCache["facemasks"] && workerProductCache["beanies"])) {
        /* If the workerProductCache does not contain information of the products a message is sent to the
         * worker to fetch the data. */
        worker.postMessage("");
    }
    response.redirect('/gloves');
}

/* Gets the data for gloves from the cache and passes it to a view that is rendered. */
const gloves = async ({render}) => {
    const gloves = workerProductCache["gloves"];
    render('products.ejs', { loadText: loadText, data: gloves });
}

/* Gets the data for facemasks from the cache and passes it to a view that is rendered. */
const faceMasks = async ({render}) => {
    const facemasks = workerProductCache["facemasks"];
    render('products.ejs', { loadText: loadText, data: facemasks });
}

/* Gets the data for beanies from the cache and passes it to a view that is rendered. */
const beanies = async ({render}) => {
    const beanies = workerProductCache["beanies"];
    render('products.ejs', { loadText: loadText, data: beanies });
}

export { hello, gloves, faceMasks, beanies };
