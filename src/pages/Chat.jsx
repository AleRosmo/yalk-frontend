import React from 'react';

import { Flex, Heading } from '@chakra-ui/react';
import { useLoaderData, useOutletContext, useParams } from 'react-router-dom';
import { MessageRow } from '../components/MessageRow/MessageRow';

export default function Chat() {
  // const { id } = useParams();
  const chat = useLoaderData();

  return (
    <>
      <Flex bg={'teal'} w={'full'} px="10px" borderTopRadius={'15px'}>
        <Heading color={'gray.800'}>{chat.name}</Heading>
      </Flex>
      {chat.messages.map(message => (
        <MessageRow
          key={message.id}
          username={message.username}
          message={message.text}
        />
      ))}
    </>
  );
}

export const ChatLoader = async ({ params }) => {
  const context = useOutletContext();

  console.log(context);
  // const { id } = params;

  // const response = await fetch(`http://localhost:4000/chat/${id}`);

  // if (!response.ok) {
  //   throw Error('Could not find chat id');
  // }

  // return response.json();
};
