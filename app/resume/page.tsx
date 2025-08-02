import ResumeForm from "@/components/app/resume/resumeForm";


export default function ResumePage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl rounded-xl shadow-lg p-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 text-center bg-gradient-to-r from-primary to-chart-1/80 bg-clip-text text-transparent">Build Your Resume</h1>
        <ResumeForm />
      </div>
    </main>
  );
}
