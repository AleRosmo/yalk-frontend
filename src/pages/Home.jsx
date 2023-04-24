import { Center, Flex, Heading } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { MessageRow } from '../components/MessageRow/MessageRow';
import { useAxiosFetch } from '../hooks/useAxiosFetch';
import { useFetch } from '../hooks/useFetch';
import { useRenderCount } from '../hooks/useRenderCount';

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
    <>
      <Flex bg={'teal'} w={'full'} px="10px" borderTopRadius={'15px'}>
        <Heading color={'gray.800'}># Chat Title</Heading>
      </Flex>
      <MessageRow username={'Alice'} message={'Message Text'} />
      <MessageRow username={'Bob'} message={'Another message'} />
    </>
  );
}

export default Home;
