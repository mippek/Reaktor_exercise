import { fetchCachedProductData, getProductCache } from "./productService.js";

/* The worker refreshes the information in the cache by fetching the data again from the API
 * for all product groups. When the data is fetched, posts a message that contains the new
 * cache data to the main thread. */
const refreshData = async() => {
    await fetchCachedProductData("gloves");
    await fetchCachedProductData("facemasks");
    await fetchCachedProductData("beanies");
    postMessage(getProductCache());
}

/* Timer that is set to call in refreshData every 5 minutes. */
setInterval(() => {
    refreshData();
}, 5 * 60 * 1000);

/* When the worker receives a message it calls on refreshData to fetch the data and returns an empty string
 * to the main thread when the data has been fetched to show on screen that data has already been fetched. */
self.onmessage = async (event) => {
    await refreshData();
    postMessage("");
}
