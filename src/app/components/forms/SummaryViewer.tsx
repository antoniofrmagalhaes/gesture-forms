import { useState } from "react";
import {
  Box,
  Text,
  Stack,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Progress,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import SummaryTimeline from "./SummaryTimeline";
import { useQuestions } from "@/app/contexts/QuestionsContext";

type FormSummaryProps = {
  layoutType: number; // Determines which layout to use (1 to 10)
};

export default function SummaryViewer({ layoutType }: FormSummaryProps) {
  const { state } = useQuestions();
  const { data } = state;

  console.log(`[SummaryViewer] Data Questionary:`, data.questionary);

  switch (layoutType) {
    case 1:
      return <ListCardsLayout data={data} />;
    case 2:
      return <AccordionLayout data={data} />;
    case 3:
      return <TableLayout data={data} />;
    case 4:
      return <ChatLayout data={data} />;
    case 5:
      return <ProgressBarsLayout data={data} />;
    case 6:
      return <SummaryTimeline data={data} />;
    case 7:
      return <IconsBlocksLayout data={data} />;
    case 8:
      return <ModalLayout data={data} />;
    case 9:
      return <FlipCardsLayout data={data} />;
    case 10:
      return <FormStyleLayout data={data} />;
    default:
      return <ListCardsLayout data={data} />;
  }
}

// 1. List Cards Layout
function ListCardsLayout({
  data,
}: {
  data: { questionary: { question: string; answer: string }[] };
}) {
  return (
    <Stack spacing={4}>
      {data.questionary.map((item, index) => (
        <Box key={index} p={4} borderWidth={1} borderRadius="md" bg="gray.100">
          <Text fontWeight="bold">{item.question}</Text>
          <Text>{item.answer}</Text>
        </Box>
      ))}
    </Stack>
  );
}

// 2. Accordion Layout
function AccordionLayout({
  data,
}: {
  data: { questionary: { question: string; answer: string }[] };
}) {
  return (
    <Accordion allowMultiple>
      {data.questionary.map((item, index) => (
        <AccordionItem key={index}>
          <AccordionButton>
            <Box flex="1" textAlign="left" fontWeight="bold">
              {item.question}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>{item.answer}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

// 3. Table Layout
function TableLayout({
  data,
}: {
  data: { questionary: { question: string; answer: string }[] };
}) {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Pergunta</Th>
          <Th>Resposta</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.questionary.map((item, index) => (
          <Tr key={index}>
            <Td>{item.question}</Td>
            <Td>{item.answer}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

// 4. Chat Layout
function ChatLayout({
  data,
}: {
  data: { questionary: { question: string; answer: string }[] };
}) {
  return (
    <VStack spacing={4} align="start">
      {data.questionary.map((item, index) => (
        <Box key={index}>
          <Text bg="gray.300" p={2} borderRadius="md">
            {item.question}
          </Text>
          <Text bg="blue.200" p={2} borderRadius="md">
            {item.answer}
          </Text>
        </Box>
      ))}
    </VStack>
  );
}

// 5. Progress Bars Layout
function ProgressBarsLayout({
  data,
}: {
  data: { questionary: { question: string; answer: string }[] };
}) {
  return (
    <VStack spacing={4}>
      {data.questionary.map((item, index) => (
        <Box key={index} width="100%">
          <Text>{item.question}</Text>
          <Progress value={Math.random() * 100} size="md" colorScheme="blue" />
          <Text mt={2}>{item.answer}</Text>
        </Box>
      ))}
    </VStack>
  );
}

// 7. Icons Blocks Layout
function IconsBlocksLayout({
  data,
}: {
  data: { questionary: { question: string; answer: string }[] };
}) {
  return (
    <HStack spacing={4} wrap="wrap">
      {data.questionary.map((item, index) => (
        <Box
          key={index}
          p={4}
          borderRadius="md"
          bg="gray.200"
          w="200px"
          textAlign="center"
        >
          <Text fontWeight="bold">{item.question}</Text>
          <Text mt={2}>{item.answer}</Text>
        </Box>
      ))}
    </HStack>
  );
}

// 8. Modal Layout
function ModalLayout({
  data,
}: {
  data: { questionary: { question: string; answer: string }[] };
}) {
  const [isOpen, setIsOpen] = useState(true);
  const onClose = () => setIsOpen(false);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Resumo das Respostas</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            {data.questionary.map((item, index) => (
              <Box key={index}>
                <Text fontWeight="bold">{item.question}</Text>
                <Text>{item.answer}</Text>
              </Box>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// 9. Flip Cards Layout
function FlipCardsLayout({
  data,
}: {
  data: { questionary: { question: string; answer: string }[] };
}) {
  return (
    <HStack spacing={4} wrap="wrap">
      {data.questionary.map((item, index) => (
        <Box
          key={index}
          p={4}
          bg="gray.100"
          borderRadius="md"
          width="200px"
          height="200px"
          textAlign="center"
          cursor="pointer"
          _hover={{
            transform: "rotateY(180deg)",
            transition: "transform 0.6s",
          }}
        >
          <Text fontWeight="bold">{item.question}</Text>
          <Text mt={2}>{item.answer}</Text>
        </Box>
      ))}
    </HStack>
  );
}

// 10. Form Style Layout
function FormStyleLayout({
  data,
}: {
  data: { questionary: { question: string; answer: string }[] };
}) {
  return (
    <Stack spacing={4}>
      {data.questionary.map((item, index) => (
        <Box key={index}>
          <Text fontWeight="bold">{item.question}</Text>
          <Text>{item.answer}</Text>
        </Box>
      ))}
    </Stack>
  );
}
