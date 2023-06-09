// This component must
import { Box, Flex, IconButton, Image, Text } from '@chakra-ui/react';
import { BiLogOut } from 'react-icons/bi';
import AvatarHover from '../AvatarHover/AvatarHover';
function ProfileRow() {
  return (
    <Flex
      w={'full'}
      p="10px"
      align={'flex-start'}
      justify={'space-between'}
      bg={'gray.700'}
      rounded={'15px'}
    >
      <AvatarHover />
      <Text color="white">Asd</Text>
      <IconButton variant="ghost" icon={<BiLogOut size="20" />} />
    </Flex>
  );
}

export default ProfileRow;
