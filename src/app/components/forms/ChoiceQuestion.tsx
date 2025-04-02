import { useState, useEffect, useRef } from "react";
import { Box, Button, HStack, Stack, Center, Text } from "@chakra-ui/react";
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
  const { state, dispatch } = useQuestions();
  const { data } = state;
  const currentAnswer = data.questionary[questionIndex]?.answer;
  const initialChoiceIndex = currentAnswer
    ? question.choices?.findIndex(
        (choice) => choice.choice === currentAnswer
      ) || 0
    : 0;
  const [selectedChoiceIndex, setSelectedChoiceIndex] =
    useState(initialChoiceIndex);
  const choiceRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const selectedButton = choiceRefs.current[selectedChoiceIndex];
    if (selectedButton) {
      selectedButton.focus();
    }
  }, [questionIndex, selectedChoiceIndex]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (index + 1) % question.choices!.length;
      setSelectedChoiceIndex(nextIndex);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex =
        (index - 1 + question.choices!.length) % question.choices!.length;
      setSelectedChoiceIndex(prevIndex);
    } else if (e.key === "Enter") {
      e.preventDefault();
      dispatch({
        type: "SELECT_CHOICE",
        payload: { selectedChoice: question.choices![index].choice },
      });
    } else if (e.key === "Backspace") {
      e.preventDefault();
      dispatch({ type: "GO_BACK" });
    }
  };

  const handleClick = (index: number, choice: string) => {
    setSelectedChoiceIndex(index);
    dispatch({
      type: "SELECT_CHOICE",
      payload: { selectedChoice: choice },
    });
  };

  return (
    <Stack spacing={4}>
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
                delay: 0.05 + index * 0.05,
              }}
            >
              <Button
                ref={(el) => {
                  choiceRefs.current[index] = el;
                }}
                px={2}
                height="46px"
                minWidth="300px"
                borderRadius={8}
                border="1px solid white"
                bg={index === selectedChoiceIndex ? "blue.500" : "transparent"}
                color={index === selectedChoiceIndex ? "white" : "gray.300"}
                _hover={{ bg: "blue.500", color: "white" }}
                _focus={{ bg: "blue.500" }}
                onClick={() => handleClick(index, choice)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                variant="unstyled"
              >
                <HStack spacing={4} color="white">
                  <Center
                    width="30px"
                    height="30px"
                    borderRadius={6}
                    border="1px solid #818181"
                    bg="gray.800"
                  >
                    <Text fontWeight={700}>{key}</Text>
                  </Center>
                  <Text fontWeight={500}>{choice}</Text>
                </HStack>
              </Button>
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
