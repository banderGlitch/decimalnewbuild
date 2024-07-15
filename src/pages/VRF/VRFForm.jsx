import React, { useState, useEffect } from "react";
import "./VRF.css";
import { TbCircleCheckFilled } from "react-icons/tb";
import { useSpring, animated } from "@react-spring/web";
import StepperForm from "../../component/CommanComp/StepperComp/Stepper";
import { Schedular } from "../../component/CommanComp/FormComp/Schedular/Schedular";
import classes from "./vrf.module.css";
import { VrfSpecific } from "./VrfSpecific/VrfSpecific";
import Payment from "../../component/CommanComp/FormComp/Payment/Payment";
import { Output } from "../../component/CommanComp/FormComp/Output/Output";

export default function VRFForm() {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  const steps = [
    { title: "Step 01", content: "vrfSpecific" },
    { title: "Step 02", content: "Schedular" },
    { title: "Step 03", content: "Output" },
    { title: "Step 04", content: "Payment" },
  ];

  const [isStepValid, setIsStepValid] = useState(
    Array(steps.length).fill(false)
  );

  const handleNext = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length));
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleStepClick = (stepIndex) => {
    setCurrentStep(stepIndex + 1);
  };
  return (
    <div>
      <div className="stepper-headings">
      <p>Verifiable Random Function</p>
      </div>
     
    <div className="vrfwrapper">
      <StepperForm // next button previous button is in this
        steps={steps}
        currentStep={currentStep}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        handleStepClick={handleStepClick}
        FormSwitch={FormSwitch}
        isStepValid={isStepValid}
        setIsStepValid={setIsStepValid}
      />
    </div>
    </div>
  );
}

function FormSwitch(
  formTypeName,
  handleNext,
  handlePrevious,
  currentStep,
  steps,
  isStepValid,
  setIsStepValid
) {
  const [propertyDetails, setPropertyDetails] = useState({
    timerType: "sec",
    timer: '* * * * *',
    functions : [{functionName:"", blockchainType:"", contractAddress:""}],
    totalRewardAllocated : 0

  });


  
  useEffect(() => {
    console.log("propertyDetails", propertyDetails);
  }, [propertyDetails]);

  
  switch (formTypeName) {
    case "vrfSpecific":
      return (
        <VrfSpecific
          isStepValid={isStepValid}
          setIsStepValid={setIsStepValid}
          steps={steps}
          currentStep={currentStep}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          propertyDetails={propertyDetails}
          setPropertyDetails={setPropertyDetails}
        />
      );
    case "Schedular":
      return (
        <Schedular
          isStepValid={isStepValid}
          setIsStepValid={setIsStepValid}
          roleType_1="Time"
          roleType_2="Condition"
          steps={steps}
          currentStep={currentStep}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          propertyDetails={propertyDetails}
          setPropertyDetails={setPropertyDetails}
        />
      );
    case "Output":
      return (
        <Output
          isStepValid={isStepValid}
          setIsStepValid={setIsStepValid}
          steps={steps}
          currentStep={currentStep}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          propertyDetails = {propertyDetails} 
          setPropertyDetails = {setPropertyDetails}
        />
      );
    case "Payment":
      return <Payment
        isStepValid={isStepValid}
        setIsStepValid={setIsStepValid}
        steps={steps}
        currentStep={currentStep}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        propertyDetails = {propertyDetails} 
        setPropertyDetails = {setPropertyDetails}
      />;
  }
}
