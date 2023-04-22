import { AtSignIcon, ChatIcon, PlusSquareIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  HStack,
  Heading,
  IconButton,
  Spacer,
  VStack,
} from '@chakra-ui/react';
import { isValidMotionProp, motion } from 'framer-motion';

import ProfileRow from '../ProfileRow/ProfileRow';
export const Sidebar = () => {
  return (
    <Flex
      flexDirection="column"
      align="center"
      minH="full"
      w={'full'}
      gap={'10px'}
      flexGrow={100}
    >
      <Heading as={'h1'} color="teal">
        Sidebar
      </Heading>
      <VStack>
        <Button variant="ghost" colorScheme="teal" w={'full'}>
          Test2
        </Button>
        <Button variant="ghost" colorScheme="teal" w={'full'}>
          Test2
        </Button>
      </VStack>

      {/* Channels */}
      <HStack w={'full'}>
        <Heading as={'h2'} size={'md'} color="teal" align={'right'}>
          <ChatIcon /> Channels
        </Heading>
        <IconButton
          variant={'ghost'}
          colorScheme={'teal'}
          icon={<PlusSquareIcon color={'teal'} />}
        />
      </HStack>

      {/* Dms */}
      <HStack w={'full'}>
        <Heading as={'h2'} size={'md'} color="teal" align={'right'}>
          <AtSignIcon /> Direct Messages
          <IconButton
            variant={'ghost'}
            colorScheme={'teal'}
            icon={<PlusSquareIcon color={'teal'} />}
          />
        </Heading>

        <Heading
          as={'h2'}
          size={'md'}
          color="teal"
          align={'right'}
          w={'full'}
        ></Heading>
      </HStack>

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
      <Spacer />
      <ProfileRow />
    </Flex>
  );
};

export default Sidebar;
