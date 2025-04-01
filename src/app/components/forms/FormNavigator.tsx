import { Button, HStack, Text } from "@chakra-ui/react";
import { useQuestions } from "@/app/contexts/QuestionsContext";

export default function FormNavigator() {
  const { state, dispatch } = useQuestions();
  const { questionIndex, questions } = state;

  const handleNext = () => {
    const input = document.querySelector("input[name='answer']") as HTMLInputElement;
    if (input) {
      dispatch({
        type: "SUBMIT_ANSWER",
        payload: { answer: input.value },
      });
    } else {
      dispatch({
        type: "SELECT_CHOICE",
        payload: { selectedChoice: "" },
      });
    }
  };

  const handleSubmit = () => {
    dispatch({ type: "SET_VIEW", payload: { index: 1 } });
  };

  return (
    <HStack spacing={4}>
      {questionIndex > 0 && (
        <Button
          size="sm"
          onClick={() => dispatch({ type: "GO_BACK" })}
          color="white"
          backgroundColor="gray.800"
          fontWeight={500}
          boxShadow="md"
          _hover={{
            backgroundColor: "gray.800",
          }}
          _active={{
            backgroundColor: "gray.800",
            boxShadow: "none",
          }}
        >
          Voltar
        </Button>
      )}
      {questionIndex < questions.length - 1 ? (
        <>
          <Text>pressione</Text>
          <Button
            size="sm"
            onClick={handleNext}
            color="white"
            backgroundColor="gray.800"
            fontWeight={500}
            boxShadow="md"
            _hover={{
              backgroundColor: "gray.800",
            }}
            _active={{
              backgroundColor: "gray.800",
              boxShadow: "none",
            }}
          >
            Próximo
          </Button>
          <Text>ENTER ↵</Text>
        </>
      ) : (
        <Button
          size="sm"
          onClick={handleSubmit}
          color="white"
          backgroundColor="gray.800"
          fontWeight={500}
          boxShadow="md"
          _hover={{
            backgroundColor: "gray.800",
          }}
          _active={{
            backgroundColor: "gray.800",
            boxShadow: "none",
          }}
        >
          Enviar
        </Button>
      )}
    </HStack>
  );
}