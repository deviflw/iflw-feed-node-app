import { create } from "xmlbuilder2";
import * as utils from "./product-utils.js";

export function xmlGenerator(fetchedProducts, country) {

  const products = fetchedProducts.body.data.products.edges;

  const productData = utils.combineProductData(products);

  const root = create().ele('rss', { 'xmlns:g': 'http://base.google.com/ns/1.0', version: '2.0' });
  const channel = root.ele('channel');
  channel.ele('title').txt('IFLW EUR');
  channel.ele('link').txt('https://iflwatches.com');
  channel.ele('description').txt('Luxurious Watch Accessories Made by Hand');

  const shippingInfo = {
    'US': { service1: 'FedEx International Priority', price1: '31', service2: 'FedEx International Economy', price2: '0' },
    'GB': { service1: 'DHL Express Worldwide', price1: '25', service2: 'DHL Express Economy Select', price2: '0' },
    'DE': { service1: 'DHL Express Worldwide', price1: '29', service2: 'DHL Express Economy Select', price2: '0' }
  };

  productData.forEach(product => {
    const item = channel.ele('item');
    item.ele('g:id').txt(utils.formatID(product.variantId));
    item.ele('g:title').txt(product.variantTitle === 'Default Title' ? product.productTitle : product.variantDisplayName);
    item.ele('g:description').txt(product.productDescription);
    item.ele('g:link').txt(product.productUrl);
    item.ele('g:image_link').txt(product.productImages[0]); // This assumes there's at least one image, handle accordingly if not
    item.ele('g:availability').txt(product.variantAvailability ? 'in stock' : 'out of stock');
    item.ele('g:price').txt(`${product.variantPrice} ${product.productCurrency}`);
    item.ele('g:gtin').txt(product.variantBarcode);

    item.ele('g:google_product_category').txt(product.googleFeedCategory);
    item.ele('g:brand').txt(product.googleFeedBrand);
    item.ele('g:condition').txt(product.googleFeedCondition);
    item.ele('g:age_group').txt(product.googleFeedAge);
    item.ele('g:color').txt(product.googleFeedColor);
    item.ele('g:gender').txt(product.googleFeedGender);
    item.ele('g:size').txt(product.googleFeedSize == null ? '' : product.googleFeedSize);

    const shipping1 = item.ele('g:shipping');
    shipping1.ele('g:country').txt(country);
    shipping1.ele('g:service').txt(shippingInfo[country].service1);
    shipping1.ele('g:price').txt(`${shippingInfo[country].price1} ${product.productCurrency}`);
    
    const shipping2 = item.ele('g:shipping');
    shipping2.ele('g:country').txt(country);
    shipping2.ele('g:service').txt(shippingInfo[country].service2);
    shipping2.ele('g:price').txt(`${shippingInfo[country].price2} ${product.productCurrency}`);

    // Handle the additional image links
    product.productImages.slice(1).forEach(imageUrl => { // This will start from the second image, if exists
      item.ele('g:additional_image_link').txt(imageUrl);
    });
    
    item.ele('g:identifier_exists').txt('yes');
    });
  
  const xml = root.end({ prettyPrint: true });

  return xml;
}



