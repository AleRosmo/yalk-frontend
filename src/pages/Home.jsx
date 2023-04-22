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
  // useEffect(() => console.log(count), []);

  useEffect(() => {
    console.log(data ?? 'loading..');
    console.log(`isError: ${isError}`);
    console.log(`isPending: ${isPending}`);
  }, [data, isError, isPending]);

  return (
    <>
      <MessageRow username={'Alice'} message={'Message Text'} />
      <MessageRow
        username={'Bob'}
        message={'Ho spaccato il cazzo nel culo di mia moglie ieri'}
      />
      <MessageRow username={'Cristo di dio'} message={'OOOOOOOOOOH'} />
      <MessageRow
        username={'Daniel'}
        message={'Ruberò i tuoi reni entro 3 giorni'}
      />
      <MessageRow
        username={'Elon Musk'}
        message={'I shat myself while buying Twitter'}
      />
      <MessageRow username={'Fayood'} message={'الله أكبر'} />
    </>
  );
}

export default Home;
