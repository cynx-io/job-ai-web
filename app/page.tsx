"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BrainCircuit, Search, Target, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-animated-gradient">
      {/* Hero Section */}
      <section className="relative px-6 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 animate-float">
            <BrainCircuit className="mx-auto h-16 w-16 text-blue-600" />
          </div>

          <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 md:text-6xl">
            Find Your Dream Job with{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Power
            </span>
          </h1>

          <p className="mb-8 text-xl text-gray-600 md:text-2xl">
            Let artificial intelligence match you with the perfect career
            opportunities. Smart job search, personalized recommendations, and
            instant matches.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="text-lg px-8 py-4">
              Start Job Search
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Why Choose JobAI?
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="text-center transition-transform hover:scale-105">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Search className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Smart Search</CardTitle>
                <CardDescription>
                  AI-powered job search that understands your skills and
                  preferences
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center transition-transform hover:scale-105">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Perfect Matches</CardTitle>
                <CardDescription>
                  Get matched with jobs that align perfectly with your career
                  goals
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center transition-transform hover:scale-105">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Instant Results</CardTitle>
                <CardDescription>
                  Lightning-fast job recommendations powered by advanced AI
                  algorithms
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <Card className="border-2 border-blue-200 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl">
                Ready to Find Your Next Opportunity?
              </CardTitle>
              <CardDescription className="text-lg">
                Join thousands of professionals who have found their dream jobs
                with JobAI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg" className="text-lg px-12 py-4">
                Get Started Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/50 backdrop-blur-sm px-6 py-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-gray-600">
            © 2024 JobAI. All rights reserved. Powered by artificial
            intelligence.
          </p>
        </div>
      </footer>
    </div>
  );
}
