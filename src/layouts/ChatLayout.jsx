import { Center, Flex, HStack, Spinner, VStack } from '@chakra-ui/react';
import { LayoutGroup, motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import UsersBar from '../components/UsersBar';
import { useChatService } from '../context/ChatServiceContext';

const MainContainer = ({ children }) => (
  <Flex
    as={motion.div}
    // mr={'10px'}
    layout={true}
    bg={'gray.900'}
    direction={'column'}
    h={'95vh'}
    mt={'2.5vh'}
    borderRadius={'15px'}
    w={'full'}
  >
    {children}
  </Flex>
);
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
      overscrollBehavior={'none'}
      bg={'gray.700'}
      w={'full'}
      h={'100vh'}
      gap={'10px'}
      justifyItems={'space-around'}
      color={'gray.800'}
    >
      <LayoutGroup>
        <Sidebar user={user} />
        <MainContainer>
          <Outlet />
        </MainContainer>
        <UsersBar />
      </LayoutGroup>
    </Flex>
  );
}
