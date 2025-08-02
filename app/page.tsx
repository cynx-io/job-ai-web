"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowRight,
  Check,
  Download,
  Quote,
  Star,
  StarHalfIcon,
  StarIcon,
  Upload,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { homePageFormSchema } from "@/lib/formSchema";
import HomePageNavigationBar from "@/components/app/homepage/homePageNavigationBar";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* {Navigation Bar} */}
      <HomePageNavigationBar />

      {/* Hero */}
      <HomePageHero />

      {/* {How it works} */}
      <HomePageHowItWorks />

      {/* {Pricing} */}
      <HomePagePricing />

      {/* {What people say about us} */}
      <HomePageTestimonial />

      {/* Footer */}
      <HomePageFooter />
    </div>
  );
}

function HomePageHero() {
  return (
    <section className="my-32 px-12 sm:px-20 md:px-28 flex flex-col gap-5 justify-center items-center text-center">
      <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold">
        <span className="bg-gradient-to-r from-primary to-chart-1/80 bg-clip-text text-transparent pr-2">
          Automate
        </span>
        Your Job Application Process
      </h1>
      <h3 className="text-md sm:text-2xl text-muted-foreground">
        Our AI Job search tool automatically apply to all the jobs on platforms
        like Linkedin, Indeed and Ziprecruiter using Job GPT.
      </h3>

      <div className="flex gap-5 items-center">
        <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 ">
          <Avatar>
            <AvatarImage src="https://github.com/Cynxees.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage
              src="https://github.com/chriistopher1.png"
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-1 items-center">
            <h3>4.9</h3>
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
          <h4>Over 10000+ users</h4>
        </div>
      </div>
      <CopyableText text="https://www.linkedin.com/in/christopher-hu-921ab421b/" />
      <div className="w-full sm:w-[80%] md:w-[60%]">
        <HomePageForm />
      </div>
    </section>
  );
}

function HomePageForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof homePageFormSchema>>({
    resolver: zodResolver(homePageFormSchema),
    defaultValues: {
      linkedInUrl: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof homePageFormSchema>) {
    console.log(values);
    router.push("/resume");
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="linkedInUrl"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl className="w-full">
                <Input
                  className="w-full"
                  placeholder="https://www.linkedin.com/in/christopher-hu-921ab421b/"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Create Your ATS Friendly Resume
        </Button>
      </form>
    </Form>
  );
}

function HomePageHowItWorks() {
  const steps = [
    {
      icon: Upload,
      step: "01",
      title: "Upload or Create",
      description:
        "Upload your existing CV or start from scratch with our intuitive builder.",
    },
    {
      icon: Zap,
      step: "02",
      title: "AI Optimization",
      description:
        "Our AI analyzes your CV and provides instant feedback and optimization suggestions.",
    },
    {
      icon: Download,
      step: "03",
      title: "Download & Apply",
      description:
        "Export your optimized, professional CV and start applying to your dream jobs.",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.05 }}
      className="py-24 bg-gradient-to-b from-accent/20 to-background"
    >
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Get Started in{" "}
            <span className="bg-gradient-to-r from-primary to-chart-1/80 bg-clip-text text-transparent">
              3 Simple Steps
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From upload to hire-ready CV in minutes. Our streamlined process
            makes CV optimization effortless and effective.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-success" />

                <CardHeader className="pt-8 pb-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-success rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>

                  <div className="text-sm font-bold text-primary mb-2">
                    STEP {step.step}
                  </div>
                  <CardTitle className="text-2xl">{step.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function HomePagePricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for trying out our AI-powered CV builder",
      features: [
        "1 CV creation",
        "Basic AI optimization",
        "3 template designs",
        "PDF export",
        "Basic ATS scoring",
      ],
      cta: "Get Started Free",
      variant: "outline" as const,
      popular: false,
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "month",
      description: "Ideal for active job seekers and career changers",
      features: [
        "Unlimited CV creation",
        "Advanced AI optimization",
        "20+ premium templates",
        "Cover letter builder",
        "Advanced ATS scoring",
        "Job description matching",
        "LinkedIn optimization",
        "Priority support",
      ],
      cta: "Start Pro Trial",
      variant: "hero" as const,
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$29.99",
      period: "month",
      description: "For teams, recruiters, and career coaches",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "White-label solutions",
        "API access",
        "Custom templates",
        "Analytics dashboard",
        "Dedicated account manager",
        "Custom integrations",
      ],
      cta: "Contact Sales",
      variant: "outline" as const,
      popular: false,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.1 }}
      className=" bg-gradient-to-b from-accent/20 to-background"
    >
      <section className=" bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-chart-1/80 bg-clip-text text-transparent">
              Choose Your Plan
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Start free and upgrade as your career grows. All plans include our
              core AI optimization features.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative transition-all duration-300 hover:shadow-lg ${
                  plan.popular ? "border-primary shadow-lg scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary to-success text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">
                      /{plan.period}
                    </span>
                  </div>
                  <CardDescription className="mt-2">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center space-x-3"
                    >
                      <Check className="h-5 w-5 text-success flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </CardContent>

                <CardFooter>
                  <Button
                    // variant={plan.variant}
                    className="w-full"
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground">
              All plans include 30-day money-back guarantee • No hidden fees •
              Cancel anytime
            </p>
          </div>
        </div>
      </section>
    </motion.section>
  );
}

function HomePageTestimonial() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      company: "Tech Startup",
      content:
        "JobAI CV Builder helped me land my dream job! The AI feedback was incredibly insightful and helped me tailor my CV perfectly for tech roles.",
      rating: 5,
      avatar: "SC",
    },
    {
      name: "Marcus Johnson",
      role: "Marketing Manager",
      company: "Fortune 500",
      content:
        "The ATS optimization feature is a game-changer. My CV now gets past the initial screening every time. Highly recommended!",
      rating: 5,
      avatar: "MJ",
    },
    {
      name: "Emily Rodriguez",
      role: "Recent Graduate",
      company: "Consulting Firm",
      content:
        "As a new graduate, I struggled with my CV. This tool guided me step-by-step and helped me create a professional CV that got results.",
      rating: 5,
      avatar: "ER",
    },
  ];
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.1 }}
      className="bg-gradient-to-b from-accent/20 to-background"
    >
      <section className="py-24 bg-gradient-to-b from-background to-accent/10">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold">
              What Our{" "}
              <span className="bg-gradient-to-r from-primary to-chart-1/80 bg-clip-text text-transparent">
                Users Say
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of job seekers who have successfully improved their
              CVs and landed their dream jobs with our AI-powered platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 text-primary/10">
                  <Quote className="w-24 h-24 rotate-12" />
                </div>

                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1 mt-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </CardHeader>

                <CardContent>
                  <CardDescription className="text-base leading-relaxed italic">
                    "{testimonial.content}"
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats section */}
          <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">10,000+</div>
              <div className="text-muted-foreground">CVs Optimized</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-success">85%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">4.9/5</div>
              <div className="text-muted-foreground">User Rating</div>
            </div>
          </div>
        </div>
      </section>
    </motion.section>
  );
}

function HomePageFooter() {
  return (
    <footer className="border-t bg-white/50 backdrop-blur-sm px-6 py-8">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-gray-600">
          © 2024 JobAI. All rights reserved. Powered by artificial
          intelligence.
        </p>
      </div>
    </footer>
  );
}

function CopyableText({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // reset after 1.5s
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm px-2 py-1 rounded">{text}</span>
      <button
        onClick={copyToClipboard}
        className="text-blue-600 hover:underline text-sm"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}
