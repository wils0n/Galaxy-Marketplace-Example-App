import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { LDProvider, useLDClient } from "launchdarkly-react-client-sdk";
import NoSSRWrapper from "@/components/no-ssr";
import { TripsProvider } from "@/utils/contexts/TripContext";
import { LoginProvider } from "@/utils/contexts/login";
import KeyboardNavigation from "@/components/KeyboardNavigation";
import Head from "next/head";
import { PersonaProvider } from "@/components/personacontext";
import { QuickCommandDialog } from "@/components/quickcommand";

const context = {
  kind: "user",
  key: "user-key-123abcde",
  email: "biz@face.dev",
};

function AppWrapper({ Component, pageProps }: AppProps) {
  const ldClient = useLDClient();

  useEffect(() => {
    ldClient?.track(process.env.NEXT_PUBLIC_LD_EVENT_KEY || "");
  }, [ldClient]);

  return (
    <NoSSRWrapper>
      <PersonaProvider>
        <LoginProvider>
          <QuickCommandDialog>
            <TripsProvider>
              <KeyboardNavigation />
              <Head>
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
                />
                <link rel="apple-touch-icon" href="/apple-icon.png" />
              </Head>
              <Component {...pageProps} />
            </TripsProvider>
          </QuickCommandDialog>
        </LoginProvider>
      </PersonaProvider>
    </NoSSRWrapper>
  );
}

export default function MyApp(props: AppProps) {
  return (
    <LDProvider clientSideID={process.env.NEXT_PUBLIC_LD_CLIENT_KEY || ""} context={context}>
      <AppWrapper {...props} />
    </LDProvider>
  );
}