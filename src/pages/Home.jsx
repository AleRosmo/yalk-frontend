import { Center, Flex, Heading, Text } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { MessageRow } from '../components/MessageRow/MessageRow';
import { useAxiosFetch } from '../hooks/useAxiosFetch';
import { useFetch } from '../hooks/useFetch';
import { useRenderCount } from '../hooks/useRenderCount';
// import { ChatBox } from '../layouts/ChatBox';

function Home() {
  const context = useOutletContext();

  return <Text color={'white'}>{context.test}</Text>;
}

export const HomeLoader = () => {
  return <div>Home</div>;
};

export default Home;
