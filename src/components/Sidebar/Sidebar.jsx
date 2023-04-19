import {
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import ProfileRow from '../ProfileRow/ProfileRow';
export const Sidebar = () => {
  return (
    <Flex
      flexDirection="column"
      align="center"
      minH="full"
      border="2px solid red"
    >
      <Heading color="teal">Sidebar</Heading>
      <VStack align="right" w={'full'}>
        <Button mt={'10px'} variant="ghost" colorScheme="teal">
          Test1
        </Button>
        <Button variant="ghost" colorScheme="teal">
          Test2
        </Button>
      </VStack>
      <Spacer border="2px solid green" />
      <ProfileRow />
    </Flex>
  );
};

export default Sidebar;