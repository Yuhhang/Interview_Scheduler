/* eslint-disable prefer-destructuring */
export const INIT_STATE = 'INIT_STATE';
export const SET_INFO_EVENTNAME = 'SET_INFO_EVENTNAME';
export const SET_INFO_PLACE = 'SET_INFO_PLACE';
export const SET_INFO_TIMEPERPERSON = 'SET_INFO_TIMEPERPERSON';
export const SET_INFO_STARTTIME = 'SET_INFO_STARTTIME';
export const SET_STATUS_START = 'SET_STATUS_START';
export const SET_STATUS_END = 'SET_STATUS_END';
export const SET_STATUS_NEXT = 'SET_STATUS_NEXT';
export const SET_STATUS_PRESENT = 'SET_STATUS_PRESENT';
export const SET_STATUS_UNPRESENT = 'SET_STATUS_UNPRESENT';

const setInfoEventname = (state, eventName) => ({
  ...state,
  info: {
    ...state.info,
    eventName,
  },
});

const setInfoPlace = (state, place) => ({
  ...state,
  info: {
    ...state.info,
    place,
  },
});

const setInfoTimePerPerson = (state, timePerPerson) => ({
  ...state,
  info: {
    ...state.info,
    timePerPerson,
  },
});

const setInfoStartTime = (state, startTime) => ({
  ...state,
  info: {
    ...state.info,
    startTime,
  },
});

const setStatusStart = (state) => {
  const nextPerson = state.waitingList.shift();
  return ({
    ...state,
    status: {
      ...state.status,
      start: true,
      waiting: true,
      current: nextPerson,
    },
  });
};

const setStatusEnd = (state) => {
  const current = state.status.current;
  state.interviewedList.unshift(current);

  return ({
    ...state,
    status: {
      ...state.status,
      waiting: false,
      start: false,
      end: true,
    },
    // interviewedList,
  });
};

const setStatusNext = (state) => {
  const current = state.status.current;
  state.interviewedList.unshift(current);
  const nextPerson = state.waitingList.shift();

  return ({
    ...state,
    status: {
      ...state.status,
      waiting: true,
      current: nextPerson,
    },
    // interviewedList: state.interviewedList,
  });
};

const setStatusPresent = (state) => ({
  ...state,
  status: {
    ...state.status,
    waiting: false,
  },
});

const setStatusunPresent = (state) => {
  const current = state.status.current;
  state.unPresent.unshift(current);
  const nextPerson = state.waitingList.shift();

  return ({
    ...state,
    status: {
      ...state.status,
      waiting: true,
      current: nextPerson,
    },
    // unPresent,
  });
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case INIT_STATE:
      return action.newState;
    case SET_INFO_EVENTNAME:
      return setInfoEventname(state, action.eventName);
    case SET_INFO_PLACE:
      return setInfoPlace(state, action.place);
    case SET_INFO_TIMEPERPERSON:
      return setInfoTimePerPerson(state, action.timePerPerson);
    case SET_INFO_STARTTIME:
      return setInfoStartTime(state, action.startTime);
    case SET_STATUS_START:
      return setStatusStart(state);
    case SET_STATUS_END:
      return setStatusEnd(state);
    case SET_STATUS_NEXT:
      return setStatusNext(state);
    case SET_STATUS_PRESENT:
      return setStatusPresent(state);
    case SET_STATUS_UNPRESENT:
      return setStatusunPresent(state);
    default:
      return state;
  }
};
