// @ts-check
import {join} from "path";
import {readFileSync, writeFileSync} from "fs";
import express from "express";
import serveStatic from "serve-static";

import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import GDPRWebhookHandlers from "./gdpr.js";

//Milanova
import fetchProducts from './products.js';
import { xmlGenerator } from "./xml-feed.js";

const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10);

const STATIC_PATH = process.env.NODE_ENV === "production"
  ? `${process.cwd()}/frontend/dist`
  : `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(shopify.config.auth.callbackPath, shopify.auth.callback(), shopify.redirectToShopifyOrAppRoot());
app.post(shopify.config.webhooks.path, shopify.processWebhooks({webhookHandlers: GDPRWebhookHandlers}));

// If you are adding routes outside of the /api path, remember to also add a
// proxy rule for them in web/frontend/vite.config.js

app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());

app.get("/api/products/count", async(_req, res) => {
  const countData = await shopify
    .api
    .rest
    .Product
    .count({session: res.locals.shopify.session});
  res
    .status(200)
    .send(countData);
});

app.get("/api/products/create", async(_req, res) => {
  let status = 200;
  let error = null;

  try {
    await productCreator(res.locals.shopify.session);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res
    .status(status)
    .send({
      success: status === 200,
      error
    });
});

//Milanova

app.get("/api/products", async(_req, res) => {
  try {
    const fetchedProducts = await fetchProducts(res.locals.shopify.session);
  
    // generate XML from the fetched products and write it to a file
    const xml = xmlGenerator(fetchedProducts);
    writeFileSync('./frontend/feeds/test2.xml', xml);

    res.status(200).send({fetchedProducts});
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while fetching products and writing the XML file.' });
  }
});

// app.get("/api/products", async(_req, res) => {
//   const fetchedProducts = await fetchProducts(res.locals.shopify.session);
//   res
//     .status(200)
//     .send({fetchedProducts});
// });

//End of Milanova

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, {index: false}));

app.use("/*", shopify.ensureInstalledOnShop(), async(_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
