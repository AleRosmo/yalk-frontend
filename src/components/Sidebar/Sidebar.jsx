import { Button, Flex, Heading, Spacer, VStack } from '@chakra-ui/react';
import { isValidMotionProp, motion } from 'framer-motion';
import ProfileRow from '../ProfileRow/ProfileRow';
export const Sidebar = () => {
  return (
    <Flex
      flexDirection="column"
      align="center"
      minH="full"
      border="2px solid red"
      w={'full'}
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
      <Button
        as={motion.button}
        variant="solid"
        colorScheme="teal"
        // drag="x"
        // dragConstraints={{ left: -100, right: 100 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition="0.25s linear"
      >
        Test Framer
      </Button>
      <Spacer border="2px solid green" />
      <ProfileRow />
    </Flex>
  );
};

export default Sidebar;
