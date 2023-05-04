import { Accordion, Button, Spacer, VStack } from '@chakra-ui/react';
import { useToggle } from '../../hooks/useToggle';
import ChatList from '../ChatList';
import ProfileRow from '../ProfileRow/ProfileRow';

import React from 'react';
import { SidebarContainer } from './SidebarContainer';
import { SidebarToggleButton } from './SidebarToggleButton';

export default function Sidebar({ profile, chats }) {
  const [isSmall, toggleOpen] = useToggle();

  return (
    <SidebarContainer isSmall={isSmall}>
      <SidebarToggleButton toggleOpen={toggleOpen} />
      <Accordion allowMultiple color="teal" w={'full'}>
        <ChatList
          type="channels"
          chats={chats.filter(chat => chat.type.includes('channel'))}
        />
        <ChatList
          type="directs"
          chats={chats.filter(chat => chat.type.includes('direct'))}
        />
      </Accordion>
      <Spacer />
      <ProfileRow />
    </SidebarContainer>
  );
}

{
  /* <VStack>
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
      </VStack> 
      */
}
