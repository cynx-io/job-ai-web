"use client";

import { z } from "zod";

const linkedInRegex =
  /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-_%]+\/?$/;

// home page form schema
export const homePageFormSchema = z.object({
  linkedInUrl: z
    .string()
    .url("Must be a valid URL")
    .regex(linkedInRegex, "Must be a valid LinkedIn profile URL"),
});

// progressive disclosure form input
// step 1 ( location and phone )
export const locationPhoneFormSchema = z.object({
  location: z.string().min(1, "Location is required"),
  phone: z.string().min(8, "Phone number is required"),
});

// step 2 ( recent job titles ) => can choose im a student
export const recentJobTitleFormSchema = z.object({
  recentJobTitles: z.string().min(1, "Job title is required"),
});

// step 3 ( if user input the job title ) => can choose 3 title and 1 location
export const notStudentFormSchema = z.object({
  jobTitles: z
    .array(z.string().min(1, "Job title cannot be empty"))
    .min(1, "Select at least 1 job title")
    .max(3, "You can select up to 3 job titles"),
  jobLocation: z.string().min(1, "Job location is required"),
});

// step 4 ( if user press the im a student button ) => school, degree, field of study, start year, end year => can choose im not a student
export const studentFormSchema = z
  .object({
    school: z.string().min(1, "School name is required"),
    degree: z.string().min(1, "Degree is required"),
    fieldOfStudy: z.string().min(1, "Field of study is required"),
    startYear: z
      .number({ invalid_type_error: "Start year must be a number" })
      .min(1900, "Start year must be valid")
      .max(new Date().getFullYear(), "Start year can't be in the future"),
    endYear: z
      .number({ invalid_type_error: "End year must be a number" })
      .min(1900, "End year must be valid")
      .max(new Date().getFullYear() + 10, "End year is too far in the future"),
  })
  .refine((data) => data.endYear >= data.startYear, {
    message: "End year must be greater than or equal to start year",
    path: ["endYear"],
  });
