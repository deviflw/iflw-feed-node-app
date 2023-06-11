import { useState } from "react";
import { Card, Text } from "@shopify/polaris";
import { Toast } from "@shopify/app-bridge-react";
import { useAuthenticatedFetch } from "../hooks";
import { xmlGenerator } from './xml-feed.js';
import fs from 'fs';
import path from 'path';

export function FetchProductsCard() {
  const emptyToastProps = { content: null };
  const [isLoading, setIsLoading] = useState(false);
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const fetch = useAuthenticatedFetch();

  const toastMarkup = toastProps.content && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );

  const handleFetchProducts = async () => {
    setIsLoading(true);
    const response = await fetch("/api/products");
  
    if (response.ok) {
      setIsLoading(false);
      const products = await response.json();
      console.log('My products and xml: ', products); 
  
      // Generate the XML.
      const xml = xmlGenerator(products);
  
      // Write the XML to a file.
      const outputPath = path.join(__dirname, 'frontend', 'feeds', 'products.xml');
      fs.writeFileSync(outputPath, xml, 'utf8');
  
      setToastProps({ content: "Products fetched and XML generated successfully!" });
    } else {
      setIsLoading(false);
      setToastProps({
        content: "There was an error creating products",
        error: true,
      });
    }
  };
  
  
  
  return (
    <>
      {toastMarkup}
      <Card
        title="Fetch Products"
        sectioned
        primaryFooterAction={{
          content: "Fetch Products",
          onAction: handleFetchProducts,
          loading: isLoading,
        }}
      >
        <Text spacing="loose">
            This will fetch products and display the result in the browser console.
        </Text>
      </Card>
    </>
  );
}