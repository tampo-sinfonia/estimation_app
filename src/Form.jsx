import React, { useState } from 'react';
import Spacer from './Spacer';
import styled from 'styled-components';
import VerticalAdjuster from './VerticalAdjuster';
import StepIndicator from './StepIndicator';
import Box from './Box';

const FormNextButton = styled.button`
    width: 300px;
    height: 40px;
    border-radius: 4px;
    border: none;
    background-color: #1e90ff;
    color: white;
    font-size: 16px;
    font-weight: bold;
    `;

const FormBackButton = styled.button`
    width: 300px;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #1e90ff;
    background-color: white;
    color: #1e90ff;
    font-size: 16px;
    font-weight: bold;
    `;

function Form() {
    const [formState, setFormState] = useState({ 
        totalSteps: 10, 
        currentStep: 1,
        steps: Array(10).fill().map((_, i) => ({ 
            isCurrent: i === 0, 
            isRequired: i < 5, 
        })),
        stepData: {
            step1: {
                selectedOption: "",
                otherDetail: "",
                isCompleted: false,
            },
            step2: {
                detail: "",
                isCompleted: false,
            },
            step3: {
                isCompleted: false,
            },
            step4: {
                isCompleted: false,
            },
            step5: {
                isCompleted: false,
            },
            step6: {
                isCompleted: false,
            },
            step7: {
                isCompleted: false,
            },
            step8: {
                isCompleted: false,
            },
            step9: {
                isCompleted: false,
            },
            step10: {
                isCompleted: false,
            },
        },
    });
    const { currentStep, steps } = formState;
    const [error, setError] = useState("");

    const setCompleted = (step, isCompleted) => { 
        setFormState(prevState => ({ 
            ...prevState, 
            stepData: {
                ...prevState.stepData,
                [`step${step}`]: {
                    ...prevState.stepData[`step${step}`],
                    isCompleted: isCompleted
                }
            }
        }));
        updateStepsCompletion();
    };

    const updateStepsCompletion = () => {
        const newSteps = steps.map((s, i) => ({
            ...s,
            isCompleted: formState.stepData[`step${i+1}`].isCompleted,
        }));
        setFormState(prevState => ({ ...prevState, steps: newSteps }));
    };

    const setStep = (step) => {
        const newSteps = steps.map((s, i) => ({
            ...s,
            isCurrent: i === step - 1,
        }));
        setFormState(prevState => ({ ...prevState, currentStep: step, steps: newSteps }));
    };

    const setSelectedOption = (option) => { 
        setFormState(prevState => ({ 
            ...prevState, 
            stepData: {
                ...prevState.stepData,
                step1: {
                    ...prevState.stepData.step1,
                    selectedOption: option
                }
            }
        }));
    };

    const setOtherDetail = (otherDetail) => { 
        setFormState(prevState => ({ 
            ...prevState, 
            stepData: {
                ...prevState.stepData,
                step1: {
                    ...prevState.stepData.step1,
                    otherDetail: otherDetail
                }
            }
        }));
    };

    const setDetail = (detail) => { 
        setFormState(prevState => ({ 
            ...prevState, 
            stepData: {
                ...prevState.stepData,
                step2: {
                    ...prevState.stepData.step2,
                    detail: detail
                }
            }
        }));
    };

    const handleNext = () => {
        const { currentStep, stepData } = formState;
        const currentStepData = stepData[`step${currentStep}`];
        const validation = validateStep(currentStep, currentStepData);
        if (validation !== true) {
            setError(validation);
            return;
        }
        setError("");
        setCompleted(currentStep, true);
        updateStepsCompletion();
        if (currentStep < formState.totalSteps) {
            setStep(currentStep + 1);
        }
    };


    const handleBack = () => {
        if (currentStep > 1) {
            setStep(currentStep - 1);
        }
    };

    function validateStep(step, stepData) {
        if (step === 1 && (stepData.selectedOption === "" || stepData.selectedOption == null)) {
            return "選択してください";
        }
        if (step === 1 && stepData.selectedOption === "その他" && stepData.otherDetail === "") {
            return "詳細を入力してください";
        }
        if (step === 2 && stepData.detail === "") {
            return "公開プラットフォームを入力してください";
        }
        return true;
    }
    

  return (
        <div>
            <Box backgroundColor="背景色1">
                <Spacer size="20px"/>
            </Box>
            <Box backgroundColor="背景色1">
                <VerticalAdjuster>
                    <StepIndicator steps={formState.steps} setStep={setStep} stepData={formState.stepData} />
                </VerticalAdjuster>
            </Box>
            <Box backgroundColor="背景色1">
                <VerticalAdjuster>
                    <div>
                        <Box>
                            <VerticalAdjuster maxWidth={640}>
                                {error && <div style={{ color: 'red' }}>{error}</div>}
                                {currentStep === 1 && <Step1 setStep={setStep} selectedOption={formState.stepData[`step${currentStep}`].selectedOption} setSelectedOption={setSelectedOption} otherDetail={formState.stepData[`step${currentStep}`].otherDetail} setOtherDetail={setOtherDetail} />}
                                {currentStep === 2 && <Step2 detail={formState.stepData[`step${currentStep}`].detail} setDetail={setDetail} />}
                                {currentStep === 3 && <Step3 />}
                                <FormBackButton onClick={handleBack}>戻る</FormBackButton>
                                <FormNextButton onClick={handleNext}>次へ</FormNextButton>
                            </VerticalAdjuster>
                        </Box>
                    </div>
                </VerticalAdjuster>
            </Box>
        </div>
    );
}

export default Form;






const RequiredTag = styled.p`
    color: red;
    font-size: 12px;
    font-weight: bold;
    border: 1px solid red;
    border-radius: 4px;
    padding: 3px 5px;
    `;

const StepDescription = styled.p`
    font-size: 16px;
    font-weight: bold;
    `;

const StyledSelect = styled.select`
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
`;

const StyledInput = styled.input`
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-top: 10px;
`;

const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
    margin-top: 10px;
    margin-right: 10px;
`;



function Step1({ selectedOption, setSelectedOption, otherDetail, setOtherDetail }) {
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <RequiredTag>必須</RequiredTag>
                <Spacer size="10px" />
                <StepDescription>どのようなお仕事ですか？</StepDescription>
            </div>
            <StyledSelect value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                <option value="">選択してください</option>
                <option value="VR">VR</option>
                <option value="AR">AR</option>
                <option value="スマート端末用アプリ">スマート端末用アプリ</option>
                <option value="PC用アプリケーション">PC用アプリケーション</option>
                <option value="Webシステム">Webシステム</option>
                <option value="その他">その他</option>
            </StyledSelect>
            {selectedOption === "その他" && <StyledInput type="text" placeholder="詳細を入力してください" value={otherDetail} onChange={(e) => setOtherDetail(e.target.value)} />}
        </>
    );
}

function Step2({ detail, setDetail }) {
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <RequiredTag>必須</RequiredTag>
                <Spacer size="10px" />
                <StepDescription>公開プラットフォーム（端末・OS）は何ですが？</StepDescription>
            </div>
            <StyledInput type="text" placeholder="例：Webブラウザ, META Quest, HoloLens, Windows PC, iPhone, Android など" value={detail} onChange={(e) => setDetail(e.target.value)} />
        </>
    );
}
    
function Step3() {
    const [selectedOptions, setSelectedOptions] = useState({
        requirementsDefinition: false,
        design: false,
        development: false,
        testing: false,
        maintenance: false,
        otherRequirement: false
    });
    const [otherRequirementDetail, setOtherRequirementDetail] = useState("");

    const handleCheckboxChange = (event) => {
        setSelectedOptions({ ...selectedOptions, [event.target.name]: event.target.checked });
    };

    const handleOtherRequirementDetailChange = (event) => {
        setOtherRequirementDetail(event.target.value);
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <RequiredTag>必須</RequiredTag>
                <Spacer size="10px" />
                <StepDescription>依頼したい内容を教えてください</StepDescription>
            </div>
            <label>
            <StyledCheckbox name="requirementsDefinition" checked={selectedOptions.requirementsDefinition} onChange={handleCheckboxChange} />
            要件定義
            </label>
            <label>
            <StyledCheckbox name="design" checked={selectedOptions.design} onChange={handleCheckboxChange} />
            設計
            </label>
            <label>
            <StyledCheckbox name="development" checked={selectedOptions.development} onChange={handleCheckboxChange} />
            開発
            </label>
            <label>
            <StyledCheckbox name="testing" checked={selectedOptions.testing} onChange={handleCheckboxChange} />
            テスト
            </label>
            <label>
            <StyledCheckbox name="maintenance" checked={selectedOptions.maintenance} onChange={handleCheckboxChange} />
            保守/運用
            </label>
            <label>
            <StyledCheckbox name="otherRequirement" checked={selectedOptions.otherRequirement} onChange={handleCheckboxChange} />
            その他
            </label>
            {selectedOptions.otherRequirement && <StyledInput type="text" placeholder="詳細を入力してください" value={otherRequirementDetail} onChange={handleOtherRequirementDetailChange} />}
        </>
    );
}

