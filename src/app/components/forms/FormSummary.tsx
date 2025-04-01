import { Box, Text } from '@chakra-ui/react';

type FormSummaryProps = {
  data: { questionary: { question: string; answer: string }[] };
};

export default function FormSummary({ data }: FormSummaryProps) {
  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Resumo das Respostas
      </Text>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Box>
  );
}
