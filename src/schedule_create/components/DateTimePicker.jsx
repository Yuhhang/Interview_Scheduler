import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

// eslint-disable-next-line react/prop-types
function InlineDateTimePicker({ selectedDate, handleDateChange }) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDateTimePicker
        style={{
          marginLeft: 16,
          marginRight: 16,
          marginTop: 20,
          marginBottom: 10,
        }}
        fullWidth
        variant="inline"
        ampm={false}
        label="预计的面试开始时间"
        value={selectedDate}
        onChange={handleDateChange}
        // onError={console.log}
        disablePast
        inputVariant="filled"
        format="yyyy/MM/dd HH:mm"
      />
    </MuiPickersUtilsProvider>
  );
}

export default InlineDateTimePicker;
