// app/resume/components/ProgressBar.tsx

type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
};

export default function ResumeProgressBar({
  currentStep,
  totalSteps,
}: ProgressBarProps) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-1 text-sm text-muted-foreground">
        <span>
          Step {currentStep} of {totalSteps}
        </span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div
          className="h-2 bg-primary rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
