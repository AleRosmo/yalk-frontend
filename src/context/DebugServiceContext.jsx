import {
  Button,
  Divider,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import React, { createContext, useContext, useState } from 'react';
import { useChatService } from './ChatServiceContext';

export const useDebug = () => {
  return useContext(DebugServiceContext);
};

const DebugServiceContext = createContext();

export default function DebugServiceProvider({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { changeStatus, currentUser, serverUsers } = useChatService();
  const [isLoading, setIsLoading] = useState();

  const DebugModal = (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      blockScrollOnMount={false}
      trapFocus={false}
      scrollBehavior="outside"
      closeOnEscape={true}
    >
      <ModalContent bg={'gray.800'} color={'teal'} gap={'15px'}>
        <ModalHeader>Debug Menu</ModalHeader>
        <ModalCloseButton />
        <Divider
          orientation="horizontal"
          borderColor="teal.500"
          variant={'solid'}
          w={'80%'}
          alignSelf={'center'}
        />
        <ModalBody>
          <HStack>
            <Heading size={'sm'} m={'5px'}>
              Change Status
            </Heading>
            <DebugStatusButton
              isLoading={isLoading}
              changeStatus={changeStatus}
              status={'online'}
              color={'green'}
            />
            <DebugStatusButton
              isLoading={isLoading}
              changeStatus={changeStatus}
              status={'busy'}
              color={'red'}
            />
            <DebugStatusButton
              isLoading={isLoading}
              changeStatus={changeStatus}
              status={'away'}
              color={'yellow'}
            />
            <DebugStatusButton
              isLoading={isLoading}
              changeStatus={changeStatus}
              status={'offline'}
              color={'gray'}
            />
          </HStack>
          <Button
            onClick={() => {
              console.log(currentUser);
            }}
          >
            Log Current User
          </Button>
          <Button
            onClick={() => {
              console.log(serverUsers);
            }}
          >
            Log Server Users
          </Button>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );

  return (
    <DebugServiceContext.Provider value={{ isOpen, onOpen, onClose }}>
      <>
        {DebugModal}
        {children}
      </>
    </DebugServiceContext.Provider>
  );
}

function DebugStatusButton({ isLoading, changeStatus, status, color }) {
  return (
    <Button
      m={'5px'}
      isLoading={isLoading}
      onClick={() => {
        changeStatus(status);
      }}
      color={color}
      fontSize={'5xl'}
      variant={'link'}
      _hover={{
        textDecoration: 'none',
      }}
    >
      •
    </Button>
  );
}
