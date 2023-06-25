import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "./shopify.js";

//FIXME only one id test
//8245058535702 - single
//8245058535702 - variable
const FETCH_PRODUCTS_QUERY = `
query ($numProducts: Int!, $cursor: String, $country: CountryCode) {
  products(first: $numProducts, after: $cursor) {
    edges {
      node {
        title
        description
        onlineStoreUrl
        handle
        status
        variants(first: 10) {
          edges {
            node {
              id
              displayName
              title
              barcode
              inventoryQuantity
              availableForSale
              contextualPricing(context: {country: $country}) {
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
        contextualPricing(context: {country: $country}) {
          priceRange {
            maxVariantPrice {
              amount
              currencyCode
            }
          }
        }
        googleFeedIncluded: metafield(namespace: "google_feed", key: "included") {
          value
        }
        googleFeedSize: metafield(namespace: "google_feed", key: "size") {
          value
        }
        googleFeedGender: metafield(namespace: "google_feed", key: "gender") {
          value
        }
        googleFeedColor: metafield(namespace: "google_feed", key: "color") {
          value
        }
        googleFeedAge: metafield(namespace: "google_feed", key: "age") {
          value
        }
        googleFeedCondition: metafield(namespace: "google_feed", key: "condition") {
          value
        }
        googleFeedBrand: metafield(namespace: "google_feed", key: "brand") {
          value
        }
        googleFeedCategory: metafield(namespace: "google_feed", key: "category") {
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

export default async function fetchProducts(session, country, cursor) {
  
  const client = new shopify.api.clients.Graphql({ session });

  try {
    const products = await client.query({
      data: {
        query: FETCH_PRODUCTS_QUERY,
        variables: {
          //FIXME
          "numProducts": 5,
          "country": country,
          "cursor": cursor
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