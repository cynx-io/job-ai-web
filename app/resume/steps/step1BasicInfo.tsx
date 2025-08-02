"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { countries } from "countries-list";

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
import { locationPhoneFormSchema } from "@/lib/formSchema";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type Step1BasicInfoProps = {
  onNext: (data: z.infer<typeof locationPhoneFormSchema>) => void;
  defaultValues: z.infer<typeof locationPhoneFormSchema>;
};

export default function Step1BasicInfo({
  onNext,
  defaultValues,
}: Step1BasicInfoProps) {
  const form = useForm<z.infer<typeof locationPhoneFormSchema>>({
    resolver: zodResolver(locationPhoneFormSchema),
    defaultValues,
  });

  const handleSubmit = (data: z.infer<typeof locationPhoneFormSchema>) => {
    console.log("Step 1 submitted data:", data);
    onNext(data);
  };

  const countryEntries = Object.entries(countries).map(([code, data]) => ({
    code,
    name: data.name,
  }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent className="w-full max-h-64 overflow-y-auto">
                    {countryEntries.map(({ code, name }) => (
                      <SelectItem key={code} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 081234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full cursor-pointer">
          Continue
        </Button>
      </form>
    </Form>
  );
}
