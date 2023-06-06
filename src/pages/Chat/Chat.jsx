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
import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { IconHeader } from '../../components/IconHeader/IconHeader';
import { MessageRow } from '../../components/MessageRow/MessageRow';
import { useChatService } from '../../context/ChatServiceContext';
import { ChatTextarea } from './ChatTextarea';
export default function Chat() {
  const params = useParams();
  const chatId = parseInt(params.id);

  const { chats, serverUsers, sendMessage } = useChatService();
  const chatContainer = useRef(null);

  const chat = chats.find(c => c.id === chatId);

  // TODO: Custom hook?

  return (
    <>
      {/* TODO: Add invalid chat header error like above */}
      <IconHeader title={chat.name} />
      <Flex h="full" flexDir={'column'} overflow={'scroll'} ref={chatContainer}>
        {chat.messages.length === 0 ? (
          <MessageRow
            key={1}
            user={serverUsers.find(u => u.userId === 0)}
            content={`It's quiet here! write something first!`}
            isLastMessage={true}
          />
        ) : (
          chat.messages.map((message, index) => {
            const convertedTimestamp = convertTimestamp(message.timestamp);
            return (
              <MessageRow
                key={message.id}
                user={message.user}
                timestamp={convertedTimestamp}
                content={message.content}
                isLastMessage={index === chat.messages.length - 1}
              />
            );
          })
        )}
        <Spacer />
      </Flex>
      <ChatTextarea chatId={chat.id} />
    </>
  );
}

function convertTimestamp(timestamp) {
  const date = new Date(timestamp);
  const options = {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'UTC',
  };

  return date.toLocaleDateString('en-US', options);
}
