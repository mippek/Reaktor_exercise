import { Router } from "../deps.js";
import { hello, gloves, faceMasks, beanies } from "./controllers/productController.js";

const router = new Router();

/* Maps requests to paths '/', '/gloves', '/facemasks' and '/beanies'. */
router.get('/', hello);
router.get('/gloves', gloves);
router.get('/facemasks', faceMasks);
router.get('/beanies', beanies);

export { router };
