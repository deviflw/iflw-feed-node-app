import {AlphaCard, Page, Layout, VerticalStack, Text} from "@shopify/polaris";
import {TitleBar} from "@shopify/app-bridge-react";

export default function PageName() {
  return (
    <Page>
      <TitleBar
        title="Page name"
        primaryAction={{
        content: "Primary action",
        onAction: () => console.log("Primary action")
      }}
        secondaryActions={[{
          content: "Secondary action",
          onAction: () => console.log("Secondary action")
        }
      ]}/>
      <Layout>
        <Layout.Section>
          <div style={ {marginBottom: "20px"}}>
          <AlphaCard>
            <Text variant="headingMd" as="h2">
              Heading
            </Text>
            <VerticalStack>
              <p>Body</p>
            </VerticalStack>
          </AlphaCard>
          </div>
          <AlphaCard>
            <Text variant="headingMd" as="h2">
              HHHH
            </Text>
            <VerticalStack>
              <p>Body</p>
            </VerticalStack>
          </AlphaCard>
        </Layout.Section>
        <Layout.Section secondary>
          <AlphaCard>
            <Text variant="headingMd" as="h2">
              Gggg
            </Text>
            <VerticalStack>
              <p>Body</p>
            </VerticalStack>
          </AlphaCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
