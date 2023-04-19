// This component must
import { Box, Flex, IconButton, Image, Text } from '@chakra-ui/react';
import { BiLogOut } from 'react-icons/bi';
import Avatar from '../Avatar/Avatar';
function ProfileRow() {
  return (
    <Flex p="10px" border="2px solid orange" justify={"space-evenly"}>
      <Avatar />
      <Text color="white" border="2px solid purple">
        Asd
      </Text>
      <IconButton
        border={'2px solid green'}
        variant="ghost"
        colorScheme="teal"
        icon={<BiLogOut size="20" />}
      />
    </Flex>
  );
}

export default ProfileRow;
