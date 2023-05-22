import {
  Accordion,
  Button,
  IconButton,
  Skeleton,
  Spacer,
  VStack,
} from '@chakra-ui/react';
import { useToggle } from '../../hooks/useToggle';
import ChatList from '../ChatList';
import ProfileRow from '../ProfileRow/ProfileRow';

import { ViewIcon } from '@chakra-ui/icons';
import React from 'react';
import { NavLink, useOutletContext } from 'react-router-dom';
import { AddButton } from '../ChatList/ChatList';
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
      <Button w="full" alignSelf={"center"} colorScheme="teal" leftIcon={<ViewIcon />} variant={"outline"}>
        <NavLink to={'/admin'}>Admin</NavLink>
      </Button>
      <ProfileRow profile={user} />
    </SidebarContainer>
  );
}
