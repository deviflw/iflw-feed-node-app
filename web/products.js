import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "./shopify.js";
import { AppBridgeClient, createApp } from "@shopify/app-bridge";

console.log('products.js');

const app = createApp(appBridgeConfig);
const appBridgeClient = new AppBridgeClient(app);


const FETCH_PRODUCTS_QUERY = `
  query {
    products(first: 10) {
      edges {
        node {
          id
          title
          description
          variants(first: 1) {
            edges {
              node {
                price
              }
            }
          }
          images(first: 1) {
            edges {
              node {
                url
              }
            }
          }
        }
      }
    }
  }
`;

async function fetchProducts() {
  try {
    const response = await fetch("/api/products");
    const data = await response.json();

    if (data.success) {
      // Dispatch a custom action with the result
      appBridgeClient.dispatch({
        type: "PRODUCTS_FETCHED",
        payload: {
          products: data.products,
        },
      });
    } else {
      console.error("Error fetching products:", data.error);
    }
  } catch (error) {
    console.error("Error calling /api/products:", error);
  }
}

export default {
  fetchProducts,
};