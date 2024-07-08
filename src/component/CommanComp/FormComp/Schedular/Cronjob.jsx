import React, { useState, useMemo , useEffect} from 'react';
import {Cron } from 'react-js-cron';
import useCronReducer from './UsecronReducer'; // Import the custom hook

const FRENCH_LOCALE = {}; // Replace with actual locale data
const ENGLISH_VARIANT_LOCALE = {}; // Replace with actual locale data
const NO_PREFIX_SUFFIX_LOCALE = {}; // Replace with actual locale data

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

  useEffect(() => {
    setCroneValue(state.cronValue)
  },[state.cronValue])

  // console.log("state", state.cronValue)
//   const transformedLocale = useMemo(() => {
//     let newLocale;

//     switch (locale) {
//       case 'french':
//         newLocale = FRENCH_LOCALE;
//         break;
//       case 'english-variant':
//         newLocale = ENGLISH_VARIANT_LOCALE;
//         break;
//       default:
//         newLocale = {};
//         break;
//     }

//     if (removePrefixSuffix) {
//       newLocale = {
//         ...newLocale,
//         ...NO_PREFIX_SUFFIX_LOCALE,
//       };
//     }

//     return newLocale;
//   }, [locale, removePrefixSuffix]);

  return (
    <div>
      {/* <div>
        <p>Value: {state.cronValue}</p>
      </div> */}

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

// import React, { useState, useMemo } from 'react';
// import { TextInput, Switch, Radio, Select, Button, Divider,Box, Group,Form} from '@mantine/core'
// import {Cron } from 'react-js-cron';

// const FRENCH_LOCALE = {}; // Replace with actual locale data
// const ENGLISH_VARIANT_LOCALE = {}; // Replace with actual locale data
// const NO_PREFIX_SUFFIX_LOCALE = {}; // Replace with actual locale data

// function CronJobSettings() {
//     const [displayInput, setDisplayInput] = useState(true);
//     const [changeValueOnBlur, setChangeValueOnBlur] = useState(true);
//     const [changeValueOnEnter, setChangeValueOnEnter] = useState(true);
//     const [readOnlyInput, setReadOnlyInput] = useState(false);
//     const [disabled, setDisabled] = useState(false);
//     const [readOnly, setReadOnly] = useState(false);
//     const [humanizeLabels, setHumanizeLabels] = useState(true);
//     const [humanizeValue, setHumanizeValue] = useState(false);
//     const [displayErrorText, setDisplayErrorText] = useState(true);
//     const [displayErrorStyle, setDisplayErrorStyle] = useState(true);
//     const [displayClearButton, setDisplayClearButton] = useState(true);
//     const [supportShortcuts, setSupportShortcuts] = useState(true);
//     const [removePrefixSuffix, setRemovePrefixSuffix] = useState(false);
//     const [customStyle, setCustomStyle] = useState(false);
//     const [allowEmpty, setAllowEmpty] = useState('for-default-value');
//     const [clockFormat, setClockFormat] = useState('');
//     const [locale, setLocale] = useState('english');
//     const [defaultPeriod, setDefaultPeriod] = useState('day');
//     const [selectedPeriod, setSelectedPeriod] = useState('day');
//     const [defaultValue, setDefaultValue] = useState('@daily');
//     const [leadingZero, setLeadingZero] = useState(false);
//     const [periodicityOnDoubleClick, setPeriodicityOnDoubleClick] = useState(true);
//     const [mode, setMode] = useState('multiple');
//     const [key, setKey] = useState('render');
//     const [values, dispatchValues] = useCronReducer(defaultValue);
//     const [error, setError] = useState(null);
//     const [clearButtonAction, setClearButtonAction] = useState('fill-with-every');
  
//     const defaultAllowedDropdowns = ['period', 'months', 'month-days', 'week-days', 'hours', 'minutes'];
//     const [allowedDropdowns, setAllowedDropdowns] = useState(defaultAllowedDropdowns);
  
//     const defaultAllowedPeriods = ['year', 'month', 'week', 'day', 'hour', 'minute', 'reboot'];
//     const [allowedPeriods, setAllowedPeriods] = useState(defaultAllowedPeriods);
  
//     const transformedLocale = useMemo(() => {
//       let newLocale;
  
//       switch (locale) {
//         case 'french':
//           newLocale = FRENCH_LOCALE;
//           break;
//         case 'english-variant':
//           newLocale = ENGLISH_VARIANT_LOCALE;
//           break;
//         default:
//           newLocale = {};
//           break;
//       }
  
//       if (removePrefixSuffix) {
//         newLocale = {
//           ...newLocale,
//           ...NO_PREFIX_SUFFIX_LOCALE,
//         };
//       }
  
//       return newLocale;
//     }, [locale, removePrefixSuffix]);
  
//     return (
//       <div>
//         <Form layout='inline' className='demo-dynamic-settings'>
//           <Form.Item label='Display input'>
//             <Switch checked={displayInput} onChange={() => setDisplayInput((prevValue) => !prevValue)} />
//           </Form.Item>
//           <Form.Item label='Change input value on blur'>
//             <Switch checked={changeValueOnBlur} onChange={() => setChangeValueOnBlur((prevValue) => !prevValue)} />
//           </Form.Item>
//           <Form.Item label='Change input value on enter'>
//             <Switch checked={changeValueOnEnter} onChange={() => setChangeValueOnEnter((prevValue) => !prevValue)} />
//           </Form.Item>
//           <Form.Item label='Read-Only input'>
//             <Switch checked={readOnlyInput} onChange={() => setReadOnlyInput((prevValue) => !prevValue)} />
//           </Form.Item>
//           <Form.Item label='Disabled'>
//             <Switch checked={disabled} onChange={() => setDisabled((prevValue) => !prevValue)} />
//           </Form.Item>
//           <Form.Item label='Read-Only'>
//             <Switch checked={readOnly} onChange={() => setReadOnly((prevValue) => !prevValue)} />
//           </Form.Item>
//           <Form.Item label='Humainze labels'>
//             <Switch checked={humanizeLabels} onChange={() => setHumanizeLabels((prevValue) => !prevValue)} />
//           </Form.Item>
//           <Form.Item label='Humanize value'>
//             <Switch checked={humanizeValue} onChange={() => setHumanizeValue((prevValue) => !prevValue)} />
//           </Form.Item>
//           <Form.Item label='Display error text'>
//             <Switch checked={displayErrorText} onChange={() => setDisplayErrorText((prevValue) => !prevValue)} />
//           </Form.Item>
//           <Form.Item label='Display error style'>
//             <Switch checked={displayErrorStyle} onChange={() => setDisplayErrorStyle((prevValue) => !prevValue)} />
//           </Form.Item>
//           <Form.Item label='Display clear button'>
//             <Switch checked={displayClearButton} onChange={() => setDisplayClearButton((prevValue) => !prevValue)} />
//           </Form.Item>
//           <Form.Item label='Support shortcuts'>
//             <Switch checked={supportShortcuts} onChange={() => setSupportShortcuts((prevValue) => !prevValue)} />
//           </Form.Item>
//           <Form.Item label='Remove prefix/suffix'>
//             <Switch checked={removePrefixSuffix} onChange={() => setRemovePrefixSuffix((prevValue) => !prevValue)} />
//           </Form.Item>
//           <Form.Item label='Set custom style'>
//             <Switch checked={customStyle} onChange={() => setCustomStyle((prevValue) => !prevValue)} />
//           </Form.Item>
//           <Form.Item label='Leading zero'>
//             <Switch checked={leadingZero} onChange={() => setLeadingZero((prevValue) => !prevValue)} />
//           </Form.Item>
//           <Form.Item label='Periodicity on double click'>
//             <Switch checked={periodicityOnDoubleClick} onChange={() => setPeriodicityOnDoubleClick((prevValue) => !prevValue)} />
//           </Form.Item>
//           <Form.Item label='Clock format'>
//             <Radio.Group value={clockFormat} onChange={(e) => setClockFormat(e.target.value)}>
//               <Radio value=''>None</Radio>
//               <Radio value='12-hour-clock'>12-hour clock</Radio>
//               <Radio value='24-hour-clock'>24-hour clock</Radio>
//             </Radio.Group>
//           </Form.Item>
//           <Form.Item label='Mode'>
//             <Radio.Group value={mode} onChange={(e) => setMode(e.target.value)}>
//               <Radio value='single'>Single</Radio>
//               <Radio value='multiple'>Multiple</Radio>
//             </Radio.Group>
//           </Form.Item>
//           <Form.Item label='Allowed dropdowns'>
//             <Select
//               multiple
//               value={allowedDropdowns}
//               onChange={(value) => setAllowedDropdowns(value)}
//               style={{ minWidth: 535 }}
//             >
//               {defaultAllowedDropdowns.map((allowedDropdown) => (
//                 <option key={allowedDropdown} value={allowedDropdown}>
//                   {allowedDropdown}
//                 </option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item label='Allowed periods'>
//             <Select
//               multiple
//               value={allowedPeriods}
//               onChange={(value) => setAllowedPeriods(value)}
//               style={{ minWidth: 485 }}
//             >
//               {defaultAllowedPeriods.map((allowedPeriod) => (
//                 <option key={allowedPeriod} value={allowedPeriod}>
//                   {allowedPeriod}
//                 </option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item label='Locale'>
//             <Radio.Group value={locale} onChange={(e) => setLocale(e.target.value)}>
//               <Radio value='english'>English</Radio>
//               <Radio value='french'>French</Radio>
//               <Radio value='english-variant'>English variant</Radio>
//             </Radio.Group>
//           </Form.Item>
//           <Form.Item label='Clear button action'>
//             <Radio.Group value={clearButtonAction} onChange={(e) => setClearButtonAction(e.target.value)}>
//               <Radio value='empty'>Empty</Radio>
//               <Radio value='fill-with-every'>Fill with every</Radio>
//             </Radio.Group>
//           </Form.Item>
//           <Form.Item label='Empty value management *'>
//             <Radio.Group value={allowEmpty} onChange={(e) => setAllowEmpty(e.target.value)}>
//               <Radio value='for-default-value'>For default value</Radio>
//               <Radio value='always'>Always</Radio>
//               <Radio value='never'>Never</Radio>
//             </Radio.Group>
//           </Form.Item>
//           <Form.Item label='Default value *'>
//             <TextInput
//               value={defaultValue}
//               onChange={(e) => setDefaultValue(e.target.value)}
//             />
//           </Form.Item>
//           <Form.Item label='Default period **'>
//             <Radio.Group value={defaultPeriod} onChange={(e) => setDefaultPeriod(e.target.value)}>
//               <Radio value='year'>Year</Radio>
//               <Radio value='month'>Month</Radio>
//               <Radio value='week'>Week</Radio>
//               <Radio value='day'>Day</Radio>
//               <Radio value='hour'>Hour</Radio>
//               <Radio value='minute'>Minute</Radio>
//               <Radio value='reboot'>Reboot</Radio>
//             </Radio.Group>
//           </Form.Item>
//           <p>(*) Need to reset the component to see the changes</p>
//           <p>
//             (**) Need to reset the component and to have an empty default value to
//             see the changes
//           </p>
//         </Form>
  
//         <div>
//           <p>Value: {values.cronValue}</p>
  
//           <Button
//             type='primary'
//             onClick={() => {
//               dispatchValues({
//                 type: 'set_values',
//                 value: defaultValue,
//               });
//               setKey(Math.random().toString(36).substring(7));
//               setSelectedPeriod(defaultPeriod);
//             }}
//           >
//             Reset cron component
//           </Button>
//         </div>
  
//         {displayInput && (
//           <>
//             <TextInput
//               readOnly={readOnlyInput || mode === 'single'}
//               value={values.inputValue}
//               onChange={(event) => {
//                 dispatchValues({
//                   type: 'set_input_value',
//                   value: event.target.value,
//                 });
//               }}
//               onBlur={() => {
//                 changeValueOnBlur &&
//                   dispatchValues({
//                     type: 'set_cron_value',
//                     value: values.inputValue,
//                   });
//               }}
//               onKeyPress={(event) => {
//                 if (event.key === 'Enter') {
//                   changeValueOnEnter &&
//                     dispatchValues({
//                       type: 'set_cron_value',
//                       value: values.inputValue,
//                     });
//                 }
//               }}
//             />
  
//             <Divider>OR</Divider>
//           </>
//         )}
  
//         <Cron
//           key={key}
//           value={values.cronValue}
//           setValue={(newValue, { selectedPeriod }) => {
//             dispatchValues({
//               type: 'set_values',
//               value: newValue,
//             });
//             setSelectedPeriod(selectedPeriod);
//           }}
//           onError={setError}
//           disabled={disabled}
//           readOnly={readOnly}
//           humanizeLabels={humanizeLabels}
//           humanizeValue={humanizeValue}
//           displayError={displayErrorStyle}
//           clearButton={displayClearButton}
//           clearButtonAction={clearButtonAction}
//           shortcuts={supportShortcuts}
//           allowEmpty={allowEmpty}
//           clockFormat={clockFormat === '' ? undefined : clockFormat}
//           defaultPeriod={defaultPeriod}
//           leadingZero={leadingZero}
//           className={customStyle ? 'my-project-cron' : undefined}
//           periodicityOnDoubleClick={periodicityOnDoubleClick}
//           mode={mode}
//           allowedDropdowns={allowedDropdowns}
//           allowedPeriods={allowedPeriods}
//           locale={transformedLocale}
//           clearButtonProps={
//             customStyle
//               ? {
//                   type: 'default',
//                 }
//               : undefined
//           }
//         />
  
//         <p style={{ marginTop: 20 }}>Selected period: {selectedPeriod}</p>
//         {displayErrorText && (
//           <p style={{ marginTop: 20 }}>
//             Error: {error ? error.description : 'undefined'}
//           </p>
//         )}
//       </div>
//     );
//   }
  
//   export default CronJobSettings;

