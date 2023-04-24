import { Flex } from '@chakra-ui/react';
import { LayoutGroup, motion } from 'framer-motion';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

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

function RootLayout() {
  const [selectedChat, setSelectedChat] = useState();

  return (
    <Flex
      bg={'gray.700'}
      w={'full'}
      h={'100vh'}
      gap={'10px'}
      justifyItems={'space-around'}
    >
      <LayoutGroup>
        <Sidebar />
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
          <Outlet />
        </Flex>
      </LayoutGroup>
    </Flex>
  );
  // return (
  //   <Grid templateColumns="auto repeat(5, 1fr)">
  //     {/* Sidebar */}
  //     <GridItem
  //       colSpan={{ base: 6, lg: 1 }}
  //       bg="gray.900"
  //       minH={{ lg: '100vh' }}
  //       p="10px"
  //     >
  //       <Sidebar />
  //     </GridItem>
  //     {/* Main */}
  //     <GridItem
  //       as="main"
  //       colSpan={{ base: 6, lg: 5 }}
  //       bgColor={'gray.800'}
  //       color={'teal'}
  //       minH={'100vh'}
  //     >
  //       <Outlet />
  //     </GridItem>
  //   </Grid>
  // );
}

export default RootLayout;
