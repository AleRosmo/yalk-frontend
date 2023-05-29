import {
  Avatar,
  Box,
  Container,
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
  useToast,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useRef } from 'react';
import { Header } from '../../components/Header/Header';
import UserModal from '../../components/UserModal/UserModal';
import { useChatService } from '../../context/ChatServiceContext';

export default function Accounts() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { accounts, addAccount } = useChatService();
  const toast = useToast();
  const userAdded = useRef(false);

  // TODO: Maybe just a method with args on the payload is ok
  const handleCreateAccount = useCallback((email, username, password) => {
    addAccount(email, username, password);
    userAdded.current = true;
  });

  useEffect(() => {
    userAdded.current
      ? toast({
          title: 'Accounts created',
          status: 'success',
          duration: 5000,
          position: 'bottom-right',
        })
      : null;
  }, [accounts]);

  return (
    <>
      <Flex direction="column" color={'teal'} w={'full'} >
        <Header variant="actions" title={'Accounts'} action={onOpen} />
        <TableContainer >
          <Table variant={'simple'}>
            <TableCaption>Just a test</TableCaption>
            <Thead>
              <TableHeader />
            </Thead>
            <Tbody>
              {accounts.map(account => (
                <TableRow
                  key={account.ID}
                  id={account.ID}
                  username={account.username}
                  email={account.email}
                />
              ))}
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
}

const TableHeader = () => (
  <Tr>
    {/* <Th>Avatar</Th> */}
    <Th>ID</Th>
    <Th>Username</Th>
    <Th>Email</Th>
    {/* <Th>Password</Th> */}
    {/* <Th>Displayed Name</Th> */}
    <Th>{'Placeholder'}</Th>
  </Tr>
);

const TableRow = ({ id, username, email }) => (
  <Tr>
    {/* <Td>
      <Avatar size="sm" src={avatar} />
    </Td> */}
    <Td>{id}</Td>
    <Td>{username}</Td>
    <Td>{email}</Td>
    {/* <Td>{displayedName}</Td> */}
    <Td>{'placeholder'}</Td>
  </Tr>
);
