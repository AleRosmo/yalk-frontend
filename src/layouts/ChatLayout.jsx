import { Flex, Spinner } from '@chakra-ui/react';
import { LayoutGroup, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useChatService } from '../context/ChatContext';

export default function ChatLayout() {
  const {
    user,
    chats,
    accounts,
    serverUsers,
    sendMessage,
    addAccount,
    isLoading,
  } = useChatService();

  // TODO: To ChatLayout, has nothing to do here
  if (isLoading) {
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
          {/* <Outlet context={chatService} /> */}
          <Outlet />
        </Flex>
      </LayoutGroup>
    </Flex>
  );

  // function handleMessage(event) {
  //   const payload = JSON.parse(event.data);
  //   const data = payload.data;
  //   if (payload.type === 'initial') {
  //     setUser(data.user);
  //   }
  // }
}
