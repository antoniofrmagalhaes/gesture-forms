import { Box, HStack, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
  indicatorPosition: 'top-left' | 'top' | 'top-right' | 'bottom-left' | 'bottom' | 'bottom-right';
  width?:
    | string
    | number
    | { base: string | number; sm?: string | number; md?: string | number; lg?: string | number; xl?: string | number }; // Define a largura da barra, pode ser string, número ou objeto de breakpoints
};

export default function ProgressBar({
  currentStep,
  totalSteps,
  indicatorPosition,
  width = { base: '200px' }, // Valor padrão para a largura como breakpoint
}: ProgressBarProps) {
  // Move o cálculo do progressPercentage para o componente ProgressBar
  const progressPercentage = (currentStep / totalSteps) * 100;

  const bgColor = progressPercentage === 100 ? 'green.400' : 'blue.500'; // Verde se 100%, azul caso contrário

  // Define o posicionamento do indicador
  const positionStyles = {
    'top-left': { top: '-24px', left: '0' },
    top: { top: '-24px', left: '50%', transform: 'translateX(-50%)' },
    'top-right': { top: '-24px', right: '0' },
    'bottom-left': { bottom: '-24px', left: '0' },
    bottom: { bottom: '-24px', left: '50%', transform: 'translateX(-50%)' },
    'bottom-right': { bottom: '-24px', right: '0' },
  };

  // Exibe o componente apenas a partir da terceira pergunta
  if (currentStep < 3) {
    return <div />;
  }

  return (
    <MotionBox
      width={width}
      height="8px"
      bg="gray.700"
      borderRadius="md"
      position="relative"
      initial={{ opacity: 0 }} // Estado inicial da animação
      animate={{ opacity: 1 }} // Estado final da animação
      transition={{ duration: 0.5 }} // Duração da animação
    >
      <Box
        height="100%"
        width={`${progressPercentage}%`}
        bg={bgColor} // Cor dinâmica
        borderRadius="md"
        transition="width 0.3s ease"
      />

      {/* Indicador de progresso */}
      <HStack
        spacing={2}
        justifyContent="space-between"
        position="absolute"
        fontSize={{ base: 14, sm: 16 }}
        {...positionStyles[indicatorPosition]} // Aplica o estilo de posicionamento
      >
        <Text as="small">{currentStep}</Text>
        <Text as="small">de</Text>
        <Text as="small">{totalSteps}</Text>
      </HStack>
    </MotionBox>
  );
}
