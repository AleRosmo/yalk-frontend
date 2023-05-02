import React, { useMemo, useState } from 'react';

import { Flex, Heading } from '@chakra-ui/react';
import { useOutletContext, useParams } from 'react-router-dom';
import { MessageRow } from '../components/MessageRow/MessageRow';

export default function Chat() {
  const context = useOutletContext();

  const chatId = useParams();
  const [title, setTitle] = useState();
  const [messages, setMessages] = useState({});

  const chat = useMemo(() => context.conversations[chatId], [chatId]);

  useEffect(() => {
    setTitle(chat.title);
    setMessages(() => {
      chat.messages.map(message => (
        <MessageRow
          key={message.id}
          username={message.username}
          message={message.text}
        />
      ));
    });

    return () => {
      setMessages(null);
    };
  }, [chat]);

  console.log(context);
  return (
    <>
      <Flex bg={'teal'} w={'full'} px="10px" borderTopRadius={'15px'}>
        <Heading color={'gray.800'}>{title}</Heading>
      </Flex>
      <div>{messages}</div>
    </>
  );
}
