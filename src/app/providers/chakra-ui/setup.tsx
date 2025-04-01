"use client";

import { useState } from "react";

import { ChakraProvider } from "@chakra-ui/react";

import { useServerInsertedHTML } from "next/navigation";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

import theme from "./theme";
import QuestionsProvider from "@/app/contexts/QuestionsContext";

const createEmotionCache = () => {
  const cache = createCache({ key: "chakra-ui-css" });
  cache.compat = true;
  return cache;
};

export function ChakraSetup({ children }: { children: React.ReactNode }) {
  const [cache] = useState(createEmotionCache);

  useServerInsertedHTML(() => {
    const styles = Object.values(cache.inserted).join("\n");
    if (!styles) return null;

    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ChakraProvider theme={theme}>
        <QuestionsProvider>{children}</QuestionsProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}

export default ChakraSetup;
