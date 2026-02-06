import OnboardingWizard from "@/components/features/onboarding/onboarding-wizard"

export default function OnboardingPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] py-8">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome to Sarviz</h1>
                <p className="text-muted-foreground">Let&apos;s set up your business profile to generate your AI growth plan.</p>
            </div>
            <OnboardingWizard />
        </div>
    )
}
