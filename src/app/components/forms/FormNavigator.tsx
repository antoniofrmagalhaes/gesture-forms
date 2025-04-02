import { Button, HStack, Icon, useBreakpointValue } from "@chakra-ui/react";
import { useQuestions } from "@/app/contexts/QuestionsContext";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";

export default function FormNavigator() {
  const { state, dispatch } = useQuestions();
  const { questionIndex, questions } = state;

  const buttonVariant = useBreakpointValue(
    {
      base: "icon",
      md: "text",
    },
    {
      fallback: "text",
    }
  );

  const handleNext = () => {
    const input = document.querySelector(
      "input[name='answer']"
    ) as HTMLInputElement;
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

  const commonButtonProps = {
    size: "sm",
    color: "white",
    backgroundColor: "gray.800",
    boxShadow: "md",
    _hover: {
      backgroundColor: "gray.800",
    },
    _active: {
      backgroundColor: "gray.800",
      boxShadow: "none",
    },
  };

  return (
    <HStack spacing={4}>
      {questionIndex > 0 && (
        <Button
          {...commonButtonProps}
          onClick={() => dispatch({ type: "GO_BACK" })}
          {...(buttonVariant === "icon"
            ? { "aria-label": "Voltar" }
            : { fontWeight: 500 })}
        >
          {buttonVariant === "icon" ? <Icon as={RiArrowLeftLine} /> : "Voltar"}
        </Button>
      )}
      {questionIndex < questions.length - 1 ? (
        <Button
          {...commonButtonProps}
          onClick={handleNext}
          {...(buttonVariant === "icon"
            ? { "aria-label": "Próximo" }
            : { fontWeight: 500 })}
        >
          {buttonVariant === "icon" ? (
            <Icon as={RiArrowRightLine} />
          ) : (
            "Próximo"
          )}
        </Button>
      ) : (
        <Button {...commonButtonProps} onClick={handleSubmit} fontWeight={500}>
          Enviar
        </Button>
      )}
    </HStack>
  );
}
