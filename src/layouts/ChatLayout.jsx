import { Flex, Spinner } from '@chakra-ui/react';
import { LayoutGroup, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useChat } from '../context/ChatContext';

export default function ChatLayout() {
  const chatService = useChat();

  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (chatService.websocket !== null) {
      chatService.websocket.addEventListener('message', handleMessage);
      setUser(chatService.user);
    }
    return () => {
      chatService.websocket.removeEventListener('message', handleMessage);
    };
  }, [chatService]);

  if (!user) {
    return <Spinner />;
  }

  return (
    <Flex
      bg={'gray.700'}
      w={'full'}
      h={'100vh'}
      gap={'10px'}
      justifyItems={'space-around'}
      color={'gray.800'}
    >
      <LayoutGroup>
        <Sidebar user={user} />
        <Flex
          as={motion.div}
          mr={'10px'}
          layout={true}
          bg={'gray.900'}
          direction={'column'}
          h={'95vh'}
          mt={'2.5vh'}
          borderRadius={'15px'}
          w={'full'}
        >
          <Outlet context={chatService} />
        </Flex>
      </LayoutGroup>
    </Flex>
  );

  function handleMessage(event) {
    const payload = JSON.parse(event.data);
    const data = payload.data;
    if (payload.type === 'initial') {
      setUser(data.user);
    }
  }
}
