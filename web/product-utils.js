
export function formatID(id) {
// Split the string by '/' character and store it in an array
let splitId = id.split('/');
// Pick the last element of the array, which is the product ID
let productId = splitId[splitId.length - 1];
return productId;

}

export function combineProductData(products) {
    return products.flatMap(product => {
      // Extract the product-level information
      let productNode = product.node;
      let productTitle = productNode.title;
      let productDescription = productNode.description;
      let productHandle = productNode.handle;
      // Add more product-level information as needed...
  
      // For each variant, create a new object combining the product data and variant data
      return productNode.variants.edges.map(variantEdge => {
        let variantNode = variantEdge.node;
        let variantId = variantNode.id;
        let variantDisplayName = variantNode.displayName;
        let variantTitle = variantNode.title;
        // Add more variant-level information as needed...
  
        // Return a combined object
        return {
          productTitle: productTitle,
          productDescription: productDescription,
          productHandle: productHandle,
          variantId: variantId,
          variantDisplayName: variantDisplayName,
          variantTitle: variantTitle
          // Include other data as needed...
        };
      });
    });
  }
  
  