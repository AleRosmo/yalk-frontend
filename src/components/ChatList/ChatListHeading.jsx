import { AtSignIcon, ChatIcon } from '@chakra-ui/icons';
import { AccordionButton, AccordionIcon, Box, Heading } from '@chakra-ui/react';
import { AddButton } from './ChatList';

export const ChatListHeading = ({ type }) => {
  return (
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
        <AddButton />
      </AccordionButton>
    </Heading>
  );
};
