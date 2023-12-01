import React from 'react';
import styled from 'styled-components';
import check from './check.svg';

const StepContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    `;

const Step = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    color: ${props => props.isCurrent ? 'white' : props.isCompleted ? '#adb5bd' : '#000'};
    font-size: 12px;
    font-weight: bold;
    border: ${props => props.isRequired ? '1px solid red' : '1px solid blue'};
    background-color: ${props => props.isCurrent ? 'blue' : props.isCompleted ? '#adb5bd' : '#fff'};
    `;

const StepLine = styled.div`
    flex-grow: 1;
    height: 1px;
    background-color: #808080;
    `;

const CheckIcon = styled.img`
    width: 10px;
    height: 10px;
    fill: #d9d9d9;
`;

function StepIndicator({ steps, setStep, stepData }) {
    return (
        <StepContainer>
            {steps.map((step, i) => {
            const isCompleted = stepData[`step${i+1}`].isCompleted;
            return (
                <React.Fragment key={i}>
                    <Step 
                        isCurrent={step.isCurrent}
                        isRequired={step.isRequired}
                        isCompleted={isCompleted}
                        onClick={() => setStep(i + 1)}
                    >
                        {isCompleted ? <CheckIcon src={check} alt="check" /> : i + 1}
                    </Step>
                    {i < steps.length - 1 && <StepLine />}
                </React.Fragment>
            );
        })}
        </StepContainer>
    );
}

export default StepIndicator;