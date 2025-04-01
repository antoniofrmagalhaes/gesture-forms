"use client";

import LoadingView from "@/app/components/forms/LoadingView";
import FormView from "@/app/components/forms/FormView";
import OnSuccessView from "@/app/components/forms/OnSuccessView";
import { useQuestions } from "@/app/contexts/QuestionsContext";

export default function HomePage() {
  const { state } = useQuestions();
  const { isLoading, viewIndex } = state;

  if (isLoading) {
    return <LoadingView />;
  }

  if (viewIndex === 0) {
    return <FormView />;
  }

  return (
    <OnSuccessView
      successMessage="Obrigado por enviar suas informações!"
      followUpMessage="Um de nossos consultores entrará em contato com você em breve."
      servicesLink="#"
      directRequestLink="#"
      supportEmail="support@techincept.com"
      countdownTime={10}
    />
  );
}
