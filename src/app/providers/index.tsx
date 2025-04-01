"use client";

import { ReactNode } from "react";

import ChakraSetup from "./chakra-ui/setup";

export default function Providers({ children }: { children: ReactNode }) {
  return <ChakraSetup>{children}</ChakraSetup>;
}
