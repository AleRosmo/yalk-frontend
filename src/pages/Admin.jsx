import {
  Avatar,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { useOutletContext } from 'react-router-dom';

import React, { useCallback } from 'react';
import { AddButton } from '../components/ChatList/ChatList';
import { Header } from '../components/Header/Header';
import UserModal from '../components/UserModal/UserModal';
import Account from '../services/Chat/Account';

const Admin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const chatService = useOutletContext();

  // TODO: Maybe just a method with args on the payload is ok
  const handleCreateAccount = useCallback((email, username, password) => {
    const account = new Account({
      email: email,
      username: username,
      password: password,
    });
    chatService.AddAccount(account);
  });

  return (
    <>
      <Flex direction="column" color={'teal'}>
        <Header variant="actions" title={'Users'} action={onOpen} />
        <TableContainer>
          <Table variant={'simple'}>
            <TableCaption>Just a test</TableCaption>
            <Thead>
              <Tr>
                <Th>Avatar</Th>
                <Th>ID</Th>
                <Th>Username</Th>
                <Th>Email</Th>
                <Th>Password</Th>
                <Th>Displayed Name</Th>
                <Th>
                  <AddButton>Add</AddButton>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <Avatar size="sm"></Avatar>
                </Td>
                <Td>1</Td>
                <Td>admin</Td>
                <Td>admin@localhost</Td>
                <Td>admin</Td>
                <Td>admin</Td>
                <Td>Actions</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
      <UserModal
        isOpen={isOpen}
        onClose={onClose}
        type={'new'}
        action={handleCreateAccount}
      />
    </>
  );
};

export default Admin;
