import { HamburgerIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import React from 'react';


export const SidebarToggleButton = ({ toggleOpen }) => {
  return (
    <IconButton
      icon={<HamburgerIcon />}
      background={'none'}
      mt={5}
      onClick={toggleOpen} />
  );
};
