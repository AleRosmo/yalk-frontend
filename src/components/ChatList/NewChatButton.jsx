import { AddIcon } from '@chakra-ui/icons';
import {
  IconButton,
  useDisclosure
} from '@chakra-ui/react';
import NewChatModal from '../NewChatModal/NewChatModal';


export const NewChatButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        as={'span'}
        size={'xs'}
        icon={<AddIcon />}
        onClick={e => {
          e.stopPropagation();
          onOpen();
        }} />
      <NewChatModal
        isOpen={isOpen}
        onClose={onClose}
        type={'new'}
        action={onOpen} />
    </>
  );
};
