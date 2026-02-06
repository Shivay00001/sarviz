import { getGrowthPlan } from "@/actions/growth-plan"
import GrowthPlanViewer from "@/components/features/growth/growth-plan-viewer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default async function GrowthPlanPage() {
    const { plan, error } = await getGrowthPlan()

    if (error || !plan) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <h2 className="text-xl font-semibold">Growth Plan Not Found</h2>
                <p className="text-muted-foreground">{error === "Onboarding incomplete" ? "Please complete onboarding to generate your plan." : "Something went wrong."}</p>
                <Button asChild>
                    <Link href="/dashboard/onboarding">Go to Onboarding <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Your AI Growth Plan</h2>
                <div className="flex items-center space-x-2">
                    <Button>Download PDF</Button>
                </div>
            </div>
            <GrowthPlanViewer plan={plan} />
        </div>
    )
}
