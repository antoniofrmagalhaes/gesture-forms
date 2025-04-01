import { Box } from "@chakra-ui/react";
import { InputQuestion } from "@/app/components/forms/InputQuestion";
import { ChoiceQuestion } from "@/app/components/forms/ChoiceQuestion";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormResetField,
} from "react-hook-form";
import { Question, FormValues } from "@/app/contexts/QuestionsContext";

type RenderQuestionProps = {
  question: Question;
  register: UseFormRegister<FormValues>;
  handleChoiceSelection: (choice: string) => void;
  handleNext: () => Promise<void>;
  handleBack: () => void;
  questionIndex: number;
  data: { questionary: { question: string; answer: string }[] };
  setValue: UseFormSetValue<FormValues>;
  resetField: UseFormResetField<FormValues>;
};

export function RenderQuestion({
  question,
  register,
  handleChoiceSelection,
  handleNext,
  handleBack,
  questionIndex,
  data,
  setValue,
  resetField,
}: RenderQuestionProps) {
  return (
    <Box maxWidth={1000}>
      {question.inputType === "input" ? (
        <InputQuestion
          question={question}
          register={register}
          handleNext={handleNext}
          handleBack={handleBack}
          questionIndex={questionIndex}
          data={data}
          setValue={setValue}
          resetField={resetField}
        />
      ) : question.inputType === "choice" && question.choices ? (
        <ChoiceQuestion
          question={question}
          handleChoiceSelection={handleChoiceSelection}
          handleNext={handleNext}
          handleBack={handleBack}
          questionIndex={questionIndex}
        />
      ) : null}
    </Box>
  );
}
