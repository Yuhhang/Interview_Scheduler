import React, { useReducer } from 'react';

import context from './context';
import {
  userReducer,
  INIT_STATE,
  SET_INFO_EVENTNAME,
  SET_INFO_PLACE,
  SET_INFO_TIMEPERPERSON,
  SET_INFO_STARTTIME,
  SET_STATUS_START,
  SET_STATUS_END,
  SET_STATUS_NEXT,
  SET_STATUS_PRESENT,
  SET_STATUS_UNPRESENT,
} from './Reducer';


const GlobalState = (props) => {
  const initialState = {
    info: {
      id: '',
      key: '',
      view: '',
      manage: '',
      eventName: '',
      place: '',
      timePerPerson: 10,
      startTime: '',
    },
    status: {
      start: false,
      end: false,
      waiting: false,
      current: {},
    },
    waitingList: [],
    interviewedList: [],
    unPresent: [],
  };

  const [appState, dispatch] = useReducer(userReducer, initialState);

  const initState = (newState) => {
    dispatch({ type: INIT_STATE, newState });
  };

  const setInfoEventname = (eventName) => {
    dispatch({ type: SET_INFO_EVENTNAME, eventName });
  };

  const setInfoPlace = (place) => {
    dispatch({ type: SET_INFO_PLACE, place });
  };

  const setInfoTimePerPerson = (timePerPerson) => {
    dispatch({ type: SET_INFO_TIMEPERPERSON, timePerPerson });
  };

  const setInfoStartTime = (startTime) => {
    dispatch({ type: SET_INFO_STARTTIME, startTime });
  };

  const setStatusStart = () => {
    dispatch({ type: SET_STATUS_START });
  };

  const setStatusEnd = () => {
    dispatch({ type: SET_STATUS_END });
  };

  const setStatusNext = () => {
    dispatch({ type: SET_STATUS_NEXT });
  };

  const setStatusPresent = () => {
    dispatch({ type: SET_STATUS_PRESENT });
  };

  const setStatusunPresent = () => {
    dispatch({ type: SET_STATUS_UNPRESENT });
  };

  const { children } = props;
  return (
    <context.Provider
      value={{
        appState,
        initState,
        setInfoEventname,
        setInfoPlace,
        setInfoTimePerPerson,
        setInfoStartTime,
        setStatusStart,
        setStatusEnd,
        setStatusNext,
        setStatusPresent,
        setStatusunPresent,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default GlobalState;
