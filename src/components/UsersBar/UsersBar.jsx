import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { useChatService } from '../../context/ChatServiceContext';
import ProfileRow from '../ProfileRow/ProfileRow';
import UsersBarContainer from './UsersBarContainer';

export default function UsersBar() {
  const { serverUsers } = useChatService();
  return (
    <UsersBarContainer>
      <Heading bg={'teal'} textAlign={'center'} w={'full'} borderTopRadius={"15px"}>
        Users
      </Heading>
      <Flex
        flexDirection="column"
        align="center"
        w={'full'}
        gap={'10px'}
        flexGrow={100}
        alignItems={'flex-start'}
        overflowX={'scroll'}
      >
        {serverUsers.map(profile => (
          <ProfileRow key={profile.id} profile={profile}/>
        ))}
      </Flex>
    </UsersBarContainer>
  );
}
