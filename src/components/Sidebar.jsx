import React from 'react';
import { Route, Routes } from 'react-router-dom';

function Sidebar() {
  return (
    <Routes>
      {/* <Route path="/" element={'palle'}> */}
      <Route index element={<Home>{saved}</Home>} />
      {/* </Route> */}
    </Routes>
  );
}

export default Sidebar;
