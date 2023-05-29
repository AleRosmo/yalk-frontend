import { Avatar, Box, Image } from '@chakra-ui/react';

const AvatarHover = ({ src }) => {
  return (
    <Avatar
      src={src}
      _hover={{
        transitionDuration: '100ms',
        opacity: 0.5,
        cursor: 'pointer',
      }}
    >
      <Image
        right="0px"
        top="35px"
        maxW={'15px'}
        borderRadius={'full'}
        position="absolute"
        src="/online.png"
      ></Image>
    </Avatar>
  );
};

export default AvatarHover;
