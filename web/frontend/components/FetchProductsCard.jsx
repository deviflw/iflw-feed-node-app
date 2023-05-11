import { useState } from "react";
import { Card, Text } from "@shopify/polaris";
import { Toast } from "@shopify/app-bridge-react";
import { useAuthenticatedFetch } from "../hooks";

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
      console.log('My data: ', response.json()); // <-- access fetchedProducts here
      setToastProps({ content: "Products fetched successfully!" });
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
