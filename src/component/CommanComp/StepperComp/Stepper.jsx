import React, { useState, useEffect } from "react";
import "./Stepper.css";
import { TbCircleCheckFilled } from "react-icons/tb";
import { FaRegCircle } from "react-icons/fa";
import Summary from "../FormComp/Summary/Summary";
import { current } from "@reduxjs/toolkit";


export default function StepperForm({
  currentStep,
  handleNext,
  handlePrevious,
  handleStepClick,
  FormSwitch,
  steps,
  isStepValid,
  setIsStepValid,
}) {


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);


  return (
    <div className="step-form-container">
      <div className="step-form">
        <div className="steps">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`step ${
                index + 1 === currentStep ? "completed current" : ""
              }`}
              onClick={() => handleStepClick(index)}
            >
              <div
                className="step-number"
                style={
                  isStepValid[index]
                    ? { backgroundColor: '#2f67ff', border: index + 1 === currentStep ? '2px solid orange' : '' }
                    : index + 1 === currentStep
                    ? { border: '2px solid orange' }
                    : {}
                }
              >
                {isStepValid[index] ? (
                  <TbCircleCheckFilled color="white" />
                ) : (
                  <FaRegCircle color="white" />
                )}
                {step.title}
              </div>
              {index < steps.length - 1 && <div className="step-line"></div>}
            </div>
          ))}
        </div>
        <div className="step-content">
          {FormSwitch(
            steps[currentStep - 1].content,
            handleNext,
            handlePrevious,
            currentStep,
            steps,
            isStepValid,
            setIsStepValid
          )}
        </div>
      </div>
      <Summary currentStep={currentStep} isStepValid={isStepValid} />
    </div>
  );
}
