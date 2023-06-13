import { Avatar, Box, Image } from '@chakra-ui/react';

const AvatarHover = ({ profile }) => {
  return (
    <Avatar
      src={profile.avatarUrl}
      _hover={{
        transitionDuration: '100ms',
        opacity: 0.5,
        cursor: 'pointer',
      }}
    >
    {/* // TODO: Change to AvatarBadge in ChakraUI it's literally made for that  */}
      <Image
        right="0px"
        top="35px"
        maxW={'15px'}
        borderRadius={'full'}
        position="absolute"
        src={`/${profile.statusName}.png`}
      />
    </Avatar>
  );
};

export default AvatarHover;
