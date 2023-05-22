import { ChatIcon } from '@chakra-ui/icons';
import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';

export function IconHeader({ title }) {
  return (
    <Flex
      bg={'teal'}
      w={'full'}
      px="10px"
      borderTopRadius={'15px'}
      align={'center'}
      gap={'8px'}
    >
      <ChatIcon boxSize="28px" />
      <Heading color={'gray.800'}>{title}</Heading>
    </Flex>
  );
}
