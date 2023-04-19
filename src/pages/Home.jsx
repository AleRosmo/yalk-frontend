import React from 'react';
import { MessageRow } from '../components/MessageRow/MessageRow';

function Home() {
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
