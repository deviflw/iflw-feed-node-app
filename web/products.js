import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "./shopify.js";

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

export default async function fetchProducts(session) {
  const client = new shopify.api.clients.Graphql({ session });

  try {
    const { data } = await client.query({
      data: {
        query: FETCH_PRODUCTS_QUERY,
      },
    });

    // return data.products.edges.map(({ node }) => node);
    return data;

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
