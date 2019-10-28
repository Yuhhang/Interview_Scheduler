import React from 'react';
import { shallow } from 'enzyme';
import View from '../src/schedule_view/Index';
import GlobalState from '../src/schedule_manage/context/GlobalState';

test('Renders view page without crash', () => {
  shallow(
    <GlobalState>
      <View />
    </GlobalState>,
  );
});
