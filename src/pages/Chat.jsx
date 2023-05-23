import {
  Box,
  Center,
  Flex,
  Heading,
  Skeleton,
  Spacer,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useChatService } from '../context/ChatContext';

import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { IconHeader } from '../components/IconHeader/IconHeader';
import { MessageRow } from '../components/MessageRow/MessageRow';
// import { Message } from '../services/Chat/messages';

export default function Chat() {
  const context = useOutletContext();
  const params = useParams();
  const toast = useToast();
  const chatContainer = useRef(null);
  // const [messageHistory, setMessageHistory] = useState(null);
  const [messageTextValue, setMessageTextValue] = useState();
  const {
    user,
    chats,
    accounts,
    serverUsers,
    sendMessage,
    addAccount,
    isLoading,
  } = useChatService();

  const chat = chats.get(parseInt(params.id));

  // TODO: Custom hook?
  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage(chat.id, messageTextValue);
      setMessageTextValue('');
    }
  };

  // if () {
  //   return (
  //     <Center>
  //       <IconHeader title={'No chats'} />

  //     </Center>
  //   );
  // }

  return (
    <>
      {/* TODO: Add invalid chat header error like above */}
      <IconHeader title={chat.name} />
      <Flex h="full" flexDir={'column'} overflow={'scroll'} ref={chatContainer}>
        {chat.messages.length === 0 ? (
          <MessageRow
            key={1}
            user={serverUsers.get(1)}
            content={`It's quiet here! write something first!`}
            isLastMessage={true}
          />
        ) : (
          chat.messages.map((message, index) => (
            <MessageRow
              key={message.id}
              user={message.user}
              content={message.content}
              isLastMessage={index === chat.messages.length - 1}
            />
          ))
        )}
        <Spacer />
      </Flex>
      <Box margin={'10px'}>
        <Textarea
          // borderColor={'gray.400'}
          color={'teal.300'}
          background={'gray.800'}
          // variant={'outlined'}
          resize={'none'}
          onChange={e => setMessageTextValue(e.target.value)}
          value={messageTextValue}
          onKeyDown={handleKeyPress}
          placeholder={'Type something..'}
          _placeholder={{ color: 'teal.700' }}
        />
      </Box>
    </>
  );
}