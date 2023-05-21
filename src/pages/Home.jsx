import React from 'react';
import { useOutletContext } from 'react-router-dom';

function Settings() {
  const context = useOutletContext();

  return <div>Home</div>;

}

export const HomeLoader = () => {
  return <div>Home</div>;
};

export default Settings;
