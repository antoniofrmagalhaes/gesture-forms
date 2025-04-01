import { Box, Text, Grid, GridItem, Stack } from "@chakra-ui/react";
import React from "react";
import { useQuestions } from "@/app/contexts/QuestionsContext";

type SummaryTimelineProps = {
  data: { questionary: { question: string; answer: string }[] };
};

export default function SummaryTimeline({ data }: SummaryTimelineProps) {
  const { dispatch } = useQuestions();

  const onQuestionClick = (index: number) => {
    dispatch({ type: "JUMP_TO_QUESTION", payload: { index } });
  };

  console.log(`[SummaryTimeline] Data Questionary:`, data.questionary);

  return (
    <Grid templateColumns="20px 2px auto" height="100%" gap={3} rowGap={6} position="relative" paddingY={4}>
      {data.questionary.map((item, index) => (
        <React.Fragment key={`row-${index}`}>
          <GridItem display="flex" justifyContent="center" alignItems="flex-start">
            <Box fontWeight="bold" fontSize="20px" cursor="pointer" onClick={() => onQuestionClick(index)}>
              {index + 1}
            </Box>
          </GridItem>
          <GridItem bg="gray.300" height="auto" width="2px" />
          <GridItem onClick={() => onQuestionClick(index)}>
            <Stack pl={2}>
              <Text fontWeight="bold">{item.question}</Text>
              <Text>{item.answer}</Text>
            </Stack>
          </GridItem>
        </React.Fragment>
      ))}
    </Grid>
  );
}