"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { studentFormSchema } from "@/lib/formSchema";

type StudentFormValues = z.infer<typeof studentFormSchema>;

interface Step4EducationInfoProps {
  defaultValues: Partial<StudentFormValues>;
  onNext: (data: StudentFormValues) => void;
  onBack: () => void;
  onNotStudent: () => void;
}

export default function Step3EducationInfo({
  defaultValues,
  onNext,
  onBack,
  onNotStudent,
}: Step4EducationInfoProps) {
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      school: defaultValues.school || "",
      degree: defaultValues.degree || "",
      fieldOfStudy: defaultValues.fieldOfStudy || "",
      startYear: (defaultValues.startYear as number) || undefined,
      endYear: (defaultValues.endYear as number) || undefined,
    },
  });

  const handleSubmit = (data: StudentFormValues) => {
    onNext(data);
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="school"
            render={({ field }) => (
              <FormItem>
                <FormLabel>School</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your school name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="degree"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Degree</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Bachelor's, Master's" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fieldOfStudy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Field of Study</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Computer Science" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="startYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Year</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 2020" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Year</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 2024" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <div className="space-x-2">
              <Button type="button" variant="ghost" onClick={onNotStudent}>
                I’m not a student
              </Button>
              <Button type="submit">Next</Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
