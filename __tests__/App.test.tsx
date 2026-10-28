import 'react-native';
import React from 'react';
import {it, afterEach} from '@jest/globals';
import renderer, {act} from 'react-test-renderer';
import App from '../App';
import {queryClient} from '../src/shared';

afterEach(() => {
  queryClient.clear();
});

it('renders correctly', async () => {
  await act(async () => {
    renderer.create(<App />);
  });
});
