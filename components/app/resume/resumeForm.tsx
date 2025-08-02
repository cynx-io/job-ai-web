"use client";

import { useState } from "react";
import ResumeProgressBar from "./ResumeProgressBar";
import Step1BasicInfo from "@/app/resume/steps/step1BasicInfo";
import Step2RecentJobTitles from "@/app/resume/steps/step2RecentJobTitles";
import Step3EducationInfo from "@/app/resume/steps/step3EducationInfo";
import Step3JobInfo from "@/app/resume/steps/step3JobInfo";
import { useRouter } from "next/navigation";
// import Step1BasicInfo from "./steps/Step1BasicInfo";
// import Step2PhoneVerification from "./steps/Step2PhoneVerification";
// import Step3CurrentStatus from "./steps/Step3CurrentStatus";
// import Step4JobInfo from "./steps/Step4JobInfo";
// import Step4EducationInfo from "./steps/Step4EducationInfo";
// import Step4Other from "./steps/Step4Other";
// import Step5Summary from "./steps/Step5Summary";

export default function ResumeForm() {
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    location: "",
    phone: "",
    recentJobTitles: "",
    school: "",
    degree: "",
    fieldOfStudy: "",
    startYear: undefined as number | undefined,
    endYear: undefined as number | undefined,
    jobTitles: [] as string[],
    jobLocation: "",
  });

  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<
    "student" | "working" | "other" | null
  >(null);

  const totalSteps = 3;

  const next = () => setStep((prev) => prev + 1);
  const back = () => setStep((prev) => prev - 1);
  const done = () => {
    // Do whatever logic you need before redirect
    router.push("/dashboard");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <ResumeProgressBar currentStep={step} totalSteps={totalSteps} />
      {step === 1 && (
        <Step1BasicInfo
          onNext={(data) => {
            setFormValues((prev) => ({ ...prev, ...data }));
            next();
          }}
          defaultValues={formValues}
        />
      )}
      {step === 2 && (
        <Step2RecentJobTitles
          onNext={(data) => {
            setFormValues((prev) => ({ ...prev, ...data }));
            setUserType("working");
            next();
          }}
          onBack={back}
          onSelectStudent={() => {
            setUserType("student");
            next();
          }}
          onSelectOther={() => {
            setUserType("working");
            next();
          }}
          defaultValues={formValues}
        />
      )}
      {step === 3 && userType === "student" && (
        <Step3EducationInfo
          defaultValues={formValues}
          onNext={(data) => {
            setFormValues((prev) => ({ ...prev, ...data }));
            done();
          }}
          onBack={back}
          onNotStudent={() => {
            back();
            // next();
          }}
        />
      )}
      {step === 3 && userType === "working" && (
        <Step3JobInfo
          defaultValues={{
            jobTitles: formValues.jobTitles,
            jobLocation: formValues.jobLocation,
          }}
          onNext={(data) => {
            setFormValues((prev) => ({ ...prev, ...data }));
            // setStep(4);
            done();
          }}
          onBack={back}
        />
      )}

      {/* {step === 5 && <Step5Summary onBack={back} />} */}
    </div>
  );
}
