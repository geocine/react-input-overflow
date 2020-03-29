import React, { useState } from 'react';
import InputOverflow from '../src';
import { Content } from './common';

export default {
  title: 'Basic InputOverflow',
  decorators: [storyFn => <Content>{storyFn()}</Content>],
};

export const Simple = () => {
  const [name, setName] = useState('Aivan');
  const [number, setNumber] = useState('12345');
  return (
    <>
      <InputOverflow
        value={name}
        onChange={e => {
          setName(e.target.value);
        }}
      />
      <InputOverflow
        value={number}
        onChange={e => {
          setNumber(e.target.value);
        }}
      />
    </>
  );
};
