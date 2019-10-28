import React from 'react';
import { shallow } from 'enzyme';
import App from '../src/App';

test('Renders app without crash', () => {
  shallow(<App />);
});
