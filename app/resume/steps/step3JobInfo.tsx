"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { notStudentFormSchema } from "@/lib/formSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { jobList } from "@/lib/jobList";
type FormData = z.infer<typeof notStudentFormSchema>;

interface Step3JobInfoProps {
  defaultValues: FormData;
  onNext: (data: FormData) => void;
  onBack: () => void;
}

const Step3JobInfo = ({ defaultValues, onNext, onBack }: Step3JobInfoProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(notStudentFormSchema),
    defaultValues,
  });

  const [jobInput, setJobInput] = useState("");

  const addJobTitle = () => {
    const trimmed = jobInput.trim();
    if (
      trimmed &&
      !form.getValues("jobTitles").includes(trimmed) &&
      form.getValues("jobTitles").length < 3
    ) {
      form.setValue("jobTitles", [...form.getValues("jobTitles"), trimmed]);
      setJobInput("");
    }
  };

  const removeJobTitle = (title: string) => {
    const newTitles = form.getValues("jobTitles").filter((t) => t !== title);
    form.setValue("jobTitles", newTitles);
  };

  const onSubmit = (data: FormData) => {
    onNext(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="jobTitles">Job Titles (max 3)</Label>
          <div className="flex gap-3 mt-2 w-full">
            <Select
              onValueChange={(value) => setJobInput(value)}
              value={jobInput}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a job" />
              </SelectTrigger>
              <SelectContent>
                {jobList.map((jobTitle, index) => (
                  <SelectItem key={index} value={jobTitle}>
                    {jobTitle}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              type="button"
              onClick={addJobTitle}
              disabled={!jobInput.trim()}
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {form.watch("jobTitles").map((title) => (
              <span
                key={title}
                className="bg-muted px-3 py-1 rounded-full flex items-center gap-1"
              >
                {title}
                <button
                  type="button"
                  className="text-red-500 ml-1 cursor-pointer"
                  onClick={() => removeJobTitle(title)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          {form.formState.errors.jobTitles && (
            <p className="text-sm text-red-600 mt-1">
              {form.formState.errors.jobTitles.message}
            </p>
          )}
        </div>

        <FormField
          control={form.control}
          name="jobLocation"
          render={({ field }) => (
            <FormItem>
              <Label>Job Location</Label>
              <Input placeholder="Enter job location" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  );
};

export default Step3JobInfo;
