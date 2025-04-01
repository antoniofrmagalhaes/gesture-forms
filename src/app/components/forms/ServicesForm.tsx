import { Center } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormResetField,
} from "react-hook-form";

import { RenderQuestion } from "@/app/components/forms/RenderQuestion";
import SummaryViewer from "@/app/components/forms/SummaryViewer";
import { Question, FormValues } from "@/app/contexts/QuestionsContext";

type ServicesFormProps = {
  data: {
    questionary: {
      question: string;
      answer: string;
    }[];
  };
  questionIndex: number;
  handleNext: () => Promise<void>;
  handleBack: () => void;
  questions: Question[];
  jumpToQuestion: (index: number) => void;
  handleChoiceSelection: (selectedChoice: string) => void;
  register: UseFormRegister<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  resetField: UseFormResetField<FormValues>;
};

export default function ServicesForm({
  data,
  questionIndex,
  questions,
  handleBack,
  handleNext,
  jumpToQuestion,
  handleChoiceSelection,
  register,
  setValue,
  resetField,
}: ServicesFormProps) {
  return (
    <Center
      width="100%"
      height="calc(100vh - 160px)"
      px={12}
      overflowY="auto"
      overflowX="hidden"
    >
      {questionIndex < questions.length ? (
        <AnimatePresence mode="wait">
          <RenderQuestion
            questionIndex={questionIndex}
            question={questions[questionIndex]}
            register={register}
            handleChoiceSelection={handleChoiceSelection}
            handleNext={handleNext}
            handleBack={handleBack}
            data={data}
            setValue={setValue}
            resetField={resetField}
          />
        </AnimatePresence>
      ) : (
        <SummaryViewer
          data={data}
          layoutType={6}
          onQuestionClick={jumpToQuestion}
        />
      )}
    </Center>
  );
}
