import { Avatar, Flex, HStack, Heading, Text, VStack } from '@chakra-ui/react';

import React, { useEffect, useRef } from 'react';
import AvatarHover from '../AvatarHover/AvatarHover';

export const MessageRow = ({ user, timestamp, content, isLastMessage }) => {
  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (isLastMessage && lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isLastMessage]);

  return (
    // TODO: Cards instead of flex
    <Flex
      align={'left'}
      gap={'10px'}
      p={'10px'}
      _hover={{ backgroundColor: 'teal.700', color: 'gray.400' }}
      color={'teal'}
      ref={isLastMessage ? lastMessageRef : null}
    >
      <Avatar src={user.avatarUrl} />

      <VStack align={'left'}>
        <MessageRowHeader timestamp={timestamp} user={user}/>
        <Text>{content}</Text>
      </VStack>
    </Flex>
  );
};

const MessageRowHeader = ({ timestamp, user }) => {
  return (
    <HStack>
      <Heading fontSize={'20px'} fontWeight={'bold'}>
        {user.displayName}
      </Heading>
      <Text fontSize={"xs"}>{timestamp}</Text>
    </HStack>
  );
};
