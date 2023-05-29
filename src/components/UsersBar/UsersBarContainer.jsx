import { Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';

export default function UsersBarContainer({ children }) {
  return (
    <Flex
      as={motion.div}
      layout={true}
      pos={'sticky'}
      bg={'gray.900'}
      h={'95vh'}
      mt={'2.5vh'}
      mr={'10px'}
      borderRadius={'15px'}
      w={'250px'}
    >
      <Flex
        flexDirection="column"
        align="center"
        w={'full'}
        gap={'10px'}
        flexGrow={100}
        alignItems={'flex-start'}
      >
        {children}
      </Flex>
    </Flex>
  );
}
