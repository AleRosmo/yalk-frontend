import { Avatar, Card, Divider, Flex, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import AvatarHover from '../AvatarHover/AvatarHover';
export const MessageRow = ({ username, message }) => {
  return (
    // TODO: Cards instead of flex
    <Card
      direction="row"
      align={'left'}
      gap={'10px'}
      p={'10px'}
      _hover={{ backgroundColor: 'gray.600' }}
    >
      <AvatarHover />
      <VStack align={'left'}>
        <Text fontWeight={'bold'}>{username}</Text>
        <Text>{message}</Text>
      </VStack>
    </Card>
  );
};
