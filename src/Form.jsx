import React, { useState, useEffect } from 'react';
import Spacer from './Spacer';
import styled from 'styled-components';
import VerticalAdjuster from './VerticalAdjuster';
import StepIndicator from './StepIndicator';
import Box from './Box';
import FormNextButton from './FormNextButton';
import FormBackButton from './FormBackButton';

function Form() {
    const [formState, setFormState] = useState({ 
        totalSteps: 10, 
        currentStep: 1,
        steps: Array(10).fill().map((_, i) => ({ 
            isCurrent: i === 0, 
        })),
        stepData: {
            step1: { isCompleted: false, selectedOption: "", otherDetail: "", isRequired: true },
            step2: { isCompleted: false, detail: "", isRequired: true },
            step3: { isCompleted: false, selectedOptions: { requirementsDefinition: false, design: false, development: false, testing: false, maintenance: false, otherRequirement: false }, otherRequirementDetail: "", isRequired: true },
            step4: { isCompleted: false, isRequired: true },
            step5: { isCompleted: false, isRequired: true },
            step6: { isCompleted: false, isRequired: true },
            step7: { isCompleted: false, isRequired: true },
            step8: { isCompleted: false, isRequired: true },
            step9: { isCompleted: false, isRequired: true },
            step10: { isCompleted: false, isRequired: true },
        },
    });
    const { currentStep, steps } = formState;
    const [error, setError] = useState("");

    const setStepData = (step, data) => {
        setFormState(prevState => ({
            ...prevState,
            stepData: {
                ...prevState.stepData,
                [`step${step}`]: data
            }
        }));
    };

    const setStep = (step) => {
        const newSteps = steps.map((s, i) => ({
            ...s,
            isCurrent: i === step - 1,
        }));
        setFormState(prevState => ({ ...prevState, currentStep: step, steps: newSteps }));
    };

    const handleNext = () => {
        const { currentStep, stepData } = formState;
        const currentStepData = stepData[`step${currentStep}`];
        if (!currentStepData.isCompleted) {
            setError("このステップはまだ完了していません");
            return;
        }
        setError("");
        if (currentStep < formState.totalSteps) {
            setStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setStep(currentStep - 1);
        }
    };

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
                                {currentStep === 1 && <Step1 setStepData={data => setStepData(1, data)} stepData={formState.stepData} />}
                                {currentStep === 2 && <Step2 setStepData={data => setStepData(2, data)} stepData={formState.stepData} />}
                                {currentStep === 3 && <Step3 setStepData={data => setStepData(3, data)} stepData={formState.stepData} />}                                <FormBackButton onClick={handleBack}>戻る</FormBackButton>
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

function Step1({ setStepData, stepData }) {
    const [selectedOption, setSelectedOption] = useState(stepData.step1.selectedOption);
    const [otherDetail, setOtherDetail] = useState(stepData.step1.otherDetail);

    useEffect(() => {
        const validation = selectedOption !== "" && (selectedOption !== "その他" || otherDetail !== "");
        setStepData({
            selectedOption,
            otherDetail,
            isCompleted: validation,
            isRequired: true
        });
    }, [selectedOption, otherDetail]);

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

function Step2({ setStepData, stepData }) {
    const [detail, setDetail] = useState(stepData.step2.detail);

    useEffect(() => {
        setStepData({
            detail,
            isCompleted: detail !== "",
            isRequired: true
        });
    }, [detail]);

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <RequiredTag>必須</RequiredTag>
                <Spacer size="10px" />
                <StepDescription>公開プラットフォーム（端末・OS）は何ですか？</StepDescription>
            </div>
            <StyledInput type="text" placeholder="例：Webブラウザ, META Quest, HoloLens, Windows PC, iPhone, Android など" value={detail} onChange={(e) => setDetail(e.target.value)} />
        </>
    );
}

function Step3({ setStepData, stepData }) {
    const [selectedOptions, setSelectedOptions] = useState(stepData.step3.selectedOptions);
    const [otherRequirementDetail, setOtherRequirementDetail] = useState(stepData.step3.otherRequirementDetail);

    useEffect(() => {
        setStepData({
            selectedOptions,
            otherRequirementDetail,
            isCompleted: Object.values(selectedOptions).some(v => v) && (!selectedOptions.otherRequirement || otherRequirementDetail !== ""),
            isRequired: true
        });
    }, [selectedOptions, otherRequirementDetail]);

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setSelectedOptions(prevState => ({ ...prevState, [name]: checked }));
    };

    const handleOtherRequirementDetailChange = (e) => {
        setOtherRequirementDetail(e.target.value);
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
