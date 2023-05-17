import {
  Box,
  Flex,
  Skeleton,
  Spacer,
  Textarea,
  scroll,
  space,
  useToast,
} from '@chakra-ui/react';

import React, {
  useCallback,
  useDeferredValue,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { ChatHeader } from '../components/ChatHeader/ChatHeader';
import { MessageRow } from '../components/MessageRow/MessageRow';
import { Message } from '../services/Chat/messages';

// ! LOADER FUNCTION!!!
export default function Chat() {
  const context = useOutletContext();
  const params = useParams();
  const toast = useToast();
  const chatContainer = useRef(null);
  const [messageHistory, setMessageHistory] = useState(null);
  const [messageTextValue, setMessageTextValue] = useState();

  const currentChat = useMemo(() => {
    return context.chats[parseInt(params.id)];
  }, [params.id]);

  // TODO: Custom hook?
  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();

      const message = new Message();
      const timestamp = new Date();

      message.new({
        chatId: currentChat.id,
        messageType: 'chat_message',
        timestamp: timestamp.toISOString(),
        content: messageTextValue,
      });

      context.sendMessage(message);
      setMessageTextValue('');
    }
  };

  const messageListener = useCallback(event => {
    // const message = new Message();
    const payload = JSON.parse(event.data);
    if (payload.type !== 'chat_message') {
      return;
    }

    const message = payload.data;

    toast({
      title: 'Debug: Message received',
      description: message.content,
      status: 'info',
      duration: 5000,
    });

    if (message.chatId === currentChat.id) {
      setMessageHistory(prevMessages => [
        ...prevMessages,
        <MessageRow
          key={message.id}
          user={message.user}
          content={message.content}
        />,
      ]);
    }
  });

  useLayoutEffect(() => {
    setMessageHistory(() => makeChatRows(currentChat));
    context.websocket.addEventListener('message', messageListener);

    return () => {
      setMessageHistory(null);
      context.websocket.removeEventListener('message', messageListener);
    };
  }, [params.id]);

  useDeferredValue(() => {
    console.log('here');
  });

  return (
    <>
      <Skeleton isLoaded={currentChat}>
        <ChatHeader title={'Test'} />
      </Skeleton>
      <Flex h="full" flexDir={'column'} overflow={'scroll'} ref={chatContainer}>
        {messageHistory}
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
          placeholder={'Uhm..'}
          _placeholder={{ color: 'teal.700' }}
        />
      </Box>
    </>
  );
}

function makeChatRows(chat) {
  return chat.messages.map(message => (
    <MessageRow
      key={message.id}
      user={message.user}
      content={message.content}
    />
  ));
}
