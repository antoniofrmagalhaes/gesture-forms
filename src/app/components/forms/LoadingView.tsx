import { Box } from '@chakra-ui/react';
import WaveLoading from './WaveLoading';

export default function LoadingView() {
  return (
    <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
      <WaveLoading />
    </Box>
  );
}
