import { Grid, GridItem } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function RootLayout() {
  return (
    <Grid templateColumns="repeat(6, 1fr)">
      {/* Sidebar */}
      <GridItem
        as="aside"
        colSpan={{ base: 6, lg: 1 }}
        bg="gray.900"
        minH={{ lg: '100vh' }}
        p="10px"
      >
        <Sidebar />
      </GridItem>
      {/* Main */}
      <GridItem
        as="main"
        colSpan={{ base: 6, lg: 5 }}
        border={'2px solid blue'}
        bgColor={'gray.800'}
        color={'teal'}
        minH={'100vh'}
      >
        <Outlet />
      </GridItem>
      {/*  */}
    </Grid>
  );
}

export default RootLayout;
