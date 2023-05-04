import { Avatar, Flex, IconButton, Text } from '@chakra-ui/react';
import { FaHashtag } from 'react-icons/fa';

export const ChatListButton = ({ id, name, type, isActive }) => (
  <IconButton
    variant="ghost"
    w={'full'}
    justifyContent={'flex-start'}
    isActive={isActive}
    icon={
      type.includes('channel') ? (
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
