import React, { useEffect, useLayoutEffect, useState } from 'react';

import { Flex, Heading } from '@chakra-ui/react';
import { useOutletContext, useParams } from 'react-router-dom';
import { MessageRow } from '../components/MessageRow/MessageRow';

// TODO: Method on ChatService
function getCurrentChat(id, context) {
  context.conversations.forEach((chat, chatId) =>
    chatId === id ? chat : null
  );
}

export default function Chat() {
  const context = useOutletContext();

  const params = useParams();
  const [title, setTitle] = useState();
  const [currentChat, setCurrentChat] = useState(null);

  useLayoutEffect(() => {
    setCurrentChat(context.conversations[params.id]);
    console.log('Current chat: ', currentChat);

    return () => {
      setCurrentChat({});
    };
  }, [params]);

  console.log(context);
  return (
    <>
      <Flex bg={'teal'} w={'full'} px="10px" borderTopRadius={'15px'}>
        <Heading color={'gray.800'}>{title}</Heading>
        {currentChat
          ? currentChat.messages.map(message => (
              <MessageRow
                key={message.id}
                username={message.username}
                message={message.text}
              />
            ))
          : null}
      </Flex>
    </>
  );
}
 