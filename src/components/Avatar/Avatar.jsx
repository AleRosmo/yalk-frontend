import { Box, Image } from '@chakra-ui/react';

const Avatar = () => {
  return (
    <Box border="2px solid white">
      <Image
        boxSize={'48px'}
        borderRadius={'full'}
        opacity={'1'}
        _hover={{
          transitionDuration: '100ms',
          opacity: 0.5,
          cursor: 'pointer',
        }}
      ></Image>
    </Box>
  );
};

export default Avatar;
