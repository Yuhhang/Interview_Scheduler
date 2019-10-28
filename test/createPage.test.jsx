import React from 'react';
import { shallow } from 'enzyme';
import Create from '../src/schedule_create/Index';

test('Renders create page without crash', () => {
  shallow(<Create />);
});
