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
            step4: { isCompleted: false, selectedOptions: { proposal: false, design: false, specification: false, server: false, domain: false, none: false, otherRequirement: false }, otherRequirementDetail: "", isRequired: true },
            step5: { isCompleted: false, hasPreference: "", preferenceDetail: "", isRequired: true },
            step6: { isCompleted: false, exampleUrl: "", isRequired: false },
            step7: { isCompleted: false, budget: "", isRequired: true },
            step8: { isCompleted: false, deadline: "", otherDeadline: "", isRequired: true },
            step9: { isCompleted: false, deliveryTime: "", otherDeliveryTime: "", isRequired: true },
            step10: { isCompleted: false, detail: "", isRequired: true },
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
                                {currentStep === 3 && <Step3 setStepData={data => setStepData(3, data)} stepData={formState.stepData} />}
                                {currentStep === 4 && <Step4 setStepData={data => setStepData(4, data)} stepData={formState.stepData} />}
                                {currentStep === 5 && <Step5 setStepData={data => setStepData(5, data)} stepData={formState.stepData} />}
                                {currentStep === 6 && <Step6 setStepData={data => setStepData(6, data)} stepData={formState.stepData} />}
                                {currentStep === 7 && <Step7 setStepData={data => setStepData(7, data)} stepData={formState.stepData} />}
                                {currentStep === 8 && <Step8 setStepData={data => setStepData(8, data)} stepData={formState.stepData} />}
                                {currentStep === 9 && <Step9 setStepData={data => setStepData(9, data)} stepData={formState.stepData} />}
                                {currentStep === 10 && <Step10 setStepData={data => setStepData(10, data)} stepData={formState.stepData} />}
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

const OptionalTag = styled.p`
    color: blue;
    font-size: 12px;
    font-weight: bold;
    border: 1px solid blue;
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

const StyledRadio = styled.input.attrs({ type: 'radio' })`
    margin-top: 10px;
    margin-right: 10px;
`;

const StyledTextArea = styled.textarea`
    width: 100%;
    height: 200px;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-top: 10px;
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

function Step4({ setStepData, stepData }) {
    const [selectedOptions, setSelectedOptions] = useState(stepData.step4.selectedOptions);
    const [otherRequirementDetail, setOtherRequirementDetail] = useState(stepData.step4.otherRequirementDetail);

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
                <StepDescription>ご用意されているものはありますか？</StepDescription>
            </div>
            <label>
            <StyledCheckbox name="proposal" checked={selectedOptions.proposal} onChange={handleCheckboxChange} />
            企画書
            </label>
            <label>
            <StyledCheckbox name="design" checked={selectedOptions.design} onChange={handleCheckboxChange} />
            デザイン
            </label>
            <label>
            <StyledCheckbox name="specification" checked={selectedOptions.specification} onChange={handleCheckboxChange} />
            仕様書
            </label>
            <label>
            <StyledCheckbox name="server" checked={selectedOptions.server} onChange={handleCheckboxChange} />
            サーバー
            </label>
            <label>
            <StyledCheckbox name="domain" checked={selectedOptions.domain} onChange={handleCheckboxChange} />
            ドメイン
            </label>
            <label>
            <StyledCheckbox name="none" checked={selectedOptions.none} onChange={handleCheckboxChange} />
            特になし
            </label>
            <label>
            <StyledCheckbox name="otherRequirement" checked={selectedOptions.otherRequirement} onChange={handleCheckboxChange} />
            その他
            </label>
            {selectedOptions.otherRequirement && <StyledInput type="text" placeholder="詳細を入力してください" value={otherRequirementDetail} onChange={handleOtherRequirementDetailChange} />}
        </>
    );
}

function Step5({ setStepData, stepData }) {
    const [hasPreference, setHasPreference] = useState(stepData.step5.hasPreference);
    const [preferenceDetail, setPreferenceDetail] = useState(stepData.step5.preferenceDetail || "");

    useEffect(() => {
        setStepData({
            hasPreference,
            preferenceDetail,
            isCompleted: hasPreference !== "" && (hasPreference !== "ある" || preferenceDetail !== ""),
            isRequired: true
        });
    }, [hasPreference, preferenceDetail]);

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <RequiredTag>必須</RequiredTag>
                <Spacer size="10px" />
                <StepDescription>開発環境・言語にご希望はありますか？</StepDescription>
            </div>
            <p>（※弊社ではVR/AR, アプリ開発についてはUnityをメインにして開発しております）</p>
            <label>
                <StyledRadio name="preference" value="ある" checked={hasPreference === 'ある'} onChange={(e) => setHasPreference(e.target.value)} />
                ある
            </label>
            {hasPreference === 'ある' && <StyledInput type="text" placeholder="詳細を入力してください" value={preferenceDetail} onChange={(e) => setPreferenceDetail(e.target.value)} />}
            <label>
                <StyledRadio name="preference" value="ない" checked={hasPreference === 'ない'} onChange={(e) => setHasPreference(e.target.value)} />
                ない
            </label>
        </>
    );
}

function Step6({ setStepData, stepData }) {
    const [exampleUrl, setExampleUrl] = useState(stepData.step6.exampleUrl || "");

    useEffect(() => {
        setStepData({
            exampleUrl,
            isCompleted: exampleUrl !== "",
            isRequired: false
        });
    }, [exampleUrl]);

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <OptionalTag>任意</OptionalTag>
                <Spacer size="10px" />
                <StepDescription>完成イメージに近い事例がありましたら教えてください。</StepDescription>
            </div>
            <StyledInput type="url" placeholder="URLを入力してください" value={exampleUrl} onChange={(e) => setExampleUrl(e.target.value)} />
        </>
    );
}

function Step7({ setStepData, stepData }) {
    const [budget, setBudget] = useState(stepData.step7.budget || "");

    useEffect(() => {
        setStepData({
            budget,
            isCompleted: budget !== "",
            isRequired: true
        });
    }, [budget]);

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <RequiredTag>必須</RequiredTag>
                <Spacer size="10px" />
                <StepDescription>予算上限を選択してください</StepDescription>
            </div>
            <StyledSelect value={budget} onChange={(e) => setBudget(e.target.value)}>
                <option value="">選択してください</option>
                <option value="50万円未満">50万円未満</option>
                <option value="50～100万円">50～100万円</option>
                <option value="100～300万円">100～300万円</option>
                <option value="300～500万円">300～500万円</option>
                <option value="500万円以上">500万円以上</option>
            </StyledSelect>
        </>
    );
}

function Step8({ setStepData, stepData }) {
    const [deadline, setDeadline] = useState(stepData.step8.deadline || "");
    const [otherDeadline, setOtherDeadline] = useState(stepData.step8.otherDeadline || "");

    useEffect(() => {
        const isCompleted = deadline !== "" && (deadline !== "その他" || otherDeadline !== "");
        setStepData({
            deadline,
            otherDeadline,
            isCompleted,
            isRequired: true
        });
    }, [deadline, otherDeadline]);

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <RequiredTag>必須</RequiredTag>
                <Spacer size="10px" />
                <StepDescription>お見積りご希望期限を選択してください</StepDescription>
            </div>
            <div style={{ marginTop: '10px', color: '#888' }}>
                ※ご依頼内容によっては上記選択肢以上に日数が必要な場合がございます。
            </div>
            <StyledSelect value={deadline} onChange={(e) => setDeadline(e.target.value)}>
                <option value="">選択してください</option>
                <option value="3営業日以内">3営業日以内</option>
                <option value="5営業日以内">5営業日以内</option>
                <option value="10営業日以内">10営業日以内</option>
                <option value="15営業日以内">15営業日以内</option>
                <option value="その他">その他</option>
            </StyledSelect>
            {deadline === "その他" && (
                <StyledInput type="text" placeholder="日数を入力してください" value={otherDeadline} onChange={(e) => setOtherDeadline(e.target.value)} />
            )}
        </>
    );
}

function Step9({ setStepData, stepData }) {
    const [deliveryTime, setDeliveryTime] = useState(stepData.step9.deliveryTime || "");
    const [otherDeliveryTime, setOtherDeliveryTime] = useState(stepData.step9.otherDeliveryTime || "");

    useEffect(() => {
        const isCompleted = deliveryTime !== "" && (deliveryTime !== "その他" || otherDeliveryTime !== "");
        setStepData({
            deliveryTime,
            otherDeliveryTime,
            isCompleted,
            isRequired: true
        });
    }, [deliveryTime, otherDeliveryTime]);

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <RequiredTag>必須</RequiredTag>
                <Spacer size="10px" />
                <StepDescription>納品ご希望時期を選択してください</StepDescription>
            </div>
            <StyledSelect value={deliveryTime} onChange={(e) => setDeliveryTime(e.target.value)}>
                <option value="">選択してください</option>
                <option value="１か月以内">１か月以内</option>
                <option value="１～２か月">１～２か月</option>
                <option value="２～３か月">２～３か月</option>
                <option value="３～６か月">３～６か月</option>
                <option value="その他">その他</option>
            </StyledSelect>
            {deliveryTime === "その他" && (
                <StyledInput type="text" placeholder="日数を入力してください" value={otherDeliveryTime} onChange={(e) => setOtherDeliveryTime(e.target.value)} />
            )}
        </>
    );
}

function Step10({ setStepData, stepData }) {
    const [detail, setDetail] = useState(stepData.step10.detail || "");

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
                <StepDescription>ご依頼の目的・内容などについてお教えください</StepDescription>
            </div>
            <StyledTextArea placeholder="ご記入ください" value={detail} onChange={(e) => setDetail(e.target.value)} />
        </>
    );
}