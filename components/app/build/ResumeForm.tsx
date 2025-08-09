"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Education, ResumeFormData, WorkExperience } from "@/lib/type";

import {
  BasicInfoForm,
  EducationForm,
  ProjectForm,
  SkillForm,
  WorkExperienceForm,
} from "./FormCard";

type Props = {
  formData: ResumeFormData;
  setFormData: (data: ResumeFormData) => void;
};

export default function ResumeForm({ formData, setFormData }: Props) {
  return (
    <div className="space-y-4">
      <BasicInfoForm formData={formData} setFormData={setFormData} />
      <WorkExperienceForm formData={formData} setFormData={setFormData} />
      <EducationForm formData={formData} setFormData={setFormData} />
      <ProjectForm formData={formData} setFormData={setFormData} />
      <SkillForm formData={formData} setFormData={setFormData} />
    </div>
  );
}
