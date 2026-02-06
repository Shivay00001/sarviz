"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"

export async function getCampaigns() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { campaigns: [] }

    const { data: campaigns, error } = await supabase
        .from("campaigns")
        .select("*, businesses!inner(user_id)") // Filter by user ownership via join
        .eq("businesses.user_id", user.id)
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Get Campaigns Error", error)
        return { campaigns: [] }
    }

    return { campaigns }
}

export async function createCampaign(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: "Not authenticated" }

    // Get business id
    const { data: business } = await supabase
        .from("businesses")
        .select("id")
        .eq("user_id", user.id)
        .single()

    if (!business) return { error: "Business not found" }

    const name = formData.get("name") as string
    const platform = formData.get("platform") as string
    const status = formData.get("status") as string
    const budget = parseFloat(formData.get("budget") as string)
    const startDate = formData.get("startDate") as string
    const endDate = formData.get("endDate") as string

    const { error } = await supabase
        .from("campaigns")
        .insert({
            business_id: business.id,
            name,
            platform,
            status,
            budget,
            start_date: startDate || null,
            end_date: endDate || null
        })

    if (error) return { error: error.message }

    revalidatePath("/dashboard/campaigns")
    redirect("/dashboard/campaigns")
}
