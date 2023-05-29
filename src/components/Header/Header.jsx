import { AddIcon, ChatIcon } from '@chakra-ui/icons';
import { Flex, Heading, IconButton } from '@chakra-ui/react';
import React from 'react';

export function Header({ variant, title, action }) {
  switch (variant) {
    case 'primary':
      return (
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="100%"
          px={4}
          py={4}
          bg="gray.100"
        >
          <Flex align="center" justify="space-between" w="100%">
            <Heading as="h1" fontSize="xl" fontWeight="bold">
              {title}
            </Heading>
            <ChatIcon />
          </Flex>
        </Flex>
      );
    case 'actions':
      return (
        <Flex
          bg={'teal'}
          w={'full'}
          px="10px"
          // borderTopRadius={'15px'}
          align={'center'}
          gap={'8px'}
          justifyContent={'space-between'}
        >
          <Heading color={'gray.800'}>{title}</Heading>
          <IconButton
            icon={<AddIcon color={'gray.800'} />}
            variant={'ghost'}
            onClick={action}
          />
        </Flex>
      );
  }
}
