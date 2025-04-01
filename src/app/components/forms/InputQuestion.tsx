import { useEffect } from "react";
import { Box, Input, HStack, Button, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormResetField,
} from "react-hook-form";
import { Question, FormValues } from "@/app/contexts/QuestionsContext";

const MotionBox = motion(Box);

type InputQuestionProps = {
  question: Question;
  register: UseFormRegister<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  resetField: UseFormResetField<FormValues>;
  data: { questionary: { question: string; answer: string }[] };
  handleNext: () => Promise<void>;
  handleBack: () => void;
  questionIndex: number;
};

/**
 * Componente `InputQuestion` para renderizar uma pergunta que requer entrada de texto.
 * Inclui animações de entrada e sincronização da resposta atual com o estado do formulário.
 *
 * Funcionalidades dos eventos de teclado (keypress):
 * - `Enter`: Avança para a próxima pergunta e salva a resposta atual.
 * - `Backspace`: Retrocede para a pergunta anterior se o campo de input estiver vazio.
 */
export function InputQuestion({
  question,
  register,
  setValue,
  resetField,
  data,
  handleNext,
  handleBack,
  questionIndex,
}: InputQuestionProps) {
  // Efeito que sincroniza a resposta atual no campo de input.
  useEffect(() => {
    const currentAnswer = data.questionary[questionIndex]?.answer;
    console.log(
      `[InputQuestion] Question Index: ${questionIndex}, Current Answer in Data: ${currentAnswer}`
    ); // Log para depurar o valor atual no data.questionary
    if (currentAnswer) {
      setValue("answer", currentAnswer);
      console.log(`[InputQuestion] Setting value to: ${currentAnswer}`); // Log para depurar o setValue
    } else {
      resetField("answer");
      console.log(`[InputQuestion] Resetting field 'answer'`); // Log para depurar o resetField
    }
  }, [questionIndex, setValue, data.questionary, resetField]);

  /**
   * Manipula os eventos de pressionamento de teclas no campo de input.
   * Avança para a próxima pergunta ao pressionar Enter ou volta à pergunta anterior ao pressionar Backspace.
   *
   * Funcionalidades dos eventos de teclado (keypress):
   * - `Enter`: Avança para a próxima pergunta e salva a resposta atual.
   * - `Backspace`: Retrocede para a pergunta anterior se o campo de input estiver vazio.
   *
   * @param {React.KeyboardEvent} e - O evento de pressionamento de tecla.
   */
  const handleInputKeyPress = async (e: React.KeyboardEvent) => {
    const input = e.currentTarget as HTMLInputElement;
    console.log(
      `[InputQuestion] Key Pressed: ${e.key}, Input Value: ${input.value}`
    ); // Log para depurar o valor do input
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      await handleNext();
    } else if (e.key === "Backspace" && input.value === "") {
      e.preventDefault();
      e.stopPropagation();
      handleBack();
    }
  };

  // Variantes de animação para o efeito de entrada.
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
          {question.question} {/* Renderiza o texto da pergunta */}
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
          {...register("answer", { required: "A resposta é obrigatória" })} // Vincula o input ao formulário
          placeholder={question.placeholder || "Digite sua resposta aqui..."} // Define o placeholder do input
          _placeholder={{ color: "gray.200", fontWeight: 500 }}
          variant="flushed"
          focusBorderColor="blue.500"
          onKeyDown={handleInputKeyPress} // Adiciona o manipulador de eventos de teclas
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
            onClick={handleNext}
            color="white"
            borderRadius={8}
            backgroundColor="gray.800"
          >
            OK {/* Botão para avançar manualmente */}
          </Button>
          <Text>Pressione Enter ↵</Text> {/* Indicação de ação ao usuário */}
        </HStack>
      </MotionBox>
    </>
  );
}
