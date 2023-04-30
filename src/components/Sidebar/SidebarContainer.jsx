import { Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';


export const SidebarContainer = ({ isSmall, children }) => {
  return (
    <Flex
      as={motion.div}
      layout={true}
      p={'15px'}
      pos={'sticky'}
      bg={'gray.900'}
      h={'95vh'}
      mt={'2.5vh'}
      ml={'10px'}
      borderRadius={'15px'}
      w={{ base: 'full', lg: isSmall ? '75px' : '250px' }}
    >
      <Flex
        flexDirection="column"
        align="center"
        w={'full'}
        gap={'10px'}
        flexGrow={100}
        alignItems={isSmall ? 'center' : 'flex-start'}
      >
        {children}
      </Flex>
    </Flex>
  );
};
