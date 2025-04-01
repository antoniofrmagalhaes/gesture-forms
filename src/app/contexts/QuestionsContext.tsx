"use client";

import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useReducer,
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

type State = {
  isLoading: boolean;
  viewIndex: number;
  questionIndex: number;
  selectedService: ServiceType | null;
  data: { questionary: { question: string; answer: string }[] };
  userName: string;
  questions: Question[];
  isNavigating: boolean;
};

type Action =
  | { type: "SELECT_CHOICE"; payload: { selectedChoice: string } }
  | { type: "SUBMIT_ANSWER"; payload: { answer: string } }
  | { type: "GO_BACK" }
  | { type: "JUMP_TO_QUESTION"; payload: { index: number } }
  | { type: "RESET_FORM" }
  | { type: "SET_VIEW"; payload: { index: number } }
  | { type: "SET_LOADING"; payload: { isLoading: boolean } };

interface IQuestionsContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
  register: UseFormRegister<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  resetField: UseFormResetField<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
}

interface IQuestionsProvider {
  children: ReactNode;
}

export const QuestionsContext = createContext<IQuestionsContextProps>(
  {} as IQuestionsContextProps
);

const initialState: State = {
  isLoading: true,
  viewIndex: 0,
  questionIndex: 0,
  selectedService: null,
  data: { questionary: [] },
  userName: "Usuário",
  questions: [
    {
      question: "Como devemos chamá-lo?",
      placeholder: "Digite seu nome",
      inputType: "input",
    },
    {
      question: "Olá Usuário, Qual tipo de serviço você gostaria de contratar?",
      inputType: "choice",
      choices: [
        { key: 1, choice: "Software House" },
        { key: 2, choice: "Integracoes de Sistemas" },
      ],
    },
  ],
  isNavigating: false,
};

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
      question: "Qual é o nível de automação desejado para essas integrações?",
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

const questionsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SELECT_CHOICE": {
      const { selectedChoice } = action.payload;
      const updatedQuestionary = [...state.data.questionary];
      if (updatedQuestionary[state.questionIndex]) {
        updatedQuestionary[state.questionIndex] = {
          question: state.questions[state.questionIndex]?.question,
          answer: selectedChoice,
        };
      } else {
        updatedQuestionary.push({
          question: state.questions[state.questionIndex]?.question,
          answer: selectedChoice,
        });
      }

      if (state.questionIndex === 1) {
        const newService = selectedChoice as ServiceType;
        const newQuestions = [
          ...state.questions.slice(0, 2),
          ...serviceQuestions[newService],
        ];
        return {
          ...state,
          selectedService: newService,
          data: { questionary: updatedQuestionary.slice(0, 2) },
          questions: newQuestions,
          questionIndex: 2,
          isNavigating: false,
        };
      }

      const allAnswered = state.questions.every((question, idx) => {
        return (
          idx <= state.questionIndex &&
          updatedQuestionary[idx] &&
          updatedQuestionary[idx].answer
        );
      });

      const newQuestionIndex =
        allAnswered && state.questionIndex === state.questions.length - 1
          ? state.questions.length
          : state.questionIndex < state.questions.length - 1
          ? state.questionIndex + 1
          : state.questions.length;

      return {
        ...state,
        data: { questionary: updatedQuestionary },
        questionIndex: newQuestionIndex,
        isNavigating: false,
      };
    }

    case "SUBMIT_ANSWER": {
      const { answer } = action.payload;
      const updatedQuestionary = [...state.data.questionary];
      if (updatedQuestionary[state.questionIndex]) {
        updatedQuestionary[state.questionIndex] = {
          question: state.questions[state.questionIndex]?.question,
          answer,
        };
      } else {
        updatedQuestionary.push({
          question: state.questions[state.questionIndex]?.question,
          answer,
        });
      }

      if (state.questionIndex === 0) {
        const newQuestions = state.questions.map((q, idx) =>
          idx === 1
            ? {
                ...q,
                question: `Olá ${answer}, Qual tipo de serviço você gostaria de contratar?`,
              }
            : q
        );
        return {
          ...state,
          userName: answer,
          questions: newQuestions,
          data: { questionary: updatedQuestionary },
          questionIndex: state.questionIndex + 1,
          isNavigating: false,
        };
      }

      const allAnswered = state.questions.every((question, idx) => {
        return (
          idx <= state.questionIndex &&
          updatedQuestionary[idx] &&
          updatedQuestionary[idx].answer
        );
      });

      const newQuestionIndex =
        allAnswered && state.questionIndex === state.questions.length - 1
          ? state.questions.length
          : state.questionIndex < state.questions.length - 1
          ? state.questionIndex + 1
          : state.questions.length;

      return {
        ...state,
        data: { questionary: updatedQuestionary },
        questionIndex: newQuestionIndex,
        isNavigating: false,
      };
    }

    case "GO_BACK": {
      if (state.questionIndex > 0) {
        return {
          ...state,
          questionIndex: state.questionIndex - 1,
          isNavigating: false,
        };
      }
      return state;
    }

    case "JUMP_TO_QUESTION": {
      return {
        ...state,
        questionIndex: action.payload.index,
        isNavigating: false,
      };
    }

    case "RESET_FORM": {
      return {
        ...initialState,
        questions: initialState.questions,
        isNavigating: false,
      };
    }

    case "SET_VIEW": {
      return {
        ...state,
        viewIndex: action.payload.index,
        isNavigating: false,
      };
    }

    case "SET_LOADING": {
      return {
        ...state,
        isLoading: action.payload.isLoading,
        isNavigating: false,
      };
    }

    default:
      return state;
  }
};

const QuestionsProvider: FC<IQuestionsProvider> = ({ children }) => {
  const [state, dispatch] = useReducer(questionsReducer, initialState);

  const { register, handleSubmit, setValue, resetField, setFocus } =
    useForm<FormValues>({
      defaultValues: {
        answer: "",
      },
    });

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: "SET_LOADING", payload: { isLoading: false } });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (state.questions[state.questionIndex]?.inputType === "input") {
      setFocus("answer");
    }
  }, [state.questionIndex, setFocus, state.questions]);

  return (
    <QuestionsContext.Provider
      value={{
        state,
        dispatch,
        register,
        setValue,
        resetField,
        handleSubmit,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export const useQuestions = (): IQuestionsContextProps => {
  return useContext(QuestionsContext);
};

export default QuestionsProvider;
