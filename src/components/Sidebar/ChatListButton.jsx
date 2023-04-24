import { Avatar, Button, Flex, IconButton, Text } from '@chakra-ui/react';
import { FaHashtag } from 'react-icons/fa';

export function ChatListButton({ id, name, type }) {
  return (
    <IconButton
      variant="ghost"
      w={'full'}
      justifyContent={'flex-start'}
      // key={id}
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
