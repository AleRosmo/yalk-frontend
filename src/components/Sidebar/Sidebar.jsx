import { Accordion, Button, Skeleton, Spacer, VStack } from '@chakra-ui/react';
import { useToggle } from '../../hooks/useToggle';
import ChatList from '../ChatList';
import ProfileRow from '../ProfileRow/ProfileRow';

import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { SidebarContainer } from './SidebarContainer';
import { SidebarToggleButton } from './SidebarToggleButton';

export default function Sidebar({ user }) {
  const context = useOutletContext();
  const [isSmall, toggleOpen] = useToggle();

  return (
    <SidebarContainer isSmall={isSmall}>
      <SidebarToggleButton toggleOpen={toggleOpen} />
      <Accordion allowMultiple color="teal" w={'full'}>
        <ChatList
          type="channels"
          chats={user.chats.filter(chat => chat.chatType.type === 'channel')}
        />

        <ChatList
          type="directs"
          chats={user.chats.filter(chat => chat.chatType.type === 'direct')}
        />
      </Accordion>
      <Spacer />
      {/* ! CHANGE THIS!! */}
      <ProfileRow profile={user} />
    </SidebarContainer>
  );
}
