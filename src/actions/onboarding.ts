"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"

export async function submitOnboarding(formData: FormData) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { error: "Not authenticated" }
    }

    const businessName = formData.get("businessName") as string
    const industry = formData.get("industry") as string
    const city = formData.get("city") as string
    const serviceArea = formData.get("serviceArea") as string
    const monthlyBudget = parseFloat(formData.get("monthlyBudget") as string)
    const goal = formData.get("goal") as string
    const websiteUrl = formData.get("websiteUrl") as string

    const currentProblems = (formData.get("currentProblems") as string).split(",")
    const competitors = (formData.get("competitors") as string).split(",")
    const targetAudience = formData.get("targetAudience") as string
    const uniqueSellingPoint = formData.get("uniqueSellingPoint") as string

    // 1. Create Business Profile
    const { data: business, error: businessError } = await supabase
        .from("businesses")
        .insert({
            user_id: user.id,
            name: businessName,
            industry,
            city,
            service_area: serviceArea,
            monthly_budget: monthlyBudget,
            goal,
            website_url: websiteUrl,
        })
        .select()
        .single()

    if (businessError) {
        return { error: businessError.message }
    }

    // 2. Save Onboarding Responses
    const { error: responseError } = await supabase
        .from("onboarding_responses")
        .insert({
            business_id: business.id,
            current_problems: currentProblems,
            competitors: competitors,
            target_audience: targetAudience,
            unique_selling_point: uniqueSellingPoint,
        })

    if (responseError) {
        return { error: responseError.message }
    }

    // 3. (Optional) Trigger AI Plan Generation here or redirect to a page that does it

    revalidatePath("/dashboard")
    redirect("/dashboard/growth-plan")
}
