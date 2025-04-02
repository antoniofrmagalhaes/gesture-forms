import {
  Box,
  Button,
  Flex,
  Text,
  Icon,
  useBreakpointValue,
} from "@chakra-ui/react";
import { MdRestartAlt } from "react-icons/md";
import ProgressBar from "@/app/components/forms/ProgressBar";
import FormNavigator from "@/app/components/forms/FormNavigator";
import ServicesForm from "@/app/components/forms/ServicesForm";
import { useQuestions } from "@/app/contexts/QuestionsContext";

export default function FormView() {
  const { state, dispatch, handleSubmit } = useQuestions();
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

  const onSubmit = () => {
    dispatch({ type: "SET_VIEW", payload: { index: 1 } });
  };

  const handleResetForm = () => {
    dispatch({ type: "RESET_FORM" });
  };

  const commonButtonProps = {
    size: { base: "xs", sm: "sm" },
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
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      width="100%"
      height="100vh"
      color="white"
      bg="#076B85"
      tabIndex={0}
    >
      <Flex
        width="100%"
        height="80px"
        px={6}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box position="relative">
          <Text fontSize={{ base: 24, sm: 32 }} fontWeight={500}>
            GESTURE
          </Text>
          <Text position="absolute" right={0} bottom="-14px" fontWeight={500}>
            Forms
          </Text>
        </Box>
        <Box display={{ base: "none" }} px={6}>
          <ProgressBar
            indicatorPosition="bottom-right"
            currentStep={questionIndex + 1}
            totalSteps={questions.length + 1}
          />
        </Box>
        <Button
          {...commonButtonProps}
          onClick={handleResetForm}
          fontWeight={buttonVariant === "text" ? 500 : undefined}
          {...(buttonVariant === "icon"
            ? { "aria-label": "Reiniciar Formulário" }
            : {})}
        >
          {buttonVariant === "icon" ? (
            <Icon as={MdRestartAlt} fontSize={18} />
          ) : (
            <>
              Reiniciar Formulário
              <Icon as={MdRestartAlt} ml={2} />
            </>
          )}
        </Button>
      </Flex>

      <ServicesForm />

      <Flex
        width="100%"
        height="80px"
        px={6}
        alignItems="center"
        justifyContent="space-between"
      >
        <ProgressBar
          width={{ base: "150px", sm: "200px" }}
          indicatorPosition="top-left"
          currentStep={questionIndex + 1}
          totalSteps={questions.length + 1}
        />
        <FormNavigator />
      </Flex>
    </Box>
  );
}
