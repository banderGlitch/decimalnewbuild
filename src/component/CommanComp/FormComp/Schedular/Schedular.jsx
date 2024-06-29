import React, { useState, useEffect } from 'react'
import './Schedular.css';
import { useSpring, animated } from '@react-spring/web';
import { Slider, Text, Box } from '@mantine/core';
import { useForm } from "@mantine/form";
import ToggleButtons from '../../../ToggleButton/ToggleButton';
export const Schedular = ({
    roleType_1,
    roleType_2,
    steps,
    currentStep,
    handleNext,
    handlePrevious,
    propertyDetails,
    setPropertyDetails,
    isStepValid,
    setIsStepValid
}) => {

    const initialMarksType = () => {
        switch (propertyDetails.timeType) {
            case 'min': return 'marks';
            case 'hr': return 'hrmarks';
            case '1 Day': return 'daymarks';
            default: return 'continues';
        }
    };

    const form = useForm({
        initialValues: {
            timeType: propertyDetails.timeType || 'sec',
            time: propertyDetails.timer || 0,
        },
    });


    const { timeType, timer } = form.values


    const [sliderValue, setSliderValue] = useState(propertyDetails.timer || 0);
    console.log("sliderValue------------------>", sliderValue)
    // const [sliderValue, setSliderValue] = useState(timer);
  
    // const [sliderValue, setSliderValue] = useState(0);

    const [activeButton, set_ActiveButton] = useState(roleType_1);
    const [currentMarks, setCurrentMarks] = useState(initialMarksType());
    // const [currentMarks, setCurrentMarks] = useState('continues');
    const [sliderMarks, setSliderMarks] = useState([]);

    // const [sliderMarks, setSliderMarks] = useState([
    //     { value: 0, label: '0s' },
    //     // { value: 5, label: '5s' },
    //     // { value: 10, label: '10s' },
    //     { value: 15, label: '15s' },
    //     // { value: 20, label: '20s' },
    //     // { value: 25, label: '25s' },
    //     { value: 30, label: '30s' },
    //     // { value: 35, label: '35s' },
    //     // { value: 40, label: '40s' },
    //     { value: 45, label: '45s' },
    //     // { value: 50, label: '50s' },
    //     // { value: 55, label: '55s' },
    //     { value: 60, label: '60s' },
    // ]);

    const styles = useSpring({
        from: { maxHeight: 0, opacity: 0 },
        to: { maxHeight: 500, opacity: 1 },
        config: { tension: 200, friction: 20 },
        overflow: 'hidden',
    });

    useEffect(() => {
        handleMarksChange(initialMarksType());
    }, []);

    // useEffect(() => {
    //     setSliderValue(propertyDetails.timer || 0);
    //     handleMarksChange(initialMarksType());
    // }, [propertyDetails]);


    const marks = [
        { value: 0, label: '0s' },
        // { value: 5, label: '5s' },
        // { value: 10, label: '10s' },
        { value: 15, label: '15s' },
        // { value: 20, label: '20s' },
        // { value: 25, label: '25s' },
        { value: 30, label: '30s' },
        // { value: 35, label: '35s' },
        // { value: 40, label: '40s' },
        { value: 45, label: '45s' },
        // { value: 50, label: '50s' },
        // { value: 55, label: '55s' },
        { value: 60, label: '60s' },
    ];
    const hrmarks = [
        { value: 0, label: '0m' },
        // { value: 5, label: '5m' },
        // { value: 10, label: '10m' },
        { value: 15, label: '15m' },
        // { value: 20, label: '20m' },
        // { value: 25, label: '25m' },
        { value: 30, label: '30m' },
        // { value: 35, label: '35m' },
        // { value: 40, label: '40m' },
        { value: 45, label: '45m' },
        // { value: 50, label: '50m' },
        // { value: 55, label: '55m' },
        { value: 60, label: '60m' },
    ];

    const daymarks = [
        { value: 0, label: '0h' },
        // { value: 2, label: '2h' },
        // { value: 4, label: '4h' },
        { value: 8, label: '8h' },
        // { value: 10, label: '10h' },
        // { value: 12, label: '12h' },
        // { value: 14, label: '14h' },
        { value: 16, label: '16h' },
        // { value: 18, label: '18h' },
        // { value: 20, label: '20h' },
        // { value: 22, label: '22h' },
        { value: 24, label: '24h' },
    ];




    const handleSliderChange = (value) => {
        setSliderValue(value);
        form.setFieldValue('timer', value);
        // sliderAnimation.value.start(value); 
    };


    const handleMarksChange = (type) => {
        setCurrentMarks(type);
        switch (type) {
            case 'marks':
                setSliderMarks(marks);
                form.setFieldValue('timeType', "min");
                break;
            case 'hrmarks':
                setSliderMarks(hrmarks);
                form.setFieldValue('timeType', "hr");
                break;
            case 'daymarks':
                setSliderMarks(daymarks);
                form.setFieldValue('timeType', "1 Day");
                break;
            case 'continues':
                setSliderMarks([]);
                form.setFieldValue('timeType', "sec");
                break;
            default:
                form.setFieldValue('timeType', "sec");
                setSliderMarks(marks);
        }
    };

    const getMaxSliderValue = () => {
        if (sliderMarks.length === 0) return 0;
        return sliderMarks[sliderMarks.length - 1].value;
    };


    // const sliderAnimation = useSpring({
    //     value: sliderValue,
    //     onChange: (value) => setSliderValue(value),
    //     config: { tension: 170, friction: 26 }
    // });


    const TimeType = (sliderMarks) => {
        if (sliderMarks === "marks") {
            return "1 Min"
        } else if (sliderMarks === "hrmarks") {
            return "1 Hour"
        } else if (sliderMarks === "daymarks") {
            return "1 Day"
        }
    }

    const handleSubmit = () => {
        console.log("handleSubmit was called!!!!")
        // Stepper Logic 
        const timerValue = timer === undefined ? 0 : timer;
        setPropertyDetails((prev) => ({ ...prev,  timer: timerValue , timeType: form.values.timeType }))
        // Stepper Logic 
        const isValid = true;
        const updatedValidation = [...isStepValid];
        console.log("currentStep", currentStep - 1)
        updatedValidation[currentStep - 1] = isValid;
        console.log("updatedValidation", updatedValidation[currentStep - 1])
        console.log("updatedValidation", updatedValidation)
        setIsStepValid(updatedValidation);
        handleNext()
    }


 



    // const { timeType, timer } = form.values


    // const handleSubmit = () => {

    //         setPropertyDetails((prev) => ({ ...prev, gitUrl, 
    //             header: {
    //                 key: headerKey,
    //                 value: headerValue,
    //             },
    //             // headerKey, headerKey, description, price 
    //         }))
    //         // Stepper Logic 
    //         const isValid = true; 
    //         const updatedValidation = [...isStepValid];
    //         updatedValidation[currentStep-1] = isValid;
    //         setIsStepValid(updatedValidation);
    //         handleNext()
    // }



    return (
        <animated.div style={styles}>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div className="flexColStart schedular-wrapper">
                    <Box style={{ display: "flex", fontSize: "150%", fontWeight: "bold" }}>Schedular</Box>
                    <span>Specify the trigger conditions as when to run job</span>
                    <div style={{ padding: '15px' }} className='flexColStart'>
                        <ToggleButtons disabled={true} roleType_1={roleType_1} roleType_2={roleType_2} activeButton={activeButton} setActiveButton={set_ActiveButton} />
                        <div style={{ marginTop: "20px", padding: '15px', gap: '10px', display: 'flex', justifyContent: 'center' }} className='flexRowStart'>
                            <button
                                type="button"
                                className={currentMarks === 'continues' ? 'button-active' : 'button-inactive'} 
                                onClick={() => handleMarksChange('continues')}
                               
                            >Continuous
                            </button>
                            <button
                                type="button"
                                className={currentMarks === 'marks' ? 'button-active' : 'button-inactive'}
                                onClick={() => handleMarksChange('marks')}
                                {...form.getInputProps("timeType")}
                            >Min
                            </button>
                            <button
                                type="button"
                                className={currentMarks === 'hrmarks' ? 'button-active' : 'button-inactive'}
                                onClick={() => handleMarksChange('hrmarks')}
                            >Hrs
                            </button>
                            <button
                                type="button"
                                className={currentMarks === 'daymarks' ? 'button-active' : 'button-inactive'}
                                onClick={() => handleMarksChange('daymarks')}
                            >
                                In a Day
                            </button>
                        </div>

                        <div style={{ padding: '25px', gap: '12px' }} className='flexColStart'>
                            <Text c="#888ca9" mt="md">Every {TimeType(currentMarks)}</Text>

                            {currentMarks === 'continues' ? (
                                <Text style={{ fontSize: "80%" }} c="#888ca9">Every 1 seconds </Text>
                            ) : (
                                <Slider
                                    min={0}
                                    defaultValue={sliderValue}
                                    max={getMaxSliderValue()}
                                    style={{ width: "400px" }}
                                    // defaultValue={sliderValue}
                                    // value={sliderValue}
                                    onChange={handleSliderChange}
                                    label={(val) => {
                                        const mark = sliderMarks.find((mark) => mark.value === val);
                                        return mark ? mark.label : '';
                                    }}
                                    {...form.getInputProps("timer")}
                                    // step={15}
                                    step={currentMarks === 'daymarks' ? 8 : 15}
                                    marks={sliderMarks}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className="step-navigation ">
                    {currentStep !== 1 &&
                        <button className='button' onClick={handlePrevious}>
                            Previous
                        </button>}

                    <button type="submit" className='button'
                        // onClick={handleSubmit}
                        disabled={currentStep === steps.length}>
                        Next
                    </button>
                </div>
            </form>


        </animated.div>
    )


    // return (
    //     <animated.div style={styles}>
    //         <div className="flexColStart schedular-wrapper">
    //         <Box style={{ display: "flex", fontSize: "150%", fontWeight: "bold" }}>Schedular</Box>
    //             <span>Specify the trigger conditions as when to run job</span>
    //             <div style={{ padding: '15px' }} className='flexColStart'>
    //                 <ToggleButtons disabled={true} roleType_1={roleType_1} roleType_2={roleType_2} activeButton={activeButton} setActiveButton={set_ActiveButton} />
    //                 <div style={{ marginTop: "20px", padding: '15px', gap: '10px', display: 'flex', justifyContent: 'center' }} className='flexRowStart'>
    //                     <button
    //                         className={currentMarks === 'continues' ? 'button-active' : 'button-inactive'}
    //                         //    className='button' 
    //                         onClick={() => handleMarksChange('continues')}
    //                     >Continuous
    //                     </button>
    //                     <button
    //                         // className='button' 
    //                         className={currentMarks === 'marks' ? 'button-active' : 'button-inactive'}
    //                         onClick={() => handleMarksChange('marks')}
    //                     >Min
    //                     </button>
    //                     <button
    //                         //   className='button' 
    //                         className={currentMarks === 'hrmarks' ? 'button-active' : 'button-inactive'}
    //                         onClick={() => handleMarksChange('hrmarks')}
    //                     >Hrs
    //                     </button>
    //                     <button
    //                         className={currentMarks === 'daymarks' ? 'button-active' : 'button-inactive'}
    //                         // className='button' 
    //                         onClick={() => handleMarksChange('daymarks')}>
    //                         In a Day
    //                     </button>
    //                 </div>

    //                 <div style={{ padding: '25px', gap: '12px' }} className='flexColStart'>
    //                     <Text c="#888ca9" mt="md">Every {TimeType(currentMarks)}</Text>

    //                     {currentMarks === 'continues' ? (
    //                         <Text style={{ fontSize: "80%" }} c="#888ca9">Every 1 seconds </Text>
    //                     ) : (
    //                         <Slider
    //                             min={0}
    //                             max={getMaxSliderValue()}
    //                             style={{ width: "400px" }}
    //                             // value={sliderValue}
    //                             onChange={handleSliderChange}
    //                             label={(val) => {
    //                                 const mark = sliderMarks.find((mark) => mark.value === val);
    //                                 return mark ? mark.label : '';
    //                             }}
    //                             // step={15}
    //                             step={currentMarks === 'daymarks' ? 8 : 15}
    //                             marks={sliderMarks}
    //                         />
    //                     )}
    //                 </div>
    //             </div>

    //         </div>
    //         <div className="step-navigation ">
    //             {currentStep !== 1 &&
    //                 <button className='button' onClick={handlePrevious}>
    //                     Previous
    //                 </button>}

    //             <button className='button'
    //              onClick={handleSubmit} 
    //              disabled={currentStep === steps.length}>
    //                 Next
    //             </button>
    //         </div>


    //     </animated.div>
    // )
}
// import React, { useState, useEffect } from 'react'
// import './Schedular.css';
// import { useSpring, animated } from '@react-spring/web';
// import { Slider, Text } from '@mantine/core';
// import ToggleButtons from '../../../ToggleButton/ToggleButton';
// export const Schedular = ({
//     roleType_1,
//     roleType_2 ,
//     steps ,
//     currentStep,
//     handleNext,
//     handlePrevious,
//     propertyDetails,
//     setPropertyDetails
// }) => {
//     const [sliderValue, setSliderValue] = useState(0);

//     const [activeButton, set_ActiveButton] = useState(roleType_1);
//     const styles = useSpring({
//         from: { maxHeight: 0, opacity: 0 },
//         to: { maxHeight: 500, opacity: 1 },
//         config: { tension: 200, friction: 20 },
//         overflow: 'hidden',
//     });

//     const marks = [
//         { value: 0, label: '0s' },
//         { value: 5, label: '5s' },
//         { value: 10, label: '10s' },
//         { value: 15, label: '15s' },
//         { value: 20, label: '20s' },
//         { value: 25, label: '25s' },
//         { value: 30, label: '30s' },
//         { value: 35, label: '35s' },
//         { value: 40, label: '40s' },
//         { value: 45, label: '45s' },
//         { value: 50, label: '50s' },
//         { value: 55, label: '55s' },
//         { value: 60, label: '60s' },
//     ];


//     const handleSliderChange = (value) => {
//         setSliderValue(value);
//       };


//     return (
//         <animated.div style={styles}>
//             <div className="flexColStart schedular-wrapper">
//                 <span>Specify the trigger conditions as when to run job</span>
//                 <div style={{ padding: '15px' }} className='flexColStart'>
//                     <ToggleButtons disabled={true} roleType_1={roleType_1} roleType_2={roleType_2} activeButton={activeButton} setActiveButton={set_ActiveButton} />
//                     <div style={{ padding: '25px', gap: '12px' }} className='flexColStart'>
//                         <Text c="#888ca9" mt="md">Every</Text>
//                         <Slider
//                             min={0}
//                             max={60}
//                             style={{ width: "400px" }}
//                             value={sliderValue}
//                             // defaultValue={0}
//                             onChange={handleSliderChange}
//                             label={(val) => {
//                                 const mark = marks.find((mark) => mark.value === val);
//                                 return mark ? mark.label : '';
//                             }}
//                             step={5}
//                             marks={marks}
//                         // styles={{ markLabel: { display: '' } }}
//                         />
//                     </div>

//                 </div>

//             </div>
//             <div className="step-navigation ">
//                 {currentStep !== 1 &&
//                     <button className='button' onClick={handlePrevious}>
//                         Previous
//                     </button>}

//                 <button className='button' onClick={handleNext} disabled={currentStep === steps.length}>
//                     Next
//                 </button>
//             </div>


//         </animated.div>
//     )
// }