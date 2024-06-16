import React, {useState } from 'react'; 
import './matine.css';
import { Container, Stepper } from "@mantine/core";


 const VRFForm = () => {
  const [active, setActive] = useState(0);

  const nextStep = () => {
    setActive((current) => (current < 4 ? current + 1 : current));
  };

  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };


  return (
    <Container h={"40rem"} w={"100%"}>
    <Stepper
      active={active}
      onStepClick={setActive}
      breakpoint="sm"
      allowNextStepsSelect={false}
    >
      <Stepper.Step label="Location" description="Address">
        <AddLocation
          nextStep={nextStep}
          // propertyDetails={propertyDetails}
          // setPropertyDetails={setPropertyDetails}
        />
      </Stepper.Step>
      <Stepper.Step label="Images" description="Upload ">
        <UploadImage
          prevStep={prevStep}
          nextStep={nextStep}
          // propertyDetails={propertyDetails}
          // setPropertyDetails={setPropertyDetails}
        />
      </Stepper.Step>
      <Stepper.Step label="Basics" description="Details">
        <BasicDetails
          prevStep={prevStep}
          nextStep={nextStep}
          // propertyDetails={propertyDetails}
          // setPropertyDetails={setPropertyDetails}
        />
      </Stepper.Step>

      <Stepper.Step>
        <Facilities
          prevStep={prevStep}
          // propertyDetails={propertyDetails}
          // setPropertyDetails={setPropertyDetails}
          // setOpened={setOpened}
          setActiveStep={setActive}
        />
      </Stepper.Step>
      <Stepper.Completed>
        Completed, click back button to get to previous step
      </Stepper.Completed>
    </Stepper>
  </Container>

  )
}
export default  VRFForm;

const AddLocation = ( {prevStep, nextStep}) => {

  return (
    <div>
      <h1>Add Location</h1>
    </div>

  )

}

const UploadImage = ({ prevStep, nextStep}) => {

  return (
    <div>
      <h1>Upload Image</h1>
    </div>

  )

}

const BasicDetails = ({ prevStep, nextStep}) => {
  return (
    <div>
      <h1>Basic Details</h1>
    </div>

  )
}

const Facilities = ({ prevStep, nextStep}) => {
  return (
    <div>
      <h1>Facilities</h1>
    </div>

  )
}


// import React,{useState} from 'react'
// import './VRF.css';
// import './matine.css';
// import { Container, Modal, Stepper } from "@mantine/core";
// import { TbCircleCheckFilled } from "react-icons/tb";


// export default function VRFForm() {
//   const [currentStep, setCurrentStep] = useState(1);

//   const steps = [
//     { title: 'Step 01', content: 'Step 01 content' },
//     { title: 'Step 02', content: 'Step 02 content' },
//     { title: 'Step 03', content: 'Step 03 content' },
//     { title: 'Step 04', content: 'Step 04 content' },
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
//   return (

//     <div className="step-form-container">
//       <div className="step-form">
//         <div className="steps">
//           {steps.map((step, index) => (
//             <div key={index} className={`step ${index + 1 === currentStep ? 'completed current' : ''}`}
//             onClick={() => handleStepClick(index)}
//             >
//                  <div className="step-number">
//                  <TbCircleCheckFilled color='white' />
//                   {step.title}
//                   </div>
//               {index < steps.length - 1 && <div className="step-line"></div>}
//             </div>
//           ))}
//         </div>
//         <div className="step-content">
//           {/* Form will be rendered over here!  */}
//           <h2>{steps[currentStep - 1].content}</h2>
//         </div>
//         <div className="step-navigation">
//           <button className='button' onClick={handlePrevious} disabled={currentStep === 1}>
//             Previous
//           </button>
//           <button className='button' onClick={handleNext} disabled={currentStep === steps.length}>
//             Next
//           </button>
//         </div>
//       </div>
//       <div className="summary">
//         <h2>Here’s your intent summary: Let’s go!</h2>
//         {/* Add content to the summary as needed */}
//       </div>
//     </div>

//   )
// }

// function FormSwitch () { 
//   return (
    
//   )
// }
