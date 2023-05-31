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
import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IconHeader } from '../components/IconHeader/IconHeader';
import { MessageRow } from '../components/MessageRow/MessageRow';

import { useChatService } from '../context/ChatServiceContext';

export default function Chat() {
  const params = useParams();
  const chatContainer = useRef(null);

  const [messageTextValue, setMessageTextValue] = useState();
  const { chats, serverUsers, sendMessage } = useChatService();

  const chatId = parseInt(params.id);
  const chat = chats.find(c => c.id === chatId);

  // TODO: Custom hook?
  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage(chat.id, messageTextValue);
      setMessageTextValue('');
    }
  };

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
