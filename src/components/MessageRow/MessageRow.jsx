import { Divider, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import Avatar from '../Avatar/Avatar';
export const MessageRow = ({ username, message }) => {
  return (
    // TODO: Cards instead of flex
    <Flex align={'center'} gap={'10px'} p={'10px'}>
      <Avatar />
      <Flex justify={'center'} gap={'10px'} flexDirection={"column"}>
        <Text fontWeight={"bold"}>{username}</Text>
        <Text>{message}</Text>
      </Flex>
    </Flex>
  );
};
