"use client";

import { Box, Center, Stack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionSvg = motion.svg;
const MotionPath = motion.path;
const MotionBox = motion(Box);
const MotionText = motion(Text);

export default function WaveLoading() {
  return (
    <Center width="100%" height="100vh" color="white" bg="#076B85">
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Stack>
          <Box position="relative">
            <MotionText
              fontSize={32}
              fontWeight={500}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              GESTURE
            </MotionText>

            <MotionText
              position="absolute"
              right={0}
              bottom="-14px"
              fontWeight={500}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.5 }}
            >
              Forms
            </MotionText>
          </Box>

          <Box width="150px" height="100px" overflow="hidden">
            <MotionSvg
              width="1300px"
              height="100px"
              viewBox="0 0 1100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ x: -1100 }}
              animate={{ x: [0, -1100] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <MotionPath
                d="
                  M 0 50 
                  Q 55 0, 110 50 
                  T 220 50 
                  T 330 50 
                  T 440 50 
                  T 550 50 
                  T 660 50 
                  T 770 50 
                  T 880 50 
                  T 990 50 
                  T 1100 50"
                stroke="white"
                strokeWidth="3"
                fill="transparent"
              />
            </MotionSvg>
          </Box>
        </Stack>
      </MotionBox>
    </Center>
  );
}
