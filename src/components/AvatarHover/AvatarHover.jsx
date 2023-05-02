import { Avatar, Box } from '@chakra-ui/react';

const AvatarHover = ({src}) => {
  return (
    <Avatar
      src={src}
      _hover={{
        transitionDuration: '100ms',
        opacity: 0.5,
        cursor: 'pointer'
      }}
    />
  );
};

export default AvatarHover;
