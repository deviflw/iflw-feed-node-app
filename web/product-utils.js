
export function formatID(id) {
  // Ensure id is defined and is a string
  if (typeof id !== 'string') {
    console.error('Invalid id:', id);
    return id;
  }

  // Split the string by '/' character and store it in an array
  let splitId = id.split('/');
  // Pick the last element of the array, which is the product ID
  let productId = splitId[splitId.length - 1];
  return productId;
}

export function combineProductData(products) {
  let result = [];

  products.forEach(product => {
    // Extract the product-level information
    let productNode = product.node;
    let googleFeedIncluded = productNode.googleFeedIncluded.value;
    let productStatus = productNode.status.toLowerCase();

    // Only proceed if the googleFeedIncluded value is true and status is active
    if (googleFeedIncluded === 'true' && productStatus === 'active') {
      let productTitle = productNode.title;
      let productDescription = productNode.description;
      let productHandle = productNode.handle;
      let productUrl = productNode.onlineStoreUrl;
      let productPrice = productNode.contextualPricing.priceRange.maxVariantPrice.amount;
      let productCurrency = productNode.contextualPricing.priceRange.maxVariantPrice.currencyCode;
      let productImages = productNode.images.edges.map(imageEdge => imageEdge.node.url);

      let googleFeedSize = productNode.googleFeedSize.value;
      let googleFeedGender = productNode.googleFeedGender.value;
      let googleFeedColor = productNode.googleFeedColor.value;
      let googleFeedAge = productNode.googleFeedAge.value;
      let googleFeedCondition = productNode.googleFeedCondition.value;
      let googleFeedBrand = productNode.googleFeedBrand.value;
      let googleFeedCategory = productNode.googleFeedCategory.value;

      // For each variant, create a new object combining the product data and variant data
      let productVariants = productNode.variants.edges.map(variantEdge => {
        let variantNode = variantEdge.node;
        let variantId = variantNode.id;
        let variantDisplayName = variantNode.displayName;
        let variantTitle = variantNode.title;
        let variantBarcode = variantNode.barcode;
        let variantQuantity = variantNode.inventoryQuantity;
        let variantAvailability = variantNode.availableForSale;
        let variantPrice = variantNode.contextualPricing.price.amount;

        // Return a combined object
        return {
          productTitle,
          productDescription,
          productHandle,
          productUrl,
          productPrice,
          productCurrency,
          productImages,
          variantId,
          variantDisplayName,
          variantTitle,
          variantBarcode,
          variantQuantity,
          variantAvailability,
          variantPrice,
          googleFeedSize,
          googleFeedGender,
          googleFeedColor,
          googleFeedAge,
          googleFeedCondition,
          googleFeedBrand,
          googleFeedCategory
        };
      });

      // Add the variants to the result array
      result = [...result, ...productVariants];
    }
  });

  return result;
}


export function extractPageInfo(productsData) {
  // Extract pagination info
  let hasNextPage = productsData.pageInfo.hasNextPage;
  let endCursor = productsData.pageInfo.endCursor;

  return {
      hasNextPage,
      endCursor
  };
}

  
  