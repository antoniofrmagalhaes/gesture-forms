"use client";

import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import {
  useForm,
  UseFormRegister,
  UseFormSetValue,
  UseFormResetField,
  UseFormHandleSubmit,
} from "react-hook-form";

type Choice = {
  key: number;
  choice: string;
};

export type ServiceType = "Software House" | "Integracoes de Sistemas";

export type Question = {
  question: string;
  placeholder?: string;
  inputType: "choice" | "input";
  choices?: Choice[];
};

export type FormValues = {
  answer: string;
};

interface IQuestionsContextProps {
  isLoading: boolean;
  viewIndex: number;
  onSubmit: () => void;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  handleResetForm: () => void;
  data: { questionary: { question: string; answer: string }[] };
  questions: Question[];
  register: UseFormRegister<FormValues>;
  handleChoiceSelection: (selectedChoice: string) => void;
  jumpToQuestion: (index: number) => void;
  questionIndex: number;
  handleBack: () => void;
  handleNext: () => Promise<void>;
  handleViewChange: (index: number) => void;
  setValue: UseFormSetValue<FormValues>;
  resetField: UseFormResetField<FormValues>;
}

interface IQuestionsProvider {
  children: ReactNode;
}

export const QuestionsContext = createContext<IQuestionsContextProps>(
  {} as IQuestionsContextProps
);

const QuestionsProvider: FC<IQuestionsProvider> = ({ children }) => {
  const ctx = useProvideQuestions();
  return (
    <QuestionsContext.Provider value={ctx}>
      {children}
    </QuestionsContext.Provider>
  );
};

export const useQuestions = (): IQuestionsContextProps => {
  return useContext(QuestionsContext);
};

export function useProvideQuestions(): IQuestionsContextProps {
  const [viewIndex, setViewIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedService, setSelectedService] = useState<ServiceType | null>(
    null
  );
  const [data, setData] = useState<{
    questionary: { question: string; answer: string }[];
  }>({ questionary: [] });
  const [userName, setUserName] = useState("Usuário");

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setValue,
    resetField,
    setFocus,
  } = useForm<FormValues>({
    defaultValues: {
      answer: "",
    },
  });

  const initialQuestions: Question[] = [
    {
      question: "Como devemos chamá-lo?",
      placeholder: "Digite seu nome",
      inputType: "input",
    },
    {
      question: `Olá ${
        userName || "Usuário"
      }, Qual tipo de serviço você gostaria de contratar?`,
      inputType: "choice",
      choices: [
        { key: 1, choice: "Software House" },
        { key: 2, choice: "Integracoes de Sistemas" },
      ],
    },
  ];

  const serviceQuestions: Record<ServiceType, Question[]> = {
    "Software House": [
      {
        question: "Descreva o objetivo ou a ideia do software que você deseja.",
        placeholder:
          "Ex.: Um sistema de gerenciamento de pedidos para restaurantes.",
        inputType: "input",
      },
      {
        question:
          "Quais são as principais funcionalidades que você precisa no software?",
        placeholder:
          "Ex.: Controle de usuários, relatórios, integração com APIs.",
        inputType: "input",
      },
      {
        question:
          "Você já tem os detalhes do que o software precisa fazer ou gostaria de nossa ajuda para definir isso?",
        placeholder: "Ex.: Já tenho uma especificação detalhada.",
        inputType: "input",
      },
      {
        question:
          "Quando você gostaria de ver a primeira versão do seu software pronta?",
        inputType: "choice",
        choices: [
          { key: 1, choice: "Imediatamente" },
          { key: 2, choice: "1 mês" },
          { key: 3, choice: "2 meses" },
          { key: 4, choice: "6 meses" },
          { key: 5, choice: "Sem data definida" },
        ],
      },
      {
        question:
          "Qual seria o orçamento ideal para você investir nesse software?",
        inputType: "choice",
        choices: [
          { key: 1, choice: "Até R$ 5.000" },
          { key: 2, choice: "R$ 5.000 - R$ 25.000" },
          { key: 3, choice: "R$ 25.000 - R$ 100.000" },
          { key: 4, choice: "R$ 100.000 - R$ 500.000" },
          { key: 5, choice: "Acima de R$ 500.000" },
        ],
      },
    ],
    "Integracoes de Sistemas": [
      {
        question: "Quais sistemas você deseja integrar?",
        placeholder: "Ex.: Sistema de gestão com plataforma de e-commerce.",
        inputType: "input",
      },
      {
        question:
          "Existem especificações ou APIs disponíveis para os sistemas que você quer integrar?",
        placeholder: "Ex.: Sim, tenho documentação das APIs.",
        inputType: "input",
      },
      {
        question: "Que tipo de comunicação você precisa entre os sistemas?",
        placeholder: "Ex.: Envio de pedidos, sincronização de dados, etc.",
        inputType: "input",
      },
      {
        question:
          "Qual é o nível de automação desejado para essas integrações?",
        inputType: "choice",
        choices: [
          { key: 1, choice: "Totalmente automatizado" },
          { key: 2, choice: "Semi-automatizado" },
          { key: 3, choice: "Manual com alguns gatilhos" },
        ],
      },
      {
        question:
          "Qual seria o orçamento ideal para você investir nessas integrações?",
        inputType: "choice",
        choices: [
          { key: 1, choice: "Até R$ 5.000" },
          { key: 2, choice: "R$ 5.000 - R$ 25.000" },
          { key: 3, choice: "R$ 25.000 - R$ 100.000" },
          { key: 4, choice: "R$ 100.000 - R$ 500.000" },
          { key: 5, choice: "Acima de R$ 500.000" },
        ],
      },
    ],
  };

  const questions = [
    ...initialQuestions,
    ...(selectedService ? serviceQuestions[selectedService] : []),
  ];

  const onSubmit = () => {
    handleViewChange(1);
  };

  const handleChoiceSelection = (selectedChoice: string) => {
    if (questionIndex === 1) {
      setSelectedService(selectedChoice as ServiceType);

      setData((prevData) => {
        const updatedQuestionary = [...prevData.questionary];
        if (updatedQuestionary[questionIndex]) {
          updatedQuestionary[questionIndex] = {
            question: questions[questionIndex]?.question,
            answer: selectedChoice,
          };
        } else {
          updatedQuestionary.push({
            question: questions[questionIndex]?.question,
            answer: selectedChoice,
          });
        }
        const newQuestionary = updatedQuestionary.slice(0, 2);
        setQuestionIndex(2);
        resetField("answer");
        return { questionary: newQuestionary };
      });

      return;
    }

    setData((prevData) => {
      const updatedQuestionary = [...prevData.questionary];
      if (updatedQuestionary[questionIndex]) {
        updatedQuestionary[questionIndex] = {
          question: questions[questionIndex]?.question,
          answer: selectedChoice,
        };
      } else {
        updatedQuestionary.push({
          question: questions[questionIndex]?.question,
          answer: selectedChoice,
        });
      }

      const allAnswered = questions.every((question, idx) => {
        return updatedQuestionary[idx] && updatedQuestionary[idx].answer;
      });

      if (allAnswered) {
        setQuestionIndex(questions.length);
      } else {
        if (questionIndex < questions.length - 1) {
          setQuestionIndex((prev) => prev + 1);
          resetField("answer");
        } else {
          setQuestionIndex(questions.length);
        }
      }

      return { questionary: updatedQuestionary };
    });
  };

  const handleNext = async () => {
    const isValid = await trigger("answer");

    if (isValid) {
      const answerValue = watch("answer");
      console.log(
        `[handleNext] Question Index: ${questionIndex}, Answer Value: ${answerValue}`
      ); // Log para depurar o valor de watch("answer")

      if (questionIndex === 0) {
        setUserName(answerValue);
      }

      setData((prevData) => {
        const updatedQuestionary = [...prevData.questionary];
        if (updatedQuestionary[questionIndex]) {
          updatedQuestionary[questionIndex] = {
            question: questions[questionIndex]?.question,
            answer: answerValue,
          };
        } else {
          updatedQuestionary.push({
            question: questions[questionIndex]?.question,
            answer: answerValue,
          });
        }
        console.log(`[handleNext] Updated Questionary:`, updatedQuestionary); // Log para depurar o estado do questionary
        return { questionary: updatedQuestionary };
      });

      const allAnswered = questions.every((question, idx) => {
        return data.questionary[idx] && data.questionary[idx].answer;
      });

      if (allAnswered) {
        setQuestionIndex(questions.length);
      } else {
        if (questionIndex < questions.length - 1) {
          setQuestionIndex((prev) => prev + 1);
          resetField("answer");
        } else {
          setQuestionIndex(questions.length);
        }
      }
    } else {
      console.log(
        `[handleNext] Validation failed for question index: ${questionIndex}`
      ); // Log para depurar falhas de validação
    }
  };

  const handleBack = () => {
    if (questionIndex > 0) {
      setQuestionIndex((prev) => prev - 1);
    }
  };

  const jumpToQuestion = (index: number) => {
    setQuestionIndex(index);
  };

  const handleResetForm = () => {
    setQuestionIndex(0);
    setData({ questionary: [] });
    setSelectedService(null);
    setUserName("Usuário");
    resetField("answer");
  };

  const handleViewChange = (index: number) => {
    setViewIndex(index);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (questions[questionIndex]?.inputType === "input") {
      setFocus("answer");
    }
  }, [questionIndex, setFocus, questions]);

  return {
    isLoading,
    viewIndex,
    onSubmit,
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
    setValue,
    resetField,
  };
}

export default QuestionsProvider;
