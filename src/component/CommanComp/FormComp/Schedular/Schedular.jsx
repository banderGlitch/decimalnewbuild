import React, { useState, useEffect } from 'react'
import './Schedular.css';
import { useSpring, animated } from '@react-spring/web';
import { Slider, Text } from '@mantine/core';
import ToggleButtons from '../../../ToggleButton/ToggleButton';
export const Schedular = ({ 
    roleType_1, 
    roleType_2 ,
    steps ,
    currentStep,
    handleNext,
    handlePrevious, 
    propertyDetails, 
    setPropertyDetails
}) => {

    const [sliderValue, setSliderValue] = useState(0);

    const [activeButton, set_ActiveButton] = useState(roleType_1);
    const [currentMarks, setCurrentMarks] = useState('marks');
    const [sliderMarks, setSliderMarks] = useState([
        { value: 0, label: '0s' },
        { value: 5, label: '5s' },
        { value: 10, label: '10s' },
        { value: 15, label: '15s' },
        { value: 20, label: '20s' },
        { value: 25, label: '25s' },
        { value: 30, label: '30s' },
        { value: 35, label: '35s' },
        { value: 40, label: '40s' },
        { value: 45, label: '45s' },
        { value: 50, label: '50s' },
        { value: 55, label: '55s' },
        { value: 60, label: '60s' },
    ]);

    const styles = useSpring({
        from: { maxHeight: 0, opacity: 0 },
        to: { maxHeight: 500, opacity: 1 },
        config: { tension: 200, friction: 20 },
        overflow: 'hidden',
    });

    const marks = [
        { value: 0, label: '0s' },
        { value: 5, label: '5s' },
        { value: 10, label: '10s' },
        { value: 15, label: '15s' },
        { value: 20, label: '20s' },
        { value: 25, label: '25s' },
        { value: 30, label: '30s' },
        { value: 35, label: '35s' },
        { value: 40, label: '40s' },
        { value: 45, label: '45s' },
        { value: 50, label: '50s' },
        { value: 55, label: '55s' },
        { value: 60, label: '60s' },
    ];
    const hrmarks = [
        { value: 0, label: '0m' },
        { value: 5, label: '5m' },
        { value: 10, label: '10m' },
        { value: 15, label: '15m' },
        { value: 20, label: '20m' },
        { value: 25, label: '25m' },
        { value: 30, label: '30m' },
        { value: 35, label: '35m' },
        { value: 40, label: '40m' },
        { value: 45, label: '45m' },
        { value: 50, label: '50m' },
        { value: 55, label: '55m' },
        { value: 60, label: '60m' },
    ];

    const daymarks = [
        { value: 0, label: '0h' },
        { value: 2, label: '2h' },
        { value: 4, label: '4h' },
        { value: 8, label: '8h' },
        { value: 10, label: '10h' },
        { value: 12, label: '12h' },
        { value: 14, label: '14h' },
        { value: 16, label: '16h' },
        { value: 18, label: '18h' },
        { value: 20, label: '20h' },
        { value: 22, label: '22h' },
        { value: 24, label: '24h' },
    ];




    const handleSliderChange = (value) => {
        setSliderValue(value);
        // sliderAnimation.value.start(value); 
      };


      const handleMarksChange = (type) => {
        setCurrentMarks(type);
        switch (type) {
            case 'marks':
                setSliderMarks(marks);
                break;
            case 'hrmarks':
                setSliderMarks(hrmarks);
                break;
            case 'daymarks':
                setSliderMarks(daymarks);
                break;
            case 'continues':
                setSliderMarks([]);
                break;
            default:
                setSliderMarks(marks);
        }
    };

    const getMaxSliderValue = () => {
        if (sliderMarks.length === 0) return 0;
        return sliderMarks[sliderMarks.length - 1].value;
    };


    const sliderAnimation = useSpring({
        value: sliderValue,
        onChange: (value) => setSliderValue(value),
        config: { tension: 170, friction: 26 }
      });



    return (
        <animated.div style={styles}>
            <div className="flexColStart schedular-wrapper">
                <span>Specify the trigger conditions as when to run job</span>
                <div style={{ padding: '15px' }} className='flexColStart'>
                    <ToggleButtons disabled={true} roleType_1={roleType_1} roleType_2={roleType_2} activeButton={activeButton} setActiveButton={set_ActiveButton} />
                    <div style={{ padding: '25px', gap: '12px' }} className='flexColStart'>
                        <Text c="#888ca9" mt="md">Every</Text>

                        {currentMarks === 'continues' ? (
                            <Text style={{fontSize:"80%"}} c="#888ca9">Every 1 seconds </Text>
                        ) : (
                            <Slider
                                min={0}
                                max={getMaxSliderValue()}
                                style={{ width: "400px" }}
                                // value={sliderValue}
                                onChange={handleSliderChange}
                                label={(val) => {
                                    const mark = sliderMarks.find((mark) => mark.value === val);
                                    return mark ? mark.label : '';
                                }}
                                step={currentMarks === 'daymarks' ? 2: 5}
                                marks={sliderMarks}
                            />
                        )}

                    {/*                         
                        <Slider
                            min={0}
                            max={60}
                            style={{ width: "400px" }}
                            value={sliderValue}
                            // defaultValue={0}
                            onChange={handleSliderChange}
                            label={(val) => {
                                const mark = marks.find((mark) => mark.value === val);
                                return mark ? mark.label : '';
                            }}
                            step={5}
                            marks={marks}
                        // styles={{ markLabel: { display: '' } }}
                        /> */}
                    </div>
                    <div style={{ padding: '15px', gap: '10px' ,display:'flex', justifyContent:'center' }} className='flexRowStart'>
                        <button 
                          className={currentMarks === 'continues' ? 'button' : 'button-inactive'}
                        //    className='button' 
                           onClick={() => handleMarksChange('continues')}
                           >continuous
                           </button>
                        <button 
                            // className='button' 
                            className={currentMarks === 'marks' ? 'button' : 'button-inactive'}
                            onClick={() => handleMarksChange('marks')}
                            >Min
                            </button>
                        <button 
                        //   className='button' 
                        className={currentMarks === 'hrmarks' ? 'button' : 'button-inactive'}
                          onClick={() => handleMarksChange('hrmarks')}
                          >Hrs
                          </button>
                        <button 
                          className={currentMarks === 'daymarks' ? 'button' : 'button-inactive'}
                        // className='button' 
                        onClick={() => handleMarksChange('daymarks')}>
                            In a Days
                            </button>
                    </div>

                </div>

            </div>
            <div className="step-navigation ">
                {currentStep !== 1 &&
                    <button className='button' onClick={handlePrevious}>
                        Previous
                    </button>}

                <button className='button' onClick={handleNext} disabled={currentStep === steps.length}>
                    Next
                </button>
            </div>


        </animated.div>
    )
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