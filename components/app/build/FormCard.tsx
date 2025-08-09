function ResumeFormLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-muted p-6 m-3 rounded-md shadow-sm space-y-4">
      {children}
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Education,
  Project,
  ResumeFormData,
  Skill,
  WorkExperience,
} from "@/lib/type";
import {
  ArrowDown,
  BookUser,
  Briefcase,
  Eye,
  Lightbulb,
  PersonStanding,
  Trash2,
  User,
} from "lucide-react";

type Props = {
  formData: ResumeFormData;
  setFormData: (data: ResumeFormData) => void;
};

export function BasicInfoForm({ formData, setFormData }: Props) {
  const handleBasicInfoChange = (
    key: keyof ResumeFormData["basicInfo"],
    value: string,
  ) => {
    setFormData({
      ...formData,
      basicInfo: {
        ...formData.basicInfo,
        [key]: value,
      },
    });
  };

  return (
    <ResumeFormLayout>
      <div className="flex items-center gap-2 text-xl font-semibold">
        <User size={20} />
        <span>Basic Information</span>
      </div>

      <div>
        <label className="block font-semibold mb-1">Name</label>
        <Input
          placeholder="Your Name"
          value={formData.basicInfo.name}
          onChange={(e) => handleBasicInfoChange("name", e.target.value)}
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Objective</label>
        <Textarea
          placeholder="Objective"
          value={formData.basicInfo.sumary}
          onChange={(e) => handleBasicInfoChange("sumary", e.target.value)}
          rows={4}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-1">Phone</label>
          <Input
            placeholder="Your Phone"
            value={formData.basicInfo.phone}
            onChange={(e) => handleBasicInfoChange("phone", e.target.value)}
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <Input
            placeholder="Your Email"
            value={formData.basicInfo.email}
            onChange={(e) => handleBasicInfoChange("email", e.target.value)}
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Location</label>
          <Input
            placeholder="Location"
            value={formData.basicInfo.location}
            onChange={(e) => handleBasicInfoChange("location", e.target.value)}
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Website</label>
          <Input
            placeholder="Your Website"
            value={formData.basicInfo.website}
            onChange={(e) => handleBasicInfoChange("website", e.target.value)}
          />
        </div>
      </div>
    </ResumeFormLayout>
  );
}

export function WorkExperienceForm({ formData, setFormData }: Props) {
  const handleChange = (
    index: number,
    key: keyof WorkExperience,
    value: string,
  ) => {
    const updated = [...formData.workExperience];
    updated[index] = {
      ...updated[index],
      [key]: value,
    };
    setFormData({ ...formData, workExperience: updated });
  };

  const handleAdd = () => {
    setFormData({
      ...formData,
      workExperience: [
        ...formData.workExperience,
        {
          company: "",
          position: "",
          date: "",
          description: "",
        },
      ],
    });
  };

  const handleDelete = (indexToDelete: number) => {
    const updated = formData.workExperience.filter(
      (_, index) => index !== indexToDelete,
    );

    setFormData({
      ...formData,
      workExperience: updated,
    });
  };

  return (
    <ResumeFormLayout>
      {/* Always-visible header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <Briefcase size={20} />
          <span>WORK EXPERIENCE</span>
        </div>
        <div className="flex gap-2 text-muted-foreground">
          <ArrowDown className="w-4 h-4" />
          <Eye className="w-4 h-4" />
        </div>
      </div>

      {/* Experience entries, if any */}
      <div className="space-y-6">
        {formData.workExperience.map((experience, index) => (
          <div className="space-y-4" key={index}>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-medium">Company</label>
                <Button
                  variant="destructive"
                  size="icon"
                  className="bg-transparent"
                  onClick={() => handleDelete(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <Input
                value={experience.company}
                onChange={(e) => handleChange(index, "company", e.target.value)}
                placeholder="Company Name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Job Title</label>
                <Input
                  value={experience.position}
                  onChange={(e) =>
                    handleChange(index, "position", e.target.value)
                  }
                  placeholder="Job Title"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Date</label>
                <Input
                  value={experience.date}
                  onChange={(e) => handleChange(index, "date", e.target.value)}
                  placeholder="MM/YYYY - MM/YYYY"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1">Description</label>
              <Textarea
                value={experience.description}
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
                placeholder="Describe your responsibilities and achievements"
                rows={4}
              />
            </div>

            <hr className="border-muted" />
          </div>
        ))}
      </div>

      {/* Add Job Button (Always Visible) */}
      <div className="text-right pt-2">
        <Button variant="outline" onClick={handleAdd}>
          + Add Job
        </Button>
      </div>
    </ResumeFormLayout>
  );
}

export function EducationForm({ formData, setFormData }: Props) {
  const handleChange = (index: number, key: keyof Education, value: string) => {
    const updated = [...formData.education];
    updated[index] = {
      ...updated[index],
      [key]: value,
    };
    setFormData({ ...formData, education: updated });
  };

  const handleAdd = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          date: "",
          degree: "",
          description: "",
          gpa: "",
          institution: "",
        },
      ],
    });
  };

  const handleDelete = (indexToDelete: number) => {
    const updated = formData.education.filter(
      (_, index) => index !== indexToDelete,
    );

    setFormData({
      ...formData,
      education: updated,
    });
  };

  return (
    <ResumeFormLayout>
      {/* Always-visible header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <BookUser size={20} />
          <span>Education</span>
        </div>
        <div className="flex gap-2 text-muted-foreground">
          <ArrowDown className="w-4 h-4" />
          <Eye className="w-4 h-4" />
        </div>
      </div>

      {/* Experience entries, if any */}
      <div className="space-y-6">
        {formData.education.map((edu, index) => (
          <div className="space-y-4" key={index}>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-medium">Institution</label>

                <Button
                  variant="destructive"
                  size="icon"
                  className="bg-transparent"
                  onClick={() => handleDelete(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <Input
                value={edu.institution}
                onChange={(e) =>
                  handleChange(index, "institution", e.target.value)
                }
                placeholder="Institution Name"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Degree & Major</label>
              <Input
                value={edu.degree}
                onChange={(e) => handleChange(index, "degree", e.target.value)}
                placeholder="Degree & Major"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-medium">Date</label>
                </div>
                <Input
                  value={edu.date}
                  onChange={(e) => handleChange(index, "date", e.target.value)}
                  placeholder="MM/YYYY - MM/YYYY"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">GPA</label>
                <Input
                  value={edu.gpa}
                  onChange={(e) => handleChange(index, "gpa", e.target.value)}
                  placeholder="GPA"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1">
                Additional Information
              </label>
              <Textarea
                value={edu.description}
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
                placeholder="Describe your coursework, honors, or activities"
                rows={4}
              />
            </div>

            <hr className="border-muted" />
          </div>
        ))}
      </div>

      {/* Add Job Button (Always Visible) */}
      <div className="text-right pt-2">
        <Button variant="outline" onClick={handleAdd}>
          + Add Education
        </Button>
      </div>
    </ResumeFormLayout>
  );
}

export function ProjectForm({ formData, setFormData }: Props) {
  const handleChange = (index: number, key: keyof Project, value: string) => {
    const updated = [...formData.projects];
    updated[index] = {
      ...updated[index],
      [key]: value,
    };
    setFormData({ ...formData, projects: updated });
  };

  const handleAdd = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        {
          name: "",
          description: "",
          date: "",
        },
      ],
    });
  };

  const handleDelete = (indexToDelete: number) => {
    const updated = formData.projects.filter(
      (_, index) => index !== indexToDelete,
    );

    setFormData({
      ...formData,
      projects: updated,
    });
  };

  return (
    <ResumeFormLayout>
      {/* Always-visible header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <Lightbulb size={20} />
          <span>Project</span>
        </div>
        <div className="flex gap-2 text-muted-foreground">
          <ArrowDown className="w-4 h-4" />
          <Eye className="w-4 h-4" />
        </div>
      </div>

      {/* Experience entries, if any */}
      <div className="space-y-6">
        {formData.projects.map((pro, index) => (
          <div className="space-y-4" key={index}>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-medium">Project Name</label>

                <Button
                  variant="destructive"
                  size="icon"
                  className="bg-transparent"
                  onClick={() => handleDelete(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <Input
                value={pro.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                placeholder="Project Name"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Date</label>
              <Input
                value={pro.date}
                onChange={(e) => handleChange(index, "date", e.target.value)}
                placeholder="Date"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Description</label>
              <Textarea
                value={pro.description}
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
                placeholder="Describe the project, technologies used, and outcomes"
                rows={4}
              />
            </div>

            <hr className="border-muted" />
          </div>
        ))}
      </div>

      {/* Add Job Button (Always Visible) */}
      <div className="text-right pt-2">
        <Button variant="outline" onClick={handleAdd}>
          + Add Project
        </Button>
      </div>
    </ResumeFormLayout>
  );
}

export function SkillForm({ formData, setFormData }: Props) {
  const handleSkillChange = (value: string) => {
    setFormData({ ...formData, skills: value });
  };

  return (
    <ResumeFormLayout>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <Lightbulb size={20} />
          <span>Skills</span>
        </div>
        <div className="flex gap-2 text-muted-foreground">
          <ArrowDown className="w-4 h-4" />
          <Eye className="w-4 h-4" />
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">
          Enter one skill per line
        </label>
        <Textarea
          value={formData.skills}
          onChange={(e) => handleSkillChange(e.target.value)}
          placeholder={`\nJavaScript\nReact\nTailwind CSS`}
          rows={6}
        />
      </div>
    </ResumeFormLayout>
  );
}
