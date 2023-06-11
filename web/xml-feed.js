const builder = require('xmlbuilder');

function xmlGenerator(products) {
  // Create the root element
  let root = builder.create('products');

  // Loop through each product and add it to the XML
  products.forEach(product => {
    let productElement = root.ele('product');
    productElement.ele('title', product.title);
    productElement.ele('tags', product.tags);
    productElement.ele('id', product.id);
  });

  // Convert the XML to a string
  let xml = root.end({ pretty: true });

  return xml;
}

module.exports = { xmlGenerator };
