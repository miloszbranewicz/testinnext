import Head from "next/head";
import React from "react";
import Header from "./Header";
import { Toaster } from "react-hot-toast";


type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>Tracker</title>
        <meta name="description" content="Task tracker app." />
        <link rel="icon" href="/favicon.png" />
        <meta name="robots" content="noindex" />
      </Head>
      <Header />
      <main className="min-h-screen container mx-auto py-12">
        {children}
      </main>
      <Toaster />
    </>
  );
}
