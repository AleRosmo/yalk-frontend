import { AddIcon, AtSignIcon, ChatIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Spacer,
  VStack,
} from '@chakra-ui/react';
import { isValidMotionProp, motion } from 'framer-motion';
import { useState } from 'react';
import { useToggle } from '../../hooks/useToggle';
import ProfileRow from '../ProfileRow/ProfileRow';

export const Sidebar = () => {
  const [isSmall, toggleOpen] = useToggle();
  return (
    // Container
    <Flex
      as={motion.div}
      // data-isOpen={isSmall}
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
        {/* Header */}
        {/* // TODO: LogoPlaceHolder */}
        <IconButton
          icon={<HamburgerIcon />}
          background={'none'}
          mt={5}
          onClick={toggleOpen}
        />
        <VStack>
          <Button
            as={motion.button}
            w={'full'}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition="0.25s linear"
          >
            Home
          </Button>
          <Button w={'full'}>Profile</Button>
        </VStack>

        <Accordion allowMultiple color="teal" w={'full'}>
          {/* Channels */}
          <ChatList
            type="channels"
            chats={[
              {
                id: 1,
                name: 'Testat',
              },
              { id: 2, name: 'Nucleare' },
            ]}
          />

          {/* Dms */}
        </Accordion>

        <Button
          as={motion.button}
          variant="solid"
          colorScheme="teal"
          // drag="x"
          // dragConstraints={{ left: -100, right: 100 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition="0.25s linear"
        >
          Test Framer
        </Button>
        <Spacer />
        {/* Profile */}
        <ProfileRow />
      </Flex>
    </Flex>
  );
};

export default Sidebar;

const ChatList = ({ type, chats }) => (
  <AccordionItem>
    <Heading as={'h2'}>
      <AccordionButton>
        <Box as="span" flex="1" textAlign="left">
          <Heading as={'h2'} size={'sm'}>
            {type === 'channels' ? (
              <>
                <ChatIcon /> {'Channels'}
              </>
            ) : (
              <>
                <AtSignIcon /> {'Directs'}
              </>
            )}
            <AccordionIcon />
          </Heading>
        </Box>
        <IconButton
          as={'span'}
          size={'xs'}
          icon={<AddIcon />}
          onClick={e => e.stopPropagation()}
        />
      </AccordionButton>
    </Heading>
    <AccordionPanel pb={4}>
      {chats.map((chat, i) => (
        <ChatListButton key={chat.id} name={chat.name} type={type} />
      ))}
      {/* <Button variant="ghost" w={'full'}>
          Test2
        </Button> */}
    </AccordionPanel>
  </AccordionItem>
);

function ChatListButton({ key, name, type }) {
  return (
    <Button variant="ghost" w={'full'} justifyContent={'flex-start'} key={key}>
      {name}
    </Button>
  );
}
