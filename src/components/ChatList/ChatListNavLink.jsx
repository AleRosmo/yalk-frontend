import { Avatar, Flex, IconButton, Text } from '@chakra-ui/react';
import { FaHashtag } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

export const ChatListNavLink = ({ type, chat }) => (
  <NavLink to={`/chat/${chat.id}`}>
    {/* //!TODO isPending Skeleton Loader */}
    {({ isActive, isPending }) => {
      <ChatListNavLinkButton
        key={chat.id}
        name={chat.name}
        type={type}
        isActive={isActive}
      />;
    }}
  </NavLink>
);

export function ChatListNavLinkButton({ id, name, type, isActive }) {
  return (
    <IconButton
      variant="ghost"
      w={'full'}
      justifyContent={'flex-start'}
      isActive={isActive}
      icon={
        type === 'channels' ? (
          <Flex key={id} gap={'8px'} align={'center'}>
            <FaHashtag />
            <Text>{name}</Text>
          </Flex>
        ) : (
          <Flex key={id} gap={'8px'} align={'center'}>
            <Avatar maxW={'32px'} maxH={'32px'} />
            <Text>{name}</Text>
          </Flex>
        )
      }
    >
      {name}
    </IconButton>
  );
}
