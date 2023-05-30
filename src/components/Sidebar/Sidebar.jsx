import { Accordion, Button, IconButton, Spacer } from '@chakra-ui/react';
import { useToggle } from '../../hooks/useToggle';
import ChatList from '../ChatList';
import ProfileRow from '../ProfileRow/ProfileRow';

import { ViewIcon, WarningTwoIcon } from '@chakra-ui/icons';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthService } from '../../context/AuthServiceContext';
import { useDebug } from '../../context/DebugServiceContext';
import { SidebarContainer } from './SidebarContainer';
import { SidebarToggleButton } from './SidebarToggleButton';

export default function Sidebar({ currentUser }) {
  const [isSmall, toggleOpen] = useToggle();
  const { onOpen } = useDebug();

  const { logout } = useAuthService();

  return (
    <SidebarContainer isSmall={isSmall}>
      <SidebarToggleButton toggleOpen={toggleOpen} />
      <IconButton icon={<WarningTwoIcon />} onClick={onOpen} />
      <Accordion allowMultiple color="teal" w={'full'}>
        <ChatList
          type="channels"
          chats={currentUser.chats.filter(chat => chat.chatType.type === 'channel')}
        />

        <ChatList
          type="directs"
          chats={currentUser.chats.filter(chat => chat.chatType.type === 'direct')}
        />
      </Accordion>
      <Spacer />
      <Button
        w="full"
        alignSelf={'center'}
        colorScheme="teal"
        leftIcon={<ViewIcon />}
        variant={'outline'}
      >
        <NavLink to={'/admin'}>Admin</NavLink>
      </Button>
      <ProfileRow
        profile={currentUser}
        variant={'rounded'}
        hasControls={true}
        logout={logout}
      />
    </SidebarContainer>
  );
}
