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
} from '@chakra-ui/react';
import React, { useState } from 'react';

export default function NewChatModal({
  isOpen,
  onClose,
  type,
  name,
  users,
  action,
}) {
  const [nameText, setNameText] = useState(name);
  const [typeChoice, setTypeChoice] = useState(type);
  const [usersList, setUsersList] = useState(users);

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
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input
                color={'gray.200'}
                bgColor={'gray.600'}
                type="email"
                onChange={e => setNameText(e.target.value)}
              />
            </FormControl>
            <FormControl id="users">
              <FormLabel>Users</FormLabel>
              <Input
                color={'gray.200'}
                bgColor={'gray.600'}
                type="email"
                // onChange={e => setUsernameText(e.target.value)}
              />
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="teal"
            mr={3}
            onClick={() => {
              // action(emailText, usernameText, passwordText);
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
