import { useEffect, useRef } from "react";
import { Box, Input, HStack, Button, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Question, useQuestions } from "@/app/contexts/QuestionsContext";

const MotionBox = motion(Box);

type InputQuestionProps = {
  question: Question;
  questionIndex: number;
};

export function InputQuestion({ question, questionIndex }: InputQuestionProps) {
  const { state, dispatch, register, setValue, resetField } = useQuestions();
  const isProcessingRef = useRef(false);

  useEffect(() => {
    const currentAnswer = state.data.questionary[questionIndex]?.answer;
    console.log(
      `[InputQuestion] Question Index: ${questionIndex}, Current Answer in Data: ${currentAnswer}`
    );
    if (currentAnswer) {
      setValue("answer", currentAnswer);
      console.log(`[InputQuestion] Setting value to: ${currentAnswer}`);
    } else {
      resetField("answer");
      console.log(`[InputQuestion] Resetting field 'answer'`);
    }
    isProcessingRef.current = false; // Reset isProcessingRef on question change
  }, [questionIndex, setValue, state.data.questionary, resetField]);

  const handleInputKeyPress = async (e: React.KeyboardEvent) => {
    if (isProcessingRef.current) {
      console.log(`[InputQuestion] Key Press Ignored (Processing): ${e.key}`);
      return;
    }

    const input = e.currentTarget as HTMLInputElement;
    console.log(
      `[InputQuestion] Key Pressed: ${e.key}, Input Value: ${input.value}`
    );

    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      isProcessingRef.current = true;
      dispatch({
        type: "SUBMIT_ANSWER",
        payload: { answer: input.value },
      });
    } else if (e.key === "Backspace" && input.value === "") {
      e.preventDefault();
      e.stopPropagation();
      dispatch({ type: "GO_BACK" });
    }
  };

  const slideInVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <>
      <MotionBox
        key={`input-${questionIndex}`}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={slideInVariants}
        transition={{ duration: 0.1, ease: "easeOut", delay: 0.1 }}
      >
        <Text fontSize={{ base: 32, lg: 42 }} fontWeight="500">
          {question.question}
        </Text>
      </MotionBox>

      <MotionBox
        key={`input-field-${questionIndex}`}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={slideInVariants}
        transition={{ duration: 0.1, ease: "easeOut", delay: 0.2 }}
      >
        <Input
          size="lg"
          {...register("answer", { required: "A resposta é obrigatória" })}
          placeholder={question.placeholder || "Digite sua resposta aqui..."}
          _placeholder={{ color: "gray.200", fontWeight: 500 }}
          variant="flushed"
          focusBorderColor="blue.500"
          onKeyDown={handleInputKeyPress}
        />
      </MotionBox>

      <MotionBox
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={slideInVariants}
        transition={{ duration: 0.1, ease: "easeOut", delay: 0.3 }}
      >
        <HStack mt={4}>
          <Button
            size="sm"
            onClick={() => {
              if (isProcessingRef.current) return;
              isProcessingRef.current = true;
              const input = document.querySelector(
                "input[name='answer']"
              ) as HTMLInputElement;
              dispatch({
                type: "SUBMIT_ANSWER",
                payload: { answer: input.value },
              });
            }}
            color="white"
            borderRadius={8}
            backgroundColor="gray.800"
          >
            OK
          </Button>
          <Text>Pressione Enter ↵</Text>
        </HStack>
      </MotionBox>
    </>
  );
}
