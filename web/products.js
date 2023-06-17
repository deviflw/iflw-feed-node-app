import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "./shopify.js";

//FIXME only one id test
//8245058535702 - single
//8245058535702 - variable
const FETCH_PRODUCTS_QUERY = `
query ($numProducts: Int!, $cursor: String) {
  products(first: $numProducts, after: $cursor) {
      edges {
      node {
        title
        description
        onlineStoreUrl
        handle
        variants(first: 10) {
          edges {
            node {
              id
              displayName
              title
              barcode
              inventoryQuantity
              availableForSale
              contextualPricing(context: {country: US}) {
                price {
                  amount
                }
              }
            }
          }
        }
        images(first: 10) {
          edges {
            node {
              url
            }
          }
        }
        contextualPricing(context: {country: US}) {
          priceRange {
            maxVariantPrice {
              amount
              currencyCode
            }
          }
        }
        metafield(namespace: "google_feed", key: "included") {
          key
          value
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
`;

export default async function fetchProducts(session) {
  
  const client = new shopify.api.clients.Graphql({ session });

  try {
    const products = await client.query({
      data: {
        query: FETCH_PRODUCTS_QUERY,
        variables: {
          //FIXME
          "numProducts": 2,
          "cursor": null
        },
      },
    });

    // return data.products.edges.map(({ node }) => node); - error products undefined
    return products;

  } catch (error) {
    if (error instanceof GraphqlQueryError) {
      throw new Error(
        `${error.message}\n${JSON.stringify(error.response, null, 2)}`
      );
    } else {
      throw error;
    }
  }
}


//TODO fix the map function to filter results for the front end
//xml builder library