import { Avatar, Box } from '@chakra-ui/react';

const AvatarHover = () => {
  return (
    <Avatar
      opacity={'1'}
      _hover={{
        transitionDuration: '100ms',
        opacity: 0.5,
        cursor: 'pointer',
      }}
    ></Avatar>
  );
};

export default AvatarHover;
