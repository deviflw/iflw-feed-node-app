import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "./shopify.js";

const FETCH_PRODUCTS_QUERY = `
{
  products(first: 10, query:"tag:google_feed") {
    edges {
      cursor
      node {
        id
        title
        tags
        variants(first: 4) {
          edges {
            node {
              id
            }
          }
          pageInfo {
            hasNextPage
          }
        }
      }
    }
    pageInfo {
      hasNextPage
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