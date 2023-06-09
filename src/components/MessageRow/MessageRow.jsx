import { Flex, Heading, Text, VStack } from '@chakra-ui/react';

import React from 'react';
import AvatarHover from '../AvatarHover/AvatarHover';

export const MessageRow = ({ username, message }) => {
  return (
    // TODO: Cards instead of flex
    <Flex
      align={'left'}
      gap={'10px'}
      p={'10px'}
      _hover={{ backgroundColor: 'teal.700' }}
      color={'teal'}
    >
      <AvatarHover />
      <VStack align={'left'}>
        <Heading fontSize={'20px'} fontWeight={'bold'}>
          {username}
        </Heading>
        <Text>{message}</Text>
      </VStack>
    </Flex>
  );
};
