import { useState } from "react";
import { Card, Text } from "@shopify/polaris";
import { Toast } from "@shopify/app-bridge-react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";

export function FetchProductsCard() {
  const emptyToastProps = { content: null };
  const [isLoading, setIsLoading] = useState(false);
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const fetch = useAuthenticatedFetch();

  const {
    data,
    refetch: refetchProducts,
    isLoading: isLoadingProducts,
    isRefetching: isRefetchingProducts,
  } = useAppQuery({
    url: "/api/products",
    fetchInit: { fetch },
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });

  const toastMarkup = toastProps.content && !isRefetchingProducts && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );

  const handleFetchProducts = async () => {
    setIsLoading(true);
    const response = await fetch("/api/products");

    if (response.ok) {
      const data = await refetchProducts();
      console.log('My data: ', data);
      setIsLoading(false);
      setToastProps({ content: "Products fetched successfully!" });
    } else {
      const errorData = await response.json(); // Extract error data from the response
      console.error('Error fetching products:', errorData); // Log the error data
      setIsLoading(false);
      setToastProps({
        content: "There was an error fetching products",
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
