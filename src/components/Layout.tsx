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
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
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
