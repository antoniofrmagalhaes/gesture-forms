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
import questionsData from "./questions.json";

type Choice = {
  key: number;
  choice: string;
};

export type ServiceType = string;

interface RawQuestion {
  question: string;
  placeholder?: string;
  inputType: string;
  choices?: { key: number; choice: string }[];
  decisionPoint?: boolean;
  branches?: Record<string, RawQuestion[]>;
}

export type Question = {
  question: string;
  placeholder?: string;
  inputType: "choice" | "input";
  choices?: Choice[];
  decisionPoint?: boolean;
  branches?: Record<string, Question[]>;
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
  initialQuestions: Question[];
  middleQuestions: Question[];
  finalQuestions: Question[];
  questions: Question[];
  isNavigating: boolean;
};

type Action =
  | {
      type: "LOAD_QUESTIONS";
      payload: {
        initialQuestions: Question[];
        middleQuestions: Question[];
        finalQuestions: Question[];
      };
    }
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

const validateQuestions = (questions: RawQuestion[]): Question[] => {
  return questions.map((q) => {
    if (!["input", "choice"].includes(q.inputType)) {
      throw new Error(`Invalid inputType: ${q.inputType}`);
    }
    const validatedQuestion: Question = {
      question: q.question,
      placeholder: q.placeholder,
      inputType: q.inputType as "input" | "choice",
      choices: q.choices,
      decisionPoint: q.decisionPoint,
      branches: q.branches
        ? Object.fromEntries(
            Object.entries(q.branches).map(([key, branch]) => [
              key,
              validateQuestions(branch),
            ])
          )
        : undefined,
    };
    return validatedQuestion;
  });
};

const initialState: State = {
  isLoading: true,
  viewIndex: 0,
  questionIndex: 0,
  selectedService: null,
  data: { questionary: [] },
  initialQuestions: [],
  middleQuestions: [],
  finalQuestions: [],
  questions: [],
  isNavigating: false,
};

const questionsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOAD_QUESTIONS": {
      const { initialQuestions, middleQuestions, finalQuestions } =
        action.payload;
      const questions = [
        ...initialQuestions,
        ...middleQuestions,
        ...finalQuestions,
      ];
      return {
        ...state,
        initialQuestions,
        middleQuestions,
        finalQuestions,
        questions,
      };
    }

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

      const newState = { ...state, data: { questionary: updatedQuestionary } };

      const currentQuestion = state.questions[state.questionIndex];
      if (currentQuestion.decisionPoint && currentQuestion.branches) {
        const branchQuestions = currentQuestion.branches[selectedChoice] || [];
        const questionsBefore = state.questions.slice(
          0,
          state.questionIndex + 1
        );
        const questionsAfter = state.questions.slice(state.questionIndex + 1);
        const finalQuestionsStartIndex = questionsAfter.findIndex((q) =>
          state.finalQuestions.includes(q)
        );
        const questionsBeforeFinal =
          finalQuestionsStartIndex !== -1
            ? questionsAfter.slice(0, finalQuestionsStartIndex)
            : [];
        const finalQuestions =
          finalQuestionsStartIndex !== -1
            ? questionsAfter.slice(finalQuestionsStartIndex)
            : state.finalQuestions;

        const newQuestions = [
          ...questionsBefore,
          ...branchQuestions,
          ...questionsBeforeFinal,
          ...finalQuestions,
        ];

        return {
          ...newState,
          selectedService: selectedChoice,
          questions: newQuestions,
          questionIndex: state.questionIndex + 1,
          isNavigating: false,
        };
      }

      const allAnswered = newState.questions.every((question, idx) => {
        return (
          idx <= state.questionIndex &&
          updatedQuestionary[idx] &&
          updatedQuestionary[idx].answer
        );
      });

      const newQuestionIndex =
        allAnswered && state.questionIndex === newState.questions.length - 1
          ? newState.questions.length
          : state.questionIndex < newState.questions.length - 1
          ? state.questionIndex + 1
          : newState.questions.length;

      return {
        ...newState,
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

      const newState = { ...state, data: { questionary: updatedQuestionary } };

      const allAnswered = newState.questions.every((question, idx) => {
        return (
          idx <= state.questionIndex &&
          updatedQuestionary[idx] &&
          updatedQuestionary[idx].answer
        );
      });

      const newQuestionIndex =
        allAnswered && state.questionIndex === newState.questions.length - 1
          ? newState.questions.length
          : state.questionIndex < newState.questions.length - 1
          ? state.questionIndex + 1
          : newState.questions.length;

      return {
        ...newState,
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
        ...state,
        questionIndex: 0,
        selectedService: null,
        data: { questionary: [] },
        questions: [
          ...state.initialQuestions,
          ...state.middleQuestions,
          ...state.finalQuestions,
        ],
        viewIndex: 0,
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
    const loadQuestions = async () => {
      try {
        const { InitialQuestions, MiddleQuestions, FinalQuestions } =
          questionsData;
        dispatch({
          type: "LOAD_QUESTIONS",
          payload: {
            initialQuestions: validateQuestions(InitialQuestions),
            middleQuestions: validateQuestions(MiddleQuestions),
            finalQuestions: validateQuestions(FinalQuestions),
          },
        });
      } catch (error) {
        console.error("Erro ao carregar perguntas:", error);
      }
    };

    loadQuestions();
  }, []);

  useEffect(() => {
    if (
      state.questionIndex > 0 &&
      state.questions[state.questionIndex]?.inputType === "input"
    ) {
      setFocus("answer");
    }
  }, [state.questionIndex, state.questions, setFocus]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: "SET_LOADING", payload: { isLoading: false } });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
