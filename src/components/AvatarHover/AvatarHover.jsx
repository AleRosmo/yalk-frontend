import { Avatar, Box } from '@chakra-ui/react';

const AvatarHover = () => {
  return (
    <Box border="2px solid white">
      <Avatar
        opacity={'1'}
        _hover={{
          transitionDuration: '100ms',
          opacity: 0.5,
          cursor: 'pointer',
        }}
      ></Avatar>
    </Box>
  );
};

export default AvatarHover;
