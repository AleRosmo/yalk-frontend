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
import { Message } from '../services/Chat/messages';

export default function Chat() {
  const context = useOutletContext();
  const params = useParams();
  const toast = useToast();
  const chatContainer = useRef(null);
  const [messageHistory, setMessageHistory] = useState(null);
  const [messageTextValue, setMessageTextValue] = useState();

  // const currentChat = useMemo(
  //   context.chat.find(chat => chat.id === params.chatId),
  //   [params.id]
  // );

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
      position: 'bottom-right',
    });

    if (message.chatId === currentChat.id) {
      setMessageHistory(prevMessages => {
        if (!prevMessages) {
          return (
            <MessageRow
              key={message.id}
              user={message.user}
              content={message.content}
              isLastMessage={true}
            />
          );
        }

        return [
          ...prevMessages,
          <MessageRow
            key={message.id}
            user={message.user}
            content={message.content}
            isLastMessage={true}
          />,
        ];
      });
    }
  });

  useLayoutEffect(() => {
    if (currentChat) {
      setMessageHistory(() => makeChatRows(currentChat));
      context.websocket.addEventListener('message', messageListener);

      return () => {
        setMessageHistory(null);
        context.websocket.removeEventListener('message', messageListener);
      };
    }
  }, [params.id]);

  return currentChat ? (
    <>
      <Skeleton isLoaded={currentChat}>
        <IconHeader title={currentChat ? currentChat.name : 'No chats'} />
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
  ) : (
    <Center>
      <Heading color={'teal'}>{'No chats to display!'}</Heading>
    </Center>
  );
}

function makeChatRows(chat) {
  if (!chat.messages || chat.messages.length === 0) {
    return null;
  }
  return chat.messages.map((message, index) => (
    <MessageRow
      key={message.id}
      user={message.user}
      content={message.content}
      isLastMessage={index === chat.messages.length - 1}
    />
  ));
}
