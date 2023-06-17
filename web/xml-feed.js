import { create } from 'xmlbuilder2';

export function xmlGenerator(products) {

  console.log('Products data', products);
    const root = create().ele('rss', { 'xmlns:g': 'http://base.google.com/ns/1.0', version: '2.0' });
    const channel = root.ele('channel');
    channel.ele('title').txt('IFLW EUR');
    channel.ele('link').txt('https://iflwatches.com');
    channel.ele('description').txt('Luxurious Watch Accessories Made by Hand');
    const item = channel.ele('item');
    //TODO 
    item.ele('g:id').txt('my id');
    item.ele('g:title').txt('my title');
    item.ele('g:description').txt('my description');
    item.ele('g:link').txt('my link');
    item.ele('g:image_link').txt('my image_link');
    item.ele('g:availability').txt('my availability');
    item.ele('g:price').txt('my price');
    item.ele('g:google_product_category').txt('my google_product_category');
    item.ele('g:brand').txt('my brand');
    item.ele('g:gtin').txt('my gtin');
    item.ele('g:condition').txt('my condition');
    item.ele('g:age_group').txt('my age_group');
    item.ele('g:color').txt('my color');
    item.ele('g:gender').txt('my gender');
    item.ele('g:size').txt('my size');

    const shipping1 = item.ele('g:shipping');
    shipping1.ele('g:country').txt('my country');
    shipping1.ele('g:service').txt('my service');
    shipping1.ele('g:price').txt('my shipping price');
    
    const shipping2 = item.ele('g:shipping');
    shipping2.ele('g:country').txt('my second country');
    shipping2.ele('g:service').txt('my second service');
    shipping2.ele('g:price').txt('my second shipping price');

    item.ele('g:additional_image_link').txt('my additional_image_link');
    item.ele('g:identifier_exists').txt('yes');
   
    for(let i = 1; i <= 5; i++)
    {
      const item = channel.ele('data');
      item.att('x', i);
      item.att('y', i * i);
    }
    
    const xml = root.end({ prettyPrint: true });

    return xml;

}

// xmlns:g="http://base.google.com/ns/1.0" version="2.0"



