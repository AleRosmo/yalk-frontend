import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';

import { ChatIcon } from '@chakra-ui/icons';
import { Flex, Heading, Icon, Spacer, Textarea } from '@chakra-ui/react';
import { useOutletContext, useParams } from 'react-router-dom';
import { MessageRow } from '../components/MessageRow/MessageRow';

export default function Chat() {
  const context = useOutletContext();
  const params = useParams();
  const currentChat = useMemo(
    () => context.conversations[params.id],
    [params.id]
  );

  const [messageHistory, setMessageHistory] = useState(null);
  const [messageTextValue, setMessageTextValue] = useState();

  // TODO: Custom hook?
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      context.sendMessage(e.target.value);
      setMessageTextValue('');
    }
  };

  useLayoutEffect(() => {
    setMessageHistory(() => makeChatRows(currentChat));

    const messageListener = event => {
      const message = JSON.parse(event.data);
      if (message.receiver === currentChat.id) {
        // console.log('SAME ID');
        setMessageHistory(prevMessages => [
          ...prevMessages,
          <MessageRow
            key={message.id}
            sender={message.sender}
            message={message.message}
          />,
        ]);
      }
    };

    context.websocket.addEventListener('message', messageListener);

    return () => {
      setMessageHistory(null);
      context.websocket.removeEventListener('message', messageListener);
    };
  }, [params.id, context.conversations[params.id]]);

  return (
    // chat ? (
    <Flex h="full" flexDir={'column'}>
      <Flex
        bg={'teal'}
        w={'full'}
        px="10px"
        borderTopRadius={'15px'}
        align={'center'}
        gap={'8px'}
      >
        <ChatIcon boxSize="28px" />
        <Heading color={'gray.800'}>{currentChat.title}</Heading>
      </Flex>
      {messageHistory}
      <Spacer />
      <Textarea
        borderColor={'gray.800'}
        color={'gray.800'}
        background={'teal'}
        variant={'outlined'}
        resize={'none'}
        onChange={e => setMessageTextValue(e.target.value)}
        value={messageTextValue}
        onKeyDown={handleKeyPress}
      />
    </Flex>
  );
  // ) : null;
}

function makeChatRows(chat) {
  return chat.messages.map(message => (
    <MessageRow
      key={message.id}
      sender={message.sender}
      message={message.message}
    />
  ));
}
