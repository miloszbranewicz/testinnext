import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Theme } from "@radix-ui/themes";
import { api } from "~/utils/api";
import "@radix-ui/themes/styles.css";
import "~/styles/globals.css";
import Layout from "~/components/Layout";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Theme appearance="dark" accentColor="orange" radius="small" scaling="95%">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Theme>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
