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

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { Header } from '../components/Header/Header';
import UserModal from '../components/UserModal/UserModal';
import Account from '../services/Chat/Account';

const Admin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const chatService = useOutletContext();
  const [accountRows, setAccountsRows] = useState([]);

  const messageListener = useCallback(event => {
    // const message = new Message();
    const payload = JSON.parse(event.data);
    if (payload.type !== 'chat_message') {
      return;
    }

    const message = payload.data;

    if (message.chatId === currentChat.id) {
      setAccountsRows(prevRows => {
        if (!prevRows) {
          return (
            <TableRow
              key={account.ID}
              id={account.ID}
              username={account.username}
              email={account.email}
            />
          );
        }

        return [
          ...prevRows,
          <TableRow
            key={account.ID}
            id={account.ID}
            username={account.username}
            email={account.email}
          />,
        ];
      });
    }
  });

  useEffect(() => {
    const accounts = chatService.getAccounts();
    const accountsArray = [];
    accounts.forEach(account => {
      accountsArray.push(
        <TableRow
          key={account.ID}
          id={account.ID}
          username={account.username}
          email={account.email}
        />
      );
    });

    setAccountsRows(accountsArray);

    return () => {
      setAccountsRows([]);
    };
  }, [chatService]);

  // TODO: Maybe just a method with args on the payload is ok
  const handleCreateAccount = useCallback((email, username, password) => {
    const account = new Account({
      email: email,
      username: username,
      password: password,
    });
    chatService.addAccount(account);
  });

  return (
    <>
      <Flex direction="column" color={'teal'}>
        <Header variant="actions" title={'Users'} action={onOpen} />
        <TableContainer>
          <Table variant={'simple'}>
            <TableCaption>Just a test</TableCaption>
            <Thead>
              <TableHeader />
            </Thead>
            <Tbody>{accountRows}</Tbody>
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

const TableRow = ({ id, username, email, displayedName }) => (
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

export default Admin;
