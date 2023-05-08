console.log('index page...');

import {
  AlphaCard,
  Page,
  Layout,
  VerticalStack,
  Image,
  LegacyStack,
  Link,
  Text,
  Button
} from "@shopify/polaris";

import {
  MagicMajor
} from '@shopify/polaris-icons';

import {TitleBar} from "@shopify/app-bridge-react";

import {trophyImage} from "../assets";

import {ProductsCard} from "../components";

export default function HomePage() {
  return (
    <Page narrowWidth>
      <TitleBar title="Milanova" primaryAction={null}/>
      <Layout>
        <Layout.Section>
          <AlphaCard sectioned>
            <LegacyStack
              wrap={false}
              spacing="extraTight"
              distribution="trailing"
              alignment="center">
              <LegacyStack.Item fill>
                <VerticalStack spacing="loose">
                  <Text as="h2" variant="headingMd">
                    Nice work on building a Shopify app 🎉
                  </Text>
                  <p>
                    Your app is ready to explore! It contains everything you need to get started
                    including the{" "}
                    <Link url="https://polaris.shopify.com/" external>
                      Polaris design system
                    </Link>
                    ,{" "}
                    <Link url="https://shopify.dev/api/admin-graphql" external>
                      Shopify Admin API
                    </Link>
                    , and{" "}
                    <Link url="https://shopify.dev/apps/tools/app-bridge" external>
                      App Bridge
                    </Link>{" "}
                    UI library and components.
                  </p>
                  <p>
                    Ready to go? Start populating your app with some sample products to view and
                    test in your store.{" "}
                  </p>
                  <p>
                    Learn more about building out your app in{" "}
                    <Link url="https://shopify.dev/apps/getting-started/add-functionality" external>
                      this Shopify tutorial
                    </Link>{" "}
                    📚{" "}
                  </p>
                </VerticalStack>
              </LegacyStack.Item>
              <LegacyStack.Item>
                <div style={{
                  padding: "0 20px"
                }}>
                  <Image
                    source={trophyImage}
                    alt="Nice work on building a Shopify app"
                    width={120}/>
                </div>
              </LegacyStack.Item>
              <LegacyStack.Item>
                <div style={{
                  padding: "0 15px"
                }}>
                  <Button
                    accessibilityLabel="Milanova button"
                    icon={MagicMajor}
                    url=""
                    external>Milanova button
                  </Button>
                </div>
              </LegacyStack.Item>
            </LegacyStack>
          </AlphaCard>
        </Layout.Section>
        <Layout.Section>
          <ProductsCard/>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
