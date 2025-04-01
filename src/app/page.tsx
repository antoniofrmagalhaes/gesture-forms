"use client";

import LoadingView from "@/app/components/forms/LoadingView";
import FormView from "@/app/components/forms/FormView";
import OnSuccessView from "@/app/components/forms/OnSuccessView";
import { useQuestions } from "@/app/contexts/QuestionsContext";

export default function HomePage() {
  const {
    viewIndex,
    isLoading,
    onSubmit,
    resetField,
    setValue,
    handleSubmit,
    handleResetForm,
    data,
    questions,
    register,
    handleChoiceSelection,
    jumpToQuestion,
    questionIndex,
    handleBack,
    handleNext,
    handleViewChange,
  } = useQuestions();

  if (isLoading) {
    return <LoadingView />;
  }

  if (viewIndex === 0) {
    return (
      <FormView
        onSubmit={onSubmit}
        resetField={resetField}
        setValue={setValue}
        handleSubmit={handleSubmit}
        handleResetForm={handleResetForm}
        data={data}
        questions={questions}
        register={register}
        handleChoiceSelection={handleChoiceSelection}
        jumpToQuestion={jumpToQuestion}
        questionIndex={questionIndex}
        handleBack={handleBack}
        handleNext={handleNext}
      />
    );
  }

  return (
    <OnSuccessView
      successMessage="Obrigado por enviar suas informações!"
      followUpMessage="Um de nossos consultores entrará em contato com você em breve."
      servicesLink="#"
      directRequestLink="#"
      supportEmail="support@techincept.com"
      countdownTime={10}
      onRedirect={() => handleViewChange(0)}
    />
  );
}
