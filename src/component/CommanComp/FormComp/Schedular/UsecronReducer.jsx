import { useReducer } from 'react';

// Define initial state
const initialState = {
  cronValue: '@daily', // default cron value
  inputValue: '',
  selectedPeriod: 'day', // default period
};

// Define action types
const SET_VALUES = 'SET_VALUES';
const SET_INPUT_VALUE = 'SET_INPUT_VALUE';
const SET_CRON_VALUE = 'SET_CRON_VALUE';

// Define the reducer function
function cronReducer(state, action) {
  switch (action.type) {
    case SET_VALUES:
      return {
        ...state,
        cronValue: action.value,
        selectedPeriod: action.selectedPeriod || state.selectedPeriod,
      };
    case SET_INPUT_VALUE:
      return {
        ...state,
        inputValue: action.value,
      };
    case SET_CRON_VALUE:
      return {
        ...state,
        cronValue: action.value,
      };
    default:
      return state;
  }
}

// Custom hook to use the cron reducer
function useCronReducer(initialCronValue = initialState.cronValue) {
  const [state, dispatch] = useReducer(cronReducer, {
    ...initialState,
    cronValue: initialCronValue,
  });

  const setValues = (value, selectedPeriod) => {
    dispatch({ type: SET_VALUES, value, selectedPeriod });
  };

  const setInputValue = (value) => {
    dispatch({ type: SET_INPUT_VALUE, value });
  };

  const setCronValue = (value) => {
    dispatch({ type: SET_CRON_VALUE, value });
  };

  return [
    state,
    {
      setValues,
      setInputValue,
      setCronValue,
    },
  ];
}

export default useCronReducer;

