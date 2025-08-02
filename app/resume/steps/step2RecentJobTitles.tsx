"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { recentJobTitleFormSchema } from "@/lib/formSchema";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { jobList } from "@/lib/jobList";

type Step2RecentJobTitlesProps = {
  onNext: (data: z.infer<typeof recentJobTitleFormSchema>) => void;
  onBack: () => void;
  onSelectStudent: () => void;
  onSelectOther: () => void;
  defaultValues: {
    recentJobTitles: string;
  };
};

export default function Step2RecentJobTitles({
  onNext,
  onBack,
  onSelectStudent,
  onSelectOther,
  defaultValues,
}: Step2RecentJobTitlesProps) {
  const form = useForm<z.infer<typeof recentJobTitleFormSchema>>({
    resolver: zodResolver(recentJobTitleFormSchema),
    defaultValues,
  });

  const handleSubmit = (data: z.infer<typeof recentJobTitleFormSchema>) => {
    console.log("Step 2 submitted:", data);
    onNext(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="recentJobTitles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Most Recent Job Title</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your recent job title" />
                  </SelectTrigger>
                  <SelectContent className="max-h-64 overflow-y-auto">
                    {jobList.map((jobTitle, index) => (
                      <SelectItem key={index} value={jobTitle}>
                        {jobTitle}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-4">
          <Button type="submit" className="w-full">
            Continue
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={onSelectStudent}
          >
            I’m a Student
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={onSelectOther}
          >
            Don't Have a Job Yet
          </Button>
          <Button variant="ghost" type="button" onClick={onBack}>
            Back
          </Button>
        </div>
      </form>
    </Form>
  );
}
