import React, { useLayoutEffect, useRef, useState } from 'react';

import { ChatIcon } from '@chakra-ui/icons';
import { Flex, Heading, Icon, Spacer, Textarea } from '@chakra-ui/react';
import { useOutletContext, useParams } from 'react-router-dom';
import { MessageRow } from '../components/MessageRow/MessageRow';

export default function Chat() {
  const context = useOutletContext();

  const params = useParams();
  const [chat, setChat] = useState(null);

  useLayoutEffect(() => {
    const chat = context.conversations[params.id];
    setChat(chat);

    return () => {
      setChat(null);
    };
  }, [params]);

  return chat ? (
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
        <Heading color={'gray.800'}>{chat.title}</Heading>
      </Flex>
      {chat.messages.map(message => (
        <MessageRow
          key={message.id}
          username={message.username}
          message={message.text}
        />
      ))}
      <Spacer />
      <Textarea
        borderColor={'teal'}
        color={'teal'}
        variant={'outline'}
        resize={'none'}
        onKeyDown={e => {
          // e.preventDefault();
          if (e.key === 'Enter') {
            context.sendMessage(e.target.value);
          }
        }}
      />
    </Flex>
  ) : null;
}

const handleKeyPress = e => {};
