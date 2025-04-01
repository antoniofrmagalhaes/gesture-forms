"use client";

import { HStack, IconButton, Button } from '@chakra-ui/react';
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';
import { useQuestions } from '@/app/contexts/QuestionsContext'; // Ajuste o caminho

export default function FormNavigator() {
  const { questionIndex, questions, handleBack, handleNext, handleSubmit, onSubmit } = useQuestions();

  return (
    <>
      {/* Navegação para telas menores */}
      <HStack spacing={4} display={{ base: 'flex', md: 'none' }}>
        {questionIndex > 0 && (
          <IconButton
            size="sm"
            onClick={handleBack}
            icon={<RiArrowLeftLine />}
            aria-label="Voltar"
            color="white"
            fontWeight={500}
            backgroundColor="gray.800"
            _hover={{
              backgroundColor: 'gray.800',
            }}
            _active={{
              backgroundColor: 'gray.800',
              boxShadow: 'none',
            }}
          />
        )}
        {questionIndex < questions.length && (
          <IconButton
            size="sm"
            onClick={handleNext}
            icon={<RiArrowRightLine />}
            aria-label="Próximo"
            color="white"
            fontWeight={500}
            backgroundColor="gray.800"
            _hover={{
              backgroundColor: 'gray.800',
            }}
            _active={{
              backgroundColor: 'gray.800',
              boxShadow: 'none',
            }}
          />
        )}
        {questionIndex === questions.length && (
          <Button
            size="sm"
            onClick={handleSubmit(onSubmit)}
            color="white"
            backgroundColor="gray.800"
            fontWeight={500}
            boxShadow="md"
            _hover={{
              backgroundColor: 'gray.800',
            }}
            _active={{
              backgroundColor: 'gray.800',
              boxShadow: 'none',
            }}
          >
            ENVIAR
          </Button>
        )}
      </HStack>

      {/* Navegação para telas maiores */}
      <HStack display={{ base: 'none', md: 'flex' }} spacing={4}>
        {questionIndex > 0 && (
          <Button onClick={handleBack} variant="link" leftIcon={<RiArrowLeftLine />} color="white" fontWeight={500}>
            Voltar
          </Button>
        )}
        {questionIndex < questions.length && (
          <Button onClick={handleNext} variant="link" rightIcon={<RiArrowRightLine />} color="white" fontWeight={500}>
            Próximo
          </Button>
        )}
        {questionIndex === questions.length && (
          <Button type="submit" variant="link" color="white" fontWeight={500}>
            pressione<strong> Enter </strong> ↵ para enviar
          </Button>
        )}
      </HStack>
    </>
  );
}