import { useState, useEffect, useCallback, useRef } from "react";
import { Box, Text, HStack, Stack, Center } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Question, useQuestions } from "@/app/contexts/QuestionsContext";

const MotionBox = motion(Box);

type ChoiceQuestionProps = {
  question: Question;
  questionIndex: number;
};

export function ChoiceQuestion({
  question,
  questionIndex,
}: ChoiceQuestionProps) {
  const { dispatch } = useQuestions();
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState(0);
  const [choiceConfirmed, setChoiceConfirmed] = useState(false);
  const isProcessingRef = useRef(false);

  useEffect(() => {
    setSelectedChoiceIndex(0);
    setChoiceConfirmed(false);
    isProcessingRef.current = false;
  }, [questionIndex]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (isProcessingRef.current) {
        console.log(
          `[ChoiceQuestion] Key Press Ignored (Processing): ${e.key}`
        );
        return;
      }

      console.log(
        `[ChoiceQuestion] Key Pressed: ${e.key}, Question Index: ${questionIndex}`
      );

      if (e.key === "Backspace") {
        dispatch({ type: "GO_BACK" });
        e.preventDefault();
        e.stopPropagation();
      } else if (!choiceConfirmed) {
        if (e.key === "ArrowDown") {
          setSelectedChoiceIndex((prevIndex) =>
            prevIndex < question.choices!.length - 1 ? prevIndex + 1 : 0
          );
        }
        if (e.key === "ArrowUp") {
          setSelectedChoiceIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : question.choices!.length - 1
          );
        }
        if (e.key === "Enter") {
          isProcessingRef.current = true;
          setChoiceConfirmed(true);
          dispatch({
            type: "SELECT_CHOICE",
            payload: {
              selectedChoice: question.choices![selectedChoiceIndex].choice,
            },
          });
          console.log(
            `[ChoiceQuestion] Choice Confirmed: ${
              question.choices![selectedChoiceIndex].choice
            }`
          );
        }
      }
    },
    [selectedChoiceIndex, choiceConfirmed, question, dispatch, questionIndex]
  );

  useEffect(() => {
    if (question.choices) {
      window.addEventListener("keydown", handleKeyPress);

      return () => {
        window.removeEventListener("keydown", handleKeyPress);
        console.log(
          `[ChoiceQuestion] Removed Key Press Listener for Question Index: ${questionIndex}`
        );
      };
    }
  }, [question, handleKeyPress, questionIndex]);

  return (
    <Stack spacing={4}>
      <MotionBox
        key={`choice-${questionIndex}`}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.15, ease: "easeOut", delay: 0.05 }}
      >
        <Text fontSize={{ base: 32, lg: 42 }} fontWeight="500">
          {question.question}
        </Text>
      </MotionBox>

      <Stack spacing={4}>
        {question.choices &&
          question.choices.map(({ key, choice }, index) => (
            <MotionBox
              key={key}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{
                duration: 0.15,
                ease: "easeOut",
                delay: 0.1 + index * 0.05,
              }}
            >
              <HStack
                p={3}
                borderRadius={8}
                border="1px solid white"
                bg={index === selectedChoiceIndex ? "blue.500" : "transparent"}
                color={index === selectedChoiceIndex ? "white" : "gray.300"}
                cursor="pointer"
                onClick={() => {
                  if (isProcessingRef.current) return;
                  isProcessingRef.current = true;
                  setSelectedChoiceIndex(index);
                  setChoiceConfirmed(true);
                  dispatch({
                    type: "SELECT_CHOICE",
                    payload: { selectedChoice: choice },
                  });
                }}
              >
                <HStack color="white">
                  <Center
                    width="30px"
                    height="30px"
                    borderRadius={8}
                    border="1px solid #818181"
                    bg="gray.800"
                  >
                    <Text fontWeight={700}>{key}</Text>
                  </Center>
                  <Text fontWeight={500}>{choice}</Text>
                </HStack>
              </HStack>
            </MotionBox>
          ))}
      </Stack>

      <MotionBox
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.15, ease: "easeOut", delay: 0.3 }}
      >
        <HStack mt={4}>
          <Text>
            Use os botões ↑ ou ↓ para navegar pelas opções e pressione Enter ↵
          </Text>
        </HStack>
      </MotionBox>
    </Stack>
  );
}
