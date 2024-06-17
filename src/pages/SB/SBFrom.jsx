import React , {useState} from 'react'
import './SB.css'
import StepperForm from '../../component/CommanComp/StepperComp/Stepper'
import { Schedular } from '../VRF/VRFForm';
import { Output } from '../VRF/VRFForm';
import { Payment } from '../VRF/VRFForm';
import SbUrl from './SbUrl/SbUrl';

export default function SBFrom() {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    { title: 'Step 01', content: 'SnBSpecific' },
    { title: 'Step 02', content: 'Schedular' },
    { title: 'Step 03', content: 'Output' },
    { title: 'Step 04', content: 'Payment' },
  ];
  const handleNext = () => {
    setCurrentStep(prevStep => Math.min(prevStep + 1, steps.length));
  };

  const handlePrevious = () => {
    setCurrentStep(prevStep => Math.max(prevStep - 1, 1));
  };

  const handleStepClick = (stepIndex) => {
    setCurrentStep(stepIndex + 1);
  };

  return (
    <div className='s$bwrapper'>
      <StepperForm  
      steps={steps} 
      currentStep={currentStep}
      handleNext={handleNext} 
      handlePrevious={handlePrevious} 
      handleStepClick={handleStepClick}
      FormSwitch = {FormSwitch}
      />
    </div>
  )
}
function FormSwitch(formTypeName) {
  const [propertyDetails, setPropertyDetails] = useState({
    gitUrl: "",
    header:[{key:"", value:""}],
    description: "",
    price: 0,
    country: "",
    city: "",
    address: "",
    image: null,
    facilities: {
      bedrooms: 0,
      parkings: 0,
      bathrooms: 0,
    },
  });
  switch (formTypeName) {
    case 'SnBSpecific':
      return <SbUrl propertyDetails={propertyDetails} setPropertyDetails={setPropertyDetails} />;
    case 'Schedular':
      return <Schedular />;
    case 'Output':
      return <Output />
    case 'Payment':
      return <Payment />
  }
  // return (


  // )
}

// for stake and specific form we have
// const SnBSpecific = () => {
//   return (
//     <div>
//       STAKE AND BAKE 
//     </div>
//   )
// }
