// This component must
import { Box, Flex, IconButton, Image, Text } from '@chakra-ui/react';
import { BiLogOut } from 'react-icons/bi';
import AvatarHover from '../AvatarHover/AvatarHover';
function ProfileRow() {
  return (
    <Flex w={'full'} p="10px" justify={'space-between'} align={'center'}>
      <AvatarHover />
      <Text color="white">Asd</Text>
      <IconButton
        variant="ghost"
        colorScheme="teal"
        icon={<BiLogOut size="20" />}
      />
    </Flex>
  );
}

export default ProfileRow;
