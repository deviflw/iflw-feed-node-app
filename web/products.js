import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "./shopify.js";

const FETCH_PRODUCTS_QUERY = `
query ($numProducts: Int!, $cursor: String) {
  products(first: $numProducts, after: $cursor, query:"tag:google_feed") {
    nodes {
      title
      tags
      id
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
          "numProducts": 10,
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