import React, { useState, useEffect } from 'react';
import Spacer from './Spacer';
import styled from 'styled-components';
import VerticalAdjuster from './VerticalAdjuster';
import StepIndicator from './StepIndicator';
import Box from './Box';
import FormNextButton from './FormNextButton';
import FormBackButton from './FormBackButton';
import { useNavigate } from 'react-router-dom';

function getJapaneseValue(name) {
    switch (name) {
        case "requirementsDefinition":
            return "要件定義";
        case "design":
            return "設計";
        case "development":
            return "開発";
        case "testing":
            return "テスト";
        case "maintenance":
            return "保守/運用";
        case "proposal":
            return "企画書";
        case "uiDesign":
            return "デザイン";
        case "specification":
            return "仕様書";
        case "server":
            return "サーバー";
        case "domain":
            return "ドメイン";
        case "none":
            return "特になし";
        case "internetSearch":
            return "インターネット検索";
        case "employee":
            return "シンフォニア社員";
        case "onlineNews":
            return "オンラインニュース";
        case "dm":
            return "DM";
        case "website":
            return "Webサイト";
        case "media":
            return "新聞・雑誌・TV";
        case "acquaintance":
            return "知人・取引先";
        case "exhibition":
            return "展示会";
        case "others":
            return "その他";
        default:
            return "";
    }
}

function Form() {
    const navigate = useNavigate();
    const [formState, setFormState] = useState({ 
        totalSteps: 12, 
        currentStep: 1,
        steps: Array(11).fill().map((_, i) => ({ 
            isCurrent: i === 0, 
        })),
        // stepData: {
        //     step1: { isCompleted: false, selectedOption: "", otherDetail: "", isRequired: true, error: "" },
        //     step2: { isCompleted: false, detail: "", isRequired: true, error: "" },
        //     step3: { isCompleted: false, selectedOptions: { requirementsDefinition: false, design: false, development: false, testing: false, maintenance: false, otherRequirement: false }, otherRequirementDetail: "", isRequired: true, error: "" },
        //     step4: { isCompleted: false, selectedOptions: { proposal: false, uiDesign: false, specification: false, server: false, domain: false, none: false, otherRequirement: false }, otherRequirementDetail: "", isRequired: true, error: "" },
        //     step5: { isCompleted: false, hasPreference: "", preferenceDetail: "", isRequired: true, error: "" },
        //     step6: { isCompleted: false, exampleUrl: "", isRequired: false, error: "" },
        //     step7: { isCompleted: false, budget: "", isRequired: true, error: "" },
        //     step8: { isCompleted: false, deadline: "", otherDeadline: "", isRequired: true, error: "" },
        //     step9: { isCompleted: false, deliveryTime: "", otherDeliveryTime: "", isRequired: true, error: "" },
        //     step10: { isCompleted: false, detail: "", isRequired: true, error: "" },
        //     step11: { isCompleted: false, name: "", companyName: "", email: "", message: "", survey: { internetSearch: false, employee: false, onlineNews: false, dm: false, website: false, media: false, acquaintance: false, exhibition: false, others: false }, websiteName: "", exhibitionName: "", otherSurvey: "", isRequired: true, error: "" },
        //     step12: { isCompleted: true, isRequired: false, error: "" },
        // },
        stepData : {
            step1: { isCompleted: true, selectedOption: "VR", otherDetail: "詳細1", isRequired: true, error: "" },
            step2: { isCompleted: true, detail: "詳細2", isRequired: true, error: "" },
            step3: { isCompleted: true, selectedOptions: { requirementsDefinition: true, design: true, development: true, testing: true, maintenance: true, otherRequirement: true }, otherRequirementDetail: "詳細3", isRequired: true, error: "" },
            step4: { isCompleted: true, selectedOptions: { proposal: true, uiDesign: true, specification: true, server: true, domain: true, none: true, otherRequirement: true }, otherRequirementDetail: "詳細4", isRequired: true, error: "" },
            step5: { isCompleted: true, hasPreference: "ある", preferenceDetail: "詳細5", isRequired: true, error: "" },
            step6: { isCompleted: true, exampleUrl: "http://example.com", isRequired: false, error: "" },
            step7: { isCompleted: true, budget: "50万円未満", isRequired: true, error: "" },
            step8: { isCompleted: true, deadline: "3営業日以内", otherDeadline: "詳細8", isRequired: true, error: "" },
            step9: { isCompleted: true, deliveryTime: "１か月以内", otherDeliveryTime: "詳細9", isRequired: true, error: "" },
            step10: { isCompleted: true, detail: "詳細10", isRequired: true, error: "" },
            step11: { isCompleted: true, name: "山田太郎", companyName: "株式会社山田", email: "yamada@example.com", message: "こんにちは、山田です。", survey: { internetSearch: true, employee: true, onlineNews: true, dm: true, website: true, media: true, acquaintance: true, exhibition: true, others: true }, websiteName: "http://example.com", exhibitionName: "展示会1", otherSurvey: "その他のアンケート", isRequired: true, error: "" },
            step12: { isCompleted: true, isRequired: false, error: "" },
        }
    });
    const { currentStep, steps } = formState;

    const mockSendEmail = (data) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('メール送信:', data);
                resolve();
            }, 1000);
        });
    };

    const setStepData = (step, data) => {
        setFormState(prevState => ({
            ...prevState,
            stepData: {
                ...prevState.stepData,
                [`step${step}`]: { ...data, error: "" }
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
            setFormState(prevState => ({
                ...prevState,
                stepData: {
                    ...prevState.stepData,
                    [`step${currentStep}`]: { ...currentStepData, error: "このステップはまだ完了していません" }
                }
            }));
            return;
        }
        if (currentStep < formState.totalSteps) {
            setStep(currentStep + 1);
        }
    };

    const handleToConfirm = () => {
        const { stepData } = formState;
        const incompleteSteps = Object.entries(stepData)
            .filter(([key, value]) => value.isRequired)
            .filter(([key, value]) => !value.isCompleted)
            .map(([key]) => key);
    
        if (incompleteSteps.length > 0) {
            setFormState(prevState => ({
                ...prevState,
                stepData: Object.entries(prevState.stepData).reduce((acc, [key, value]) => {
                    acc[key] = { ...value, error: value.isCompleted ? "" : `このステップ(${key})はまだ完了していません` };
                    return acc;
                }, {})
            }));
            alert(`以下のステップが完了していません: ${incompleteSteps.join(', ')}`);
            return;
        }
        setStep(formState.totalSteps);
    }

    // const handleSubmit = () => {
    //     const { stepData } = formState;
    //     const isAllCompleted = Object.values(stepData).every(step => step.isCompleted);
    //     if (!isAllCompleted) {
    //         setFormState(prevState => ({
    //             ...prevState,
    //             stepData: Object.entries(prevState.stepData).reduce((acc, [key, value]) => {
    //                 acc[key] = { ...value, error: value.isCompleted ? "" : "このステップはまだ完了していません" };
    //                 return acc;
    //             }, {})
    //         }));
    //         return;
    //     }
    //     alert('送信しました');
    // };

    const handleSubmit = () => {
        const { stepData } = formState;
        const isAllCompleted = Object.values(stepData).every(step => step.isCompleted);
        if (!isAllCompleted) {
            setFormState(prevState => ({
                ...prevState,
                stepData: Object.entries(prevState.stepData).reduce((acc, [key, value]) => {
                    acc[key] = { ...value, error: value.isCompleted ? "" : "このステップはまだ完了していません" };
                    return acc;
                }, {})
            }));
            return;
        }

        // メール送信（モック）
        mockSendEmail(stepData)
            .then(() => {
                alert('送信しました');
                // 完了画面に遷移
                navigate('/estimation/complete');
            })
            .catch(error => {
                console.error('メール送信エラー:', error);
            });
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
                                {formState.stepData[`step${currentStep}`].error && <div style={{ color: 'red' }}>{formState.stepData[`step${currentStep}`].error}</div>}
                                {currentStep === 1 && <Step1 setStepData={data => setStepData(1, data)} stepData={formState.stepData} handleBack={handleBack} handleNext={handleNext} />}
                                {currentStep === 2 && <Step2 setStepData={data => setStepData(2, data)} stepData={formState.stepData} handleBack={handleBack} handleNext={handleNext} />}
                                {currentStep === 3 && <Step3 setStepData={data => setStepData(3, data)} stepData={formState.stepData} handleBack={handleBack} handleNext={handleNext} />}
                                {currentStep === 4 && <Step4 setStepData={data => setStepData(4, data)} stepData={formState.stepData} handleBack={handleBack} handleNext={handleNext} />}
                                {currentStep === 5 && <Step5 setStepData={data => setStepData(5, data)} stepData={formState.stepData} handleBack={handleBack} handleNext={handleNext} />}
                                {currentStep === 6 && <Step6 setStepData={data => setStepData(6, data)} stepData={formState.stepData} handleBack={handleBack} handleNext={handleNext} />}
                                {currentStep === 7 && <Step7 setStepData={data => setStepData(7, data)} stepData={formState.stepData} handleBack={handleBack} handleNext={handleNext} />}
                                {currentStep === 8 && <Step8 setStepData={data => setStepData(8, data)} stepData={formState.stepData} handleBack={handleBack} handleNext={handleNext} />}
                                {currentStep === 9 && <Step9 setStepData={data => setStepData(9, data)} stepData={formState.stepData} handleBack={handleBack} handleNext={handleNext} />}
                                {currentStep === 10 && <Step10 setStepData={data => setStepData(10, data)} stepData={formState.stepData} handleBack={handleBack} handleNext={handleNext} />}
                                {currentStep === 11 && <Step11 setStepData={data => setStepData(11, data)} stepData={formState.stepData} handleBack={handleBack} handleNext={handleToConfirm} />}
                                {currentStep === 12 && <Step12 setStepData={data => setStepData(12, data)} stepData={formState.stepData} handleBack={handleBack} handleSubmit={handleSubmit} />}
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

function Step1({ setStepData, stepData, handleNext }) {
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
            <FormNextButton onClick={handleNext}>次へ</FormNextButton>
        </>
    );
}

function Step2({ setStepData, stepData, handleBack, handleNext }) {
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
            <FormBackButton onClick={handleBack}>戻る</FormBackButton>
            <FormNextButton onClick={handleNext}>次へ</FormNextButton>
        </>
    );
}

function Step3({ setStepData, stepData, handleBack, handleNext }) {
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

    // const handleCheckboxChange = (e) => {
    //     const { name, checked } = e.target;
    //     setSelectedOptions(prevState => ({ ...prevState, [name]: checked }));
    // };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        const japaneseValue = checked ? getJapaneseValue(name) : ""; // getJapaneseValue は適切な日本語の値を返す関数
        setSelectedOptions(prevState => ({ ...prevState, [name]: japaneseValue }));
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
            <FormBackButton onClick={handleBack}>戻る</FormBackButton>
            <FormNextButton onClick={handleNext}>次へ</FormNextButton>
        </>
    );
}

function Step4({ setStepData, stepData, handleBack, handleNext }) {
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
            <StyledCheckbox name="uiDesign" checked={selectedOptions.uiDesign} onChange={handleCheckboxChange} />
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
            <FormBackButton onClick={handleBack}>戻る</FormBackButton>
            <FormNextButton onClick={handleNext}>次へ</FormNextButton>
        </>
    );
}

function Step5({ setStepData, stepData, handleBack, handleNext }) {
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
            <FormBackButton onClick={handleBack}>戻る</FormBackButton>
            <FormNextButton onClick={handleNext}>次へ</FormNextButton>
        </>
    );
}

function Step6({ setStepData, stepData, handleBack, handleNext }) {
    const [exampleUrl, setExampleUrl] = useState(stepData.step6.exampleUrl || "");

    useEffect(() => {
        setStepData({
            exampleUrl,
            isCompleted: true,
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
            <FormBackButton onClick={handleBack}>戻る</FormBackButton>
            <FormNextButton onClick={handleNext}>次へ</FormNextButton>
        </>
    );
}

function Step7({ setStepData, stepData, handleBack, handleNext }) {
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
            <FormBackButton onClick={handleBack}>戻る</FormBackButton>
            <FormNextButton onClick={handleNext}>次へ</FormNextButton>
        </>
    );
}

function Step8({ setStepData, stepData, handleBack, handleNext }) {
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
            <FormBackButton onClick={handleBack}>戻る</FormBackButton>
            <FormNextButton onClick={handleNext}>次へ</FormNextButton>
        </>
    );
}

function Step9({ setStepData, stepData, handleBack, handleNext }) {
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
            <FormBackButton onClick={handleBack}>戻る</FormBackButton>
            <FormNextButton onClick={handleNext}>次へ</FormNextButton>
        </>
    );
}

function Step10({ setStepData, stepData, handleBack, handleNext }) {
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
            <FormBackButton onClick={handleBack}>戻る</FormBackButton>
            <FormNextButton onClick={handleNext}>次へ</FormNextButton>
        </>
    );
}

function Step11({ setStepData, stepData, handleBack, handleNext }) {
    const [name, setName] = useState(stepData.step11.name || "");
    const [companyName, setCompanyName] = useState(stepData.step11.companyName || "");
    const [email, setEmail] = useState(stepData.step11.email || "");
    const [message, setMessage] = useState(stepData.step11.message || "");
    const [survey, setSurvey] = useState(stepData.step11.survey || { internetSearch: false, employee: false, onlineNews: false, dm: false, website: false, media: false, acquaintance: false, exhibition: false, others: false });
    const [websiteName, setWebsiteName] = useState(stepData.step11.websiteName || "");
    const [exhibitionName, setExhibitionName] = useState(stepData.step11.exhibitionName || "");
    const [otherSurvey, setOtherSurvey] = useState(stepData.step11.otherSurvey || "");

    const checkboxItems = [
        { name: "internetSearch", label: "インターネット検索" },
        { name: "employee", label: "シンフォニア社員" },
        { name: "onlineNews", label: "オンラインニュース" },
        { name: "dm", label: "DM" },
        { name: "website", label: "Webサイト" },
        { name: "media", label: "新聞・雑誌・TV" },
        { name: "acquaintance", label: "知人・取引先" },
        { name: "exhibition", label: "展示会" },
        { name: "others", label: "その他" }
    ];

    useEffect(() => {
        const isCompleted = name !== "" && email !== "" && message !== "";
        setStepData({
            name,
            companyName,
            email,
            message,
            survey,
            websiteName,
            exhibitionName,
            otherSurvey,
            isCompleted,
            isRequired: true
        });
    }, [name, companyName, email, message, survey, websiteName, exhibitionName, otherSurvey]);

    const handleSurveyChange = (e) => {
        const { name, checked } = e.target;
        setSurvey(prevState => ({ ...prevState, [name]: checked }));
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <RequiredTag>必須</RequiredTag>
                <Spacer size="10px" />
                <StepDescription>お名前</StepDescription>
            </div>
            <StyledInput type="text" placeholder="山田太郎" value={name} onChange={(e) => setName(e.target.value)} />

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <OptionalTag>任意</OptionalTag>
                <Spacer size="10px" />
                <StepDescription>ご社名</StepDescription>
            </div>
            <StyledInput type="text" placeholder="株式会社○○○○" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <RequiredTag>必須</RequiredTag>
                <Spacer size="10px" />
                <StepDescription>メールアドレス</StepDescription>
            </div>
            <StyledInput type="email" placeholder="yamada@sampledomain.biz" value={email} onChange={(e) => setEmail(e.target.value)} />

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <RequiredTag>必須</RequiredTag>
                <Spacer size="10px" />
                <StepDescription>お問い合せ内容</StepDescription>
            </div>
            <StyledTextArea placeholder="お問い合せ内容を400文字以内でお願いします" value={message} onChange={(e) => setMessage(e.target.value)} />

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <OptionalTag>任意</OptionalTag>
                <Spacer size="10px" />
                <StepDescription>アンケート</StepDescription>
            </div>
            <p>弊社および弊社製品を知ったきっかけ</p>
            {checkboxItems.map(item => (
                <label key={item.name}>
                    <StyledCheckbox name={item.name} checked={survey[item.name]} onChange={handleSurveyChange} />
                    {item.label}
                </label>
            ))}
            {survey.website && <StyledInput type="text" placeholder="Webサイト名をご入力ください" value={websiteName} onChange={(e) => setWebsiteName(e.target.value)} />}
            {survey.exhibition && <StyledInput type="text" placeholder="展示会名をご入力ください" value={exhibitionName} onChange={(e) => setExhibitionName(e.target.value)} />}
            {survey.others && <StyledInput type="text" placeholder="「その他」の場合はご入力してください" value={otherSurvey} onChange={(e) => setOtherSurvey(e.target.value)} />}
            <FormBackButton onClick={handleBack}>戻る</FormBackButton>
            <FormNextButton onClick={handleNext}>依頼内容を確認する</FormNextButton>
        </>
    );
}

const Title = styled.h2`
    font-size: 20px;
    font-weight: bold;
    `;

const Card = styled.div`
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 20px;
    margin-bottom: 20px;
    `;

const FormSubmitButton = styled.button`
    background-color: #00a0e9;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    border-radius: 4px;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    `;


function Step12({ stepData, handleBack, handleSubmit }) {
    return (
        <>
            <Title>内容確認</Title>
            <Card>
                <Title>お仕事内容</Title>
                <p>{stepData.step1.selectedOption}</p>
                {stepData.step1.selectedOption === "その他" && <p>{stepData.step1.otherDetail}</p>}
            </Card>
            <Card>
                <Title>公開プラットフォーム（端末・OS）</Title>
                <p>{stepData.step2.detail}</p>
            </Card>
            <Card>
                <Title>依頼したい内容</Title>
                {Object.entries(stepData.step3.selectedOptions).map(([key, value]) => value && <p key={key}>{getJapaneseValue(key)}</p>)}
                {stepData.step3.selectedOptions.otherRequirement && <p>{stepData.step3.otherRequirementDetail}</p>}
            </Card>
            <Card>
                <Title>ご用意されているもの</Title>
                {Object.entries(stepData.step4.selectedOptions).map(([key, value]) => value && <p key={key}>{getJapaneseValue(key)}</p>)}
                {stepData.step4.selectedOptions.otherRequirement && <p>{stepData.step4.otherRequirementDetail}</p>}
            </Card>
            <Card>
                <Title>開発環境・言語</Title>
                <p>{stepData.step5.hasPreference}</p>
                {stepData.step5.hasPreference === "ある" && <p>{stepData.step5.preferenceDetail}</p>}
            </Card>
            <Card>
                <Title>完成イメージに近い事例</Title>
                <p>{stepData.step6.exampleUrl}</p>
            </Card>
            <Card>
                <Title>予算上限</Title>
                <p>{stepData.step7.budget}</p>
            </Card>
            <Card>
                <Title>お見積りご希望期限</Title>
                <p>{stepData.step8.deadline}</p>
                {stepData.step8.deadline === "その他" && <p>{stepData.step8.otherDeadline}</p>}
            </Card>
            <Card>
                <Title>納品ご希望時期</Title>
                <p>{stepData.step9.deliveryTime}</p>
                {stepData.step9.deliveryTime === "その他" && <p>{stepData.step9.otherDeliveryTime}</p>}
            </Card>
            <Card>
                <Title>ご依頼の目的・内容</Title>
                <p>{stepData.step10.detail}</p>
            </Card>
            <Card>
                <Title>お名前</Title>
                <p>{stepData.step11.name}</p>
            </Card>
            <Card>
                <Title>ご社名</Title>
                <p>{stepData.step11.companyName}</p>
            </Card>
            <Card>
                <Title>メールアドレス</Title>
                <p>{stepData.step11.email}</p>
            </Card>
            <Card>
                <Title>お問い合せ内容</Title>
                <p>{stepData.step11.message}</p>
            </Card>
            <Card>
                <Title>アンケート</Title>
                {Object.entries(stepData.step11.survey).map(([key, value]) => value && <p key={key}>{getJapaneseValue(key)}</p>)}
                {stepData.step11.survey.website && <p>Webサイト名: {stepData.step11.websiteName}</p>}
                {stepData.step11.survey.exhibition && <p>展示会名: {stepData.step11.exhibitionName}</p>}
                {stepData.step11.survey.others && <p>その他: {stepData.step11.otherSurvey}</p>}
            </Card>
            <FormBackButton onClick={handleBack}>戻る</FormBackButton>
            <FormSubmitButton onClick={handleSubmit}>この内容で送信する</FormSubmitButton>
        </>
    );
}