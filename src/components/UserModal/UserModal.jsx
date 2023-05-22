import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';

export default function UserModal({
  isOpen,
  onClose,
  email,
  username,
  password,
  type,
  action,
}) {
  const [emailText, setEmailText] = useState(email);
  const [usernameText, setUsernameText] = useState(username);
  const [passwordText, setPasswordText] = useState(password);

  return (
    // TODO: This must be redone from scratch it is the exact copy of Login.jsx
    <Modal
      blockScrollOnMount={true}
      isOpen={isOpen}
      onClose={onClose}
      color="teal"
    >
      <ModalOverlay bg="none" backdropFilter="auto" backdropBlur={'2px'} />
      <ModalContent bg={'gray.800'} color={'teal'}>
        <ModalHeader fontWeight={'bold'}>
          {`${getButtonText(type)} user`}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack gap="4">
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                color={'gray.200'}
                bgColor={'gray.600'}
                type="email"
                onChange={e => setEmailText(e.target.value)}
              />
            </FormControl>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input
                color={'gray.200'}
                bgColor={'gray.600'}
                type="email"
                onChange={e => setUsernameText(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                color={'gray.200'}
                bgColor={'gray.600'}
                type="password"
                onChange={e => setPasswordText(e.target.value)}
              />
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="teal"
            mr={3}
            onClick={() => {
              action(emailText, usernameText, passwordText);
              onClose();
            }}
            fontWeight={'extrabold'}
          >
            {getButtonText(type)}
          </Button>
          <Button variant="ghost" color={'gray.600'} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function getButtonText(type) {
  switch (type) {
    case 'new':
      return 'Add';
    case 'edit':
      return 'Edit';
    default:
      return 'ERROR ';
  }
}
