
import React, { useState, useEffect } from 'react'
// import './VRF.css';
import './Stepper.css';
// import { Container, Modal, Stepper } from "@mantine/core";
import { TbCircleCheckFilled } from "react-icons/tb";
// import { useSpring, animated } from '@react-spring/web';
// import ToggleButtons from '../../component/ToggleButton/ToggleButton';
// import { Slider, Text } from '@mantine/core';
// import classes from './vrf.module.css';


// console.log("classes", classes)


export default function StepperForm({
  currentStep,  handleNext,  handlePrevious, handleStepClick, FormSwitch, steps
}) {
//   const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);



//   const steps = [
//     { title: 'Step 01', content: 'vrfSpecific' },
//     { title: 'Step 02', content: 'Schedular' },
//     { title: 'Step 03', content: 'Output' },
//     { title: 'Step 04', content: 'Payment' },
//   ];

//   const handleNext = () => {
//     setCurrentStep(prevStep => Math.min(prevStep + 1, steps.length));
//   };

//   const handlePrevious = () => {
//     setCurrentStep(prevStep => Math.max(prevStep - 1, 1));
//   };

//   const handleStepClick = (stepIndex) => {
//     setCurrentStep(stepIndex + 1);
//   };
  return (

    <div className="step-form-container">
      <div className="step-form">
        <div className="steps">
          {steps.map((step, index) => (
            <div key={index} className={`step ${index + 1 === currentStep ? 'completed current' : ''}`}
              onClick={() => handleStepClick(index)}
            >
              <div className="step-number">
                <TbCircleCheckFilled color='white' />
                {step.title}
              </div>
              {index < steps.length - 1 && <div className="step-line"></div>}
            </div>
          ))}
        </div>
        <div className="step-content">
          {FormSwitch(steps[currentStep - 1].content, handleNext , handlePrevious, currentStep , steps)}
        </div>
        {/* <div className="step-navigation">
          <button className='button' onClick={handlePrevious} disabled={currentStep === 1}>
            Previous
          </button>
          <button className='button' onClick={handleNext} disabled={currentStep === steps.length}>
            Next
          </button>
        </div> */}
      </div>
      <div className="summary">
        <span>HERE’S YOUR INTENT SUMMARY: LET’S GO!</span>
        {/* Add content to the summary as needed */}
      </div>
    </div>

  )
}

// function FormSwitch(formTypeName) {
//   switch (formTypeName) {
//     case 'vrfSpecific':
//       return <VrfSpecific />;
//     case 'Schedular':
//       return <Schedular />;
//     case 'Output':
//       return <Output />
//     case 'Payment':
//       return <Payment />
//   }
//   // return (


//   // )
// }


// export const VrfSpecific = () => {
//   const styles = useSpring({
//     from: { maxHeight: 0, opacity: 0 },
//     to: { maxHeight: 500, opacity: 1 },
//     config: { tension: 200, friction: 20 },
//     overflow: 'hidden',
//   });
//   return (
//     <animated.div style={styles}>
//       <div style={{ gap: '15px' }} className='flexColStart vrfIntro'>
//         <span>VRF (Verified Random Function)</span>
//         <div className='flexColStart'>
//           <span>Generates a verified random number between </span>
//           <span> 0 and 2<sup>256</sup></span>
//         </div>

//       </div>

//     </animated.div>
//   )
// }
// export const Schedular = () => {

//   const [activeButton, set_ActiveButton] = useState('Time');
//   const styles = useSpring({
//     from: { maxHeight: 0, opacity: 0 },
//     to: { maxHeight: 500, opacity: 1 },
//     config: { tension: 200, friction: 20 },
//     overflow: 'hidden',
//   });

//   const marks = [
//     { value: 0, label: '0s' },
//     { value: 5, label: '5s' },
//     { value: 10, label: '10s' },
//     { value: 15, label: '15s' },
//     { value: 20, label: '20s' },
//     { value: 25, label: '25s' },
//     { value: 30, label: '30s' },
//     { value: 35, label: '35s' },
//     { value: 40, label: '40s' },
//     { value: 45, label: '45s' },
//     { value: 50, label: '50s' },
//     { value: 55, label: '55s' },
//     { value: 60, label: '60s' },
//   ];


//   return (
//     <animated.div style={styles}>
//       <div className="flexColStart schedular-wrapper">
//         <span>Specify the trigger conditions as when to run job</span>
//         <div style={{ padding: '15px' }} className='flexColStart'>
//           <ToggleButtons disabled = {true} roleType_1 = {'Time'} roleType_2 = {'Condition'} activeButton={activeButton} setActiveButton={set_ActiveButton} />
//           <div style={{ padding: '25px', gap: '12px' }} className='flexColStart'>
//             <Text c="#888ca9" mt="md">Every</Text>
//             <Slider
//               min={0}
//               max={60}
//               className={classes.widthslider}
//               defaultValue={0}
//               label={(val) => {
//                 const mark = marks.find((mark) => mark.value === val);
//                 return mark ? mark.label : '';
//               }}
//               step={5}
//               marks={marks}
//             // styles={{ markLabel: { display: '' } }}
//             />
//           </div>

//         </div>

//       </div>


//     </animated.div>
//   )
// }
// export const Output = () => {
//   const styles = useSpring({
//     from: { maxHeight: 0, opacity: 0 },
//     to: { maxHeight: 500, opacity: 1 },
//     config: { tension: 200, friction: 20 },
//     overflow: 'hidden',
//   });
//   return (
//     <animated.div style={styles}>
//       <h3>Out put</h3>
//       <h3>Out put</h3>
//       <h3>Out put</h3>
//       <h3>Out put</h3>
//       <h3>Out put</h3>
//     </animated.div>
//   )
// }
// export const Payment = () => {
//   const styles = useSpring({
//     from: { maxHeight: 0, opacity: 0 },
//     to: { maxHeight: 500, opacity: 1 },
//     config: { tension: 200, friction: 20 },
//     overflow: 'hidden',
//   });
//   return (
//     <animated.div style={styles}>
//       <h3>Payment</h3>
//       <h3>Payment</h3>
//       <h3>Payment</h3>
//       <h3>Payment</h3>
//     </animated.div>
//   )
// }


























































































