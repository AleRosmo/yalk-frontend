import { Flex } from '@chakra-ui/react';
import { LayoutGroup, motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import Sidebar from '../components/Sidebar';
import { ChatContext } from '../context/ChatContext';

// const Profile = {
//   Id,
//   Username,
//   DisplayedName,
//   AvatarUrl,
//   LastOffline,
//   LastOnline,
//   IsAdmin,
// };

// const Chat = {
//   Id,
//   Type,
//   Name,
//   Created,
//   Members,
//   IsPublic, // ? Possibly merge with "type"
//   Messages,
// };

function ChatLayout() {
  const { profile, chats } = useLoaderData();
  const context = useContext(ChatContext)

  return (
    <Flex
      bg={'gray.700'}
      w={'full'}
      h={'100vh'}
      gap={'10px'}
      justifyItems={'space-around'}
    >
      <LayoutGroup>
        <Sidebar profile={profile} chats={chats} />
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
          <Outlet context={context}/>
        </Flex>
      </LayoutGroup>
    </Flex>
  );
}

export default ChatLayout;

// ! ALL BELOW THIS LINE WILL BE REMOVED
export const SidebarLoader = async ({ params }) => {
  const { id } = params;

  const profile = await getProfile();

  const chats = await getChats(profile.joinedChats);

  return { profile, chats };
};
async function getChats(chats) {
  return await chats.map(async chatId => {
    const response = await fetch(`http://localhost:4000/chat/${chatId}`);

    if (!response.ok) {
      throw Error('Could not find chat id');
    }
    return response.json();
  });
}

async function getProfile() {
  const response = await fetch(`http://localhost:4000/profile/self`);

  if (!response.ok) {
    throw Error('Could not get profile');
  }

  return response.json();
}