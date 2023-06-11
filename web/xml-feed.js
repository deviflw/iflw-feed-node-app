import { create } from 'xmlbuilder';

export function xmlGenerator(products) {

    // let xml = create(products).end({ pretty: true});
    // console.log(xml);

    let obj = {
        root: {
          xmlbuilder: {
            repo: {
              '@type': 'git', // attributes start with @
              '#text': products // text node
            }
          }
        }
      };
       
      let xml = create(obj).end({ pretty: true});
      console.log('My xml: ', xml);

      return xml;

}



