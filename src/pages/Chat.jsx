import { ChatIcon } from '@chakra-ui/icons';
import {
    Box,
    Flex,
    Heading,
    Icon,
    Spacer,
    Textarea,
    useToast,
} from '@chakra-ui/react';
import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { MessageRow } from '../components/MessageRow/MessageRow';

// ! LOADER FUNCTION!!!
export default function Chat() {
  const context = useOutletContext();
  const params = useParams();
  const currentChat = useMemo(
    () => context.conversations[params.id],
    [params.id]
  );

  const toast = useToast();

  const [messageHistory, setMessageHistory] = useState(null);
  const [messageTextValue, setMessageTextValue] = useState();

  // TODO: Custom hook?
  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      context.sendMessage(currentChat.id, messageTextValue);
      setMessageTextValue('');
    }
  };

  const messageListener = useCallback(event => {
    const message = JSON.parse(event.data);
    toast({
      title: 'Debug: Message received',
      description: message.content,
      status: 'info',
      duration: 5000,
    });
    if (
      message.type === 'chat_message' &&
      message.receivers.includes(currentChat.id)
    ) {
      setMessageHistory(prevMessages => [
        ...prevMessages,
        <MessageRow
          key={message.id}
          sender={message.sender}
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
  }, [params.id, context.conversations[params.id]]);

  return (
    <Flex h="full" flexDir={'column'}>
      <ChatHeader title={currentChat.title} />
      {messageHistory}
      <Spacer />
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
    </Flex>
  );
}

function ChatHeader({ title }) {
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

function makeChatRows(chat) {
  return chat.messages.map(message => (
    <MessageRow
      key={message.id}
      sender={message.sender}
      content={message.content}
    />
  ));
}
