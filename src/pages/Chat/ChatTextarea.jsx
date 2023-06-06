import { Box, Textarea } from '@chakra-ui/react';

import React, { useState } from 'react';
import { useChatService } from '../../context/ChatServiceContext';

export function ChatTextarea({ chatId }) {
  const [messageTextValue, setMessageTextValue] = useState();
  const { sendMessage } = useChatService();

  const handleKeyPress = event => {
    if (event.key === 'Enter' && messageTextValue && messageTextValue !== '') {
      // TODO: check for empty not working if \n.
      event.preventDefault();
      sendMessage(chatId, messageTextValue);
      setMessageTextValue('');
    }
  };

  return (
    <Box margin={'10px'}>
      <Textarea // borderColor={'gray.400'}
        color={'teal.300'}
        background={'gray.800'} // variant={'outlined'}
        resize={'none'}
        onChange={e => setMessageTextValue(e.target.value)}
        value={messageTextValue}
        onKeyDown={handleKeyPress}
        placeholder={'Type something..'}
        _placeholder={{
          color: 'teal.700',
        }}
      />
    </Box>
  );
}
