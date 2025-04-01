import { useState, useEffect } from "react";
import { Box, Text, HStack, Stack, Center } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Question } from "@/app/contexts/QuestionsContext";

const MotionBox = motion(Box);

type ChoiceQuestionProps = {
  question: Question;
  handleChoiceSelection: (choice: string) => void;
  handleNext: () => void;
  handleBack: () => void;
  questionIndex: number;
};

/**
 * Componente `ChoiceQuestion` para renderizar uma pergunta de escolha múltipla.
 * Permite a seleção de uma opção usando o teclado ou o mouse.
 *
 * @param {Question} question - A pergunta a ser renderizada, incluindo as opções de escolha.
 * @param {(choice: string) => void} handleChoiceSelection - Função que manipula a seleção de uma escolha.
 * @param {() => Promise<void>} handleNext - Função para avançar para a próxima pergunta.
 * @param {() => void} handleBack - Função para voltar à pergunta anterior.
 * @param {number} questionIndex - Índice da pergunta atual.
 */
export function ChoiceQuestion({
  question,
  handleChoiceSelection,
  handleNext,
  handleBack,
  questionIndex,
}: ChoiceQuestionProps) {
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState(0); // Estado para armazenar o índice da escolha selecionada
  const [choiceConfirmed, setChoiceConfirmed] = useState(false); // Estado para confirmar se a escolha foi feita

  // Efeito para resetar a escolha quando a pergunta muda
  useEffect(() => {
    setSelectedChoiceIndex(0);
    setChoiceConfirmed(false);
  }, [questionIndex]);

  // Efeito para capturar eventos de teclado e manipular a navegação/seleção
  useEffect(() => {
    if (question.choices) {
      /**
       * Função para manipular eventos de pressionamento de teclas.
       * Permite a navegação entre as escolhas e a confirmação de seleção.
       *
       * @param {KeyboardEvent} e - Evento de pressionamento de tecla.
       */
      const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === "Backspace") {
          handleBack();
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
            setChoiceConfirmed(true);
            handleChoiceSelection(
              question.choices![selectedChoiceIndex].choice
            );
            console.log(
              `Escolha confirmada: ${
                question.choices![selectedChoiceIndex].choice
              }`
            );
          }
        } else if (e.key === "Enter" && choiceConfirmed) {
          console.log("Avançando para a próxima pergunta");
          handleNext();
        }
      };

      // Adiciona o event listener para capturar as teclas pressionadas
      window.addEventListener("keydown", handleKeyPress);

      // Remove o event listener quando o componente é desmontado ou quando as dependências mudam
      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    }
  }, [
    selectedChoiceIndex,
    choiceConfirmed,
    question,
    handleChoiceSelection,
    handleNext,
    handleBack,
  ]);

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
                  // Selecionar a escolha ao clicar
                  setSelectedChoiceIndex(index);
                  setChoiceConfirmed(true);
                  handleChoiceSelection(choice);
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
