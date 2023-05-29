import { Center, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function Admin() {
  return (
    <HStack h={'full'} align={'top'}>
      <VStack p="10px" alignSelf={'flex-start'} alignItems={'flex-start'}>
        <AdminLink text={'Accounts'} to={'/admin/accounts'} />
        <AdminLink text={'Users'} to={'/admin/users'} />
      </VStack>
      <Center alignSelf={'center'} h={'90%'}>
        <Divider
          orientation="vertical"
          borderColor="teal.500"
          variant={'solid'}
          mx={'2px'}
        />
      </Center>
      <Outlet />
    </HStack>
  );
}

const AdminLink = ({ text, to }) => {
  return (
    <NavLink
      to={to}
      color="teal"
      style={({ isActive }) => {
        return {
          fontWeight: isActive ? 'bold' : '',
        };
      }}
    >
      <Text color={'teal'}>{text}</Text>
    </NavLink>
  );
};
