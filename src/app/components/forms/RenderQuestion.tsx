import { Box, Text } from "@chakra-ui/react";
import { InputQuestion } from "@/app/components/forms/InputQuestion";
import { ChoiceQuestion } from "@/app/components/forms/ChoiceQuestion";
import { useQuestions } from "@/app/contexts/QuestionsContext";

export function RenderQuestion() {
  const { state } = useQuestions();
  const { questionIndex, questions } = state;
  const question = questions[questionIndex];

  if (!question) return null;

  return (
    <Box maxWidth={1000}>
      <Text fontSize={{ base: 32, lg: 42 }} fontWeight="500" mb={4}>
        {question.question}
      </Text>
      {question.inputType === "input" ? (
        <InputQuestion question={question} questionIndex={questionIndex} />
      ) : question.inputType === "choice" && question.choices ? (
        <ChoiceQuestion question={question} questionIndex={questionIndex} />
      ) : null}
    </Box>
  );
}