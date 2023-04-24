import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Accordion,
  Button,
  Flex,
  IconButton,
  Spacer,
  VStack,
} from '@chakra-ui/react';
import { isValidMotionProp, motion } from 'framer-motion';
import { useState } from 'react';
import { useToggle } from '../../hooks/useToggle';
import ProfileRow from '../ProfileRow/ProfileRow';
import { ChatList } from './ChatList';

export const Sidebar = () => {
  const [isSmall, toggleOpen] = useToggle();
  return (
    // Container
    <Flex
      as={motion.div}
      // data-isOpen={isSmall}
      layout={true}
      p={'15px'}
      pos={'sticky'}
      bg={'gray.900'}
      h={'95vh'}
      mt={'2.5vh'}
      ml={'10px'}
      borderRadius={'15px'}
      w={{ base: 'full', lg: isSmall ? '75px' : '250px' }}
    >
      <Flex
        flexDirection="column"
        align="center"
        w={'full'}
        gap={'10px'}
        flexGrow={100}
        alignItems={isSmall ? 'center' : 'flex-start'}
      >
        {/* Header */}
        {/* // TODO: LogoPlaceHolder */}
        <IconButton
          icon={<HamburgerIcon />}
          background={'none'}
          mt={5}
          onClick={toggleOpen}
        />
        <VStack>
          <Button
            as={motion.button}
            w={'full'}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition="0.25s linear"
          >
            Home
          </Button>
          <Button w={'full'}>Profile</Button>
        </VStack>

        <Accordion allowMultiple color="teal" w={'full'}>
          {/* Channels */}
          <ChatList
            type="channels"
            chats={[
              {
                id: 1,
                name: 'Testat',
              },
              { id: 2, name: 'Nucleare' },
            ]}
          />

          {/* Dms */}
          <ChatList
            type="directs"
            chats={[
              {
                id: 3,
                name: 'shurizzle',
              },
              { id: 4, name: 'zL1ghT_' },
            ]}
          />
        </Accordion>

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
        {/* Profile */}
        <ProfileRow />
      </Flex>
    </Flex>
  );
};

export default Sidebar;
