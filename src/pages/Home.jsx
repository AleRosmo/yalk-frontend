import { Center, Flex, Heading } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { MessageRow } from '../components/MessageRow/MessageRow';
import { useAxiosFetch } from '../hooks/useAxiosFetch';
import { useFetch } from '../hooks/useFetch';
import { useRenderCount } from '../hooks/useRenderCount';
// import { ChatBox } from '../layouts/ChatBox';

function Home() {
  const [data, isError, isPending] = useAxiosFetch(
    'https://jsonplaceholder.typicode.com/todos/1'
  );

  const [count, resetCount] = useRenderCount();

  useEffect(() => {
    console.log(data ?? 'loading..');
    console.log(`isError: ${isError}`);
    console.log(`isPending: ${isPending}`);
  }, [data, isError, isPending]);

  return (
    <Text>Palle</Text>
  );
}

export default Home;
