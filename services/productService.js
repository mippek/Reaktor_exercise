import { DOMParser } from "../deps.js";

/* Base url for the API:s */
const baseUrl = "https://bad-api-assignment.reaktor.com/v2"

/* Caches for keeping track of all the fetched products and availabilities. */
let productCache = {};
let availabilityCache = {};

/* Fetches the data of availabilities for manufacturers from the API. If there's an error logs the error 
 * to the console or if the response was not ok throws a new error. */
const fetchAvailabilityData = async (manufacturer) => {
    try {
        const response = await fetch(`${baseUrl}/availability/${manufacturer}`);
        if (!response.ok) {
            return {response: "[]"};
        }
        return response.json();
    } catch (e) {
        console.log(e);
    }
}

/* Parses the string received in the attribute DATAPAYLOAD of the response of the fetched availability. */
const parseAvailabilityData = (string) => {
    if (string.includes("<INSTOCKVALUE>")) {
        /* If the string containe <INTSTOCKVALUE>, it probably contains the correct information
         * and is parsed with the DOMParser. */
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(string, "text/html");
        return htmlDoc.querySelector("INSTOCKVALUE").textContent;
    } else {
        /* Otherwise '-' is returned to tell that the string does not contains information on the
         * availability. */
        return "-";
    }
}

/* Returns availability data for a manufacturer. First checks the availability cache if the information 
 * for the manufacturer has already been fetched. If yes, the data from the cache is returned. Otherwise, 
 * calls on fetchAvailabilityData to fetch the data from the availability API and stores it in the cache. */
const fetchCachedAvailabilityData = async (manufacturer) => {
    if (availabilityCache[manufacturer]) {
        return availabilityCache[manufacturer];
    }
    const availabilities = await fetchAvailabilityData(manufacturer);
    availabilityCache[manufacturer] = availabilities.response;
    return availabilities.response;
}

/* Fetches the data of all the products from the API. If there's an error logs the error to the console
 * or if the response was not ok throws a new error. */
const fetchProductData = async (product) => {
    try {
        const response = await fetch(`${baseUrl}/products/${product}`, {
            headers: {

            }
        });
        if (!response.ok) {
            return [];
        }
        return response.json();
    } catch (e) {
        console.log(e);
    }
}

/* Returns product data for a product group and adds the availability data for each product. First, 
 * checks the product cache if the information for the product has already been fetched. If yes, the 
 * data from the cache is returned. Otherwise, calls on fetchProductData to fetch the data from the 
 * product API, calls on fetchCachedAvailabilityData for each product to add the availabilities to the 
 * products and then stores the data in the cache. */
const fetchCachedProductData = async (product) => {
    if (productCache[product]) {
        return productCache[product];
    }
    /* Products with availabilities are stored in a list. */
    const data = [];
    const products = await fetchProductData(product);
    if (products) {
        for (const product of products) {
            /* For each product fetches the availability data for the manufacturer of the product. */
            const availability = await fetchCachedAvailabilityData(product.manufacturer);
            if (availability !== '[]') {
                /* If the availabilities for the product manufacturer contains some information i.e. is
                * not an empty list, [], filters the availability information by id to contain only the
                * the information of the product in question. */
                const filteredAvailability = availability.filter( o => o.id.toLowerCase() === product.id)
                /* Parses the DATAPAYLOAD of the availability information. */
                const parsedAvailability = parseAvailabilityData(filteredAvailability[0].DATAPAYLOAD)
                /* Adds the availability information to the object and pushes it to the list. */
                const obj = { ...product, availability: parsedAvailability };
                data.push(obj);
            } else {
                /* If the availability information contains an empty list, returns '-' for the availability
                * to tell that the availability information was not available. */
                const obj = { ...product, availability: "-" };
                data.push(obj);
            }
        }
        productCache[product] = data;
    }

    /* Returns the list of products with availabilities. */
    return data;
}

/* Empties both of the caches. */
const emptyCaches = () => {
    productCache = {};
    availabilityCache = {};
    return;
}

/* Returns the contents of the product cache and then calls on the emptyCaches method to enable
 * fetching the data from the API:s again for updating the data. */
const getProductCache = () => {
    const temporaryCache = productCache;
    emptyCaches();
    return temporaryCache;
}

export { fetchCachedProductData, getProductCache };