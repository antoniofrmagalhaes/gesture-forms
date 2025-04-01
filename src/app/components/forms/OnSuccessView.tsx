"use client";

import { Stack, Box, Text, Link } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { motion } from "framer-motion";

const MotionStack = motion(Stack);

export default function OnSuccessView({
  successMessage,
  followUpMessage,
  servicesLink,
  directRequestLink,
  supportEmail,
  countdownTime = 15,
  onRedirect,
}: {
  successMessage: string;
  followUpMessage: string;
  servicesLink: string;
  directRequestLink: string;
  supportEmail: string;
  countdownTime?: number;
  onRedirect: () => void;
}) {
  const [countdown, setCountdown] = useState(countdownTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(timer);
          onRedirect();
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onRedirect]);

  return (
    <MotionStack
      spacing={8}
      width="100%"
      p={8}
      align="center"
      initial={{ opacity: 0, transform: "translateX(15px)" }}
      animate={{ opacity: 1, transform: "translateX(0)" }}
      exit={{ opacity: 0, transform: "translateX(-15px)" }}
      transition={{ duration: 0.3 }}
    >
      <Text fontSize="32px" color="white" textAlign="center">
        {successMessage}
      </Text>
      <Stack>
        <Text color="gray.300" textAlign="center">
          {followUpMessage}
        </Text>
        <Text color="gray.300" textAlign="center">
          Explore nossas{" "}
          <Link href={servicesLink} color="#076B85">
            soluções e serviços
          </Link>{" "}
          ou envie uma{" "}
          <Link href={directRequestLink} color="#076B85">
            solicitação direta
          </Link>{" "}
          para uma reunião com nossos consultores.
        </Text>
      </Stack>
      <Text fontSize="md" color="gray.300" textAlign="center">
        Se precisar de ajuda, entre em contato com{" "}
        <Link href={`mailto:${supportEmail}`} color="#076B85" isExternal>
          {supportEmail}
        </Link>
        .
      </Text>

      <Stack align="center" spacing={4}>
        <Text color="gray.300">Redirecionaremos você em:</Text>
        <Box width="60px" height="60px">
          <CircularProgressbar
            value={(countdown / countdownTime) * 100}
            text={`${countdown}s`}
            styles={buildStyles({
              textColor: "white",
              pathColor: "#076B85",
              trailColor: "#1C1C1C",
            })}
          />
        </Box>
      </Stack>
    </MotionStack>
  );
}
