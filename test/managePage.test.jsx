import React from 'react';
import { shallow } from 'enzyme';
import Manage from '../src/schedule_manage/Index';
import GlobalState from '../src/schedule_manage/context/GlobalState';

test('Renders manage page without crash', () => {
  shallow(
    <GlobalState>
      <Manage />
    </GlobalState>,
  );
});
