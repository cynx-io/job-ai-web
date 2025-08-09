// app/(user)/build/page.tsx
"use client";

import { useState, useEffect } from "react";
import ResumeForm from "@/components/app/build/ResumeForm";
import PdfPreview from "@/components/app/build/PdfPreview";
import { ResumeFormData } from "@/lib/type";

export default function BuildPage() {
  const [draftFormData, setDraftFormData] = useState<ResumeFormData>({
    basicInfo: {
      name: "",
      sumary: "",
      email: "",
      phone: "",
      location: "",
      website: "",
    },
    workExperience: [],
    education: [],
    projects: [],
    skills: "",
  });

  const [formData, setFormData] = useState(draftFormData);

  // ⏳ Debounce formData update
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFormData(draftFormData);
    }, 300);

    return () => clearTimeout(timeout);
  }, [draftFormData]);

  return (
    <div className="flex flex-col sm:flex-row h-screen">
      <div className="flex-1 md:w-1/2 border-r overflow-y-auto">
        <ResumeForm formData={draftFormData} setFormData={setDraftFormData} />
      </div>
      <div className="flex-1 md:w-1/2 p-6 overflow-y-auto">
        <PdfPreview formData={formData} />
      </div>
    </div>
  );
}
