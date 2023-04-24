import { AddIcon, AtSignIcon, ChatIcon } from '@chakra-ui/icons';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  IconButton,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { ChatListButton } from './ChatListButton';

export const ChatList = ({ type, chats }) => (
  <AccordionItem>
    <Heading as={'h2'}>
      <AccordionButton>
        <Box as="span" flex="1" textAlign="left">
          <Heading as={'h2'} size={'sm'}>
            {type === 'channels' ? (
              <>
                <ChatIcon /> {'Channels'}
              </>
            ) : (
              <>
                <AtSignIcon /> {'Directs'}
              </>
            )}
            <AccordionIcon />
          </Heading>
        </Box>
        <IconButton
          as={'span'}
          size={'xs'}
          icon={<AddIcon />}
          onClick={e => e.stopPropagation()}
        />
      </AccordionButton>
    </Heading>
    <AccordionPanel pb={4}>
      {chats.map(chat => (
        <NavLink to={`/chat/${chat.id}`} key={chat.id}>
          {/* //!TODO isPending Skeleton Loader */}
          {({ isActive, isPending }) => {
            return (
              <ChatListButton
                name={chat.name}
                type={type}
                isActive={isActive}
              />
            );
          }}
        </NavLink>
      ))}
    </AccordionPanel>
  </AccordionItem>
);
