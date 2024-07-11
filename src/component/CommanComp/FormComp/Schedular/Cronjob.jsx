import React, { useState, useMemo , useEffect} from 'react';
import {Cron } from 'react-js-cron';
import useCronReducer from './UsecronReducer'; // Import the custom hook
import { useDispatch } from 'react-redux';
import { updateTimerValue } from '../../../../redux/formSlice';


function CronSettings({setCroneValue, defaultCronValue}) {
  const [displayInput, setDisplayInput] = useState(true);
  const [changeValueOnBlur, setChangeValueOnBlur] = useState(true);
  const [changeValueOnEnter, setChangeValueOnEnter] = useState(true);
  const [readOnlyInput, setReadOnlyInput] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [humanizeLabels, setHumanizeLabels] = useState(true);
  const [humanizeValue, setHumanizeValue] = useState(false);
  const [displayErrorText, setDisplayErrorText] = useState(true);
  const [displayErrorStyle, setDisplayErrorStyle] = useState(true);
  const [displayClearButton, setDisplayClearButton] = useState(true);
  const [supportShortcuts, setSupportShortcuts] = useState(true);
  const [removePrefixSuffix, setRemovePrefixSuffix] = useState(false);
  const [customStyle, setCustomStyle] = useState(false);
  const [allowEmpty, setAllowEmpty] = useState('for-default-value');
  const [clockFormat, setClockFormat] = useState('');
  const [locale, setLocale] = useState('english');
  const [defaultPeriod, setDefaultPeriod] = useState('day');
  const [selectedPeriod, setSelectedPeriod] = useState('day');
  const [defaultValue, setDefaultValue] = useState('@daily');
  const [leadingZero, setLeadingZero] = useState(false);
  const [periodicityOnDoubleClick, setPeriodicityOnDoubleClick] = useState(true);
  const [mode, setMode] = useState('multiple');
  const [key, setKey] = useState('render');
  const [state, { setValues, setInputValue, setCronValue }] = useCronReducer(defaultValue);
  const [error, setError] = useState(null);
  const [clearButtonAction, setClearButtonAction] = useState('fill-with-every');

  const defaultAllowedDropdowns = ['period', 'months', 'month-days', 'week-days', 'hours', 'minutes'];
  const [allowedDropdowns, setAllowedDropdowns] = useState(defaultAllowedDropdowns);

  const defaultAllowedPeriods = ['year', 'month', 'week', 'day', 'hour', 'minute'];
  const [allowedPeriods, setAllowedPeriods] = useState(defaultAllowedPeriods);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateTimerValue(state.cronValue))
    setCroneValue(state.cronValue)
  },[state.cronValue])


  return (
    <div>
  
      <Cron
        key={key}
        // defaultValue = {defaultCronValue}
        value = {defaultCronValue}
        // value={state.cronValue}
        setValue={(newValue, { selectedPeriod }) => {
          setValues(newValue, selectedPeriod);
        }}
        onError={setError}
        disabled={disabled}
        readOnly={readOnly}
        humanizeLabels={humanizeLabels}
        humanizeValue={humanizeValue}
        displayError={displayErrorStyle}
        clearButton={displayClearButton}
        clearButtonAction={clearButtonAction}
        shortcuts={supportShortcuts}
        allowEmpty={allowEmpty}
        clockFormat={clockFormat === '' ? undefined : clockFormat}
        defaultPeriod={defaultPeriod}
        leadingZero={leadingZero}
        className={customStyle ? 'my-project-cron' : undefined}
        periodicityOnDoubleClick={periodicityOnDoubleClick}
        mode={mode}
        everyText ={true}
        allowedDropdowns={allowedDropdowns}
        allowedPeriods={allowedPeriods}
        // locale={transformedLocale}
        clearButtonProps={
          customStyle
            ? {
                type: 'default',
              }
            : undefined
        }
      />
    </div>
  );
}

export default CronSettings;
