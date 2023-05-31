import { AddIcon } from '@chakra-ui/icons';
import { AccordionItem, AccordionPanel, IconButton } from '@chakra-ui/react';
import { ChatListHeading } from './ChatListHeading';
import { ChatListNavLink } from './ChatListNavLink';

export const ChatList = ({ type, chats, isSmall }) => (
  <AccordionItem>
    <ChatListHeading type={type} />
    <AccordionPanel pb={4}>
      {chats.map((chat, i) => (
        <ChatListNavLink key={i} chat={chat} />
      ))}
    </AccordionPanel>
  </AccordionItem>
);

export const AddButton = () => (
  <IconButton
    as={'span'}
    size={'xs'}
    icon={<AddIcon />}
    onClick={e => e.stopPropagation()}
  />
);
