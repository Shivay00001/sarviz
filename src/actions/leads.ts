"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

export async function getLeads() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { leads: [] }

    const { data: leads, error } = await supabase
        .from("leads")
        .select("*, businesses!inner(user_id)")
        .eq("businesses.user_id", user.id)
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Get Leads Error", error)
        return { leads: [] }
    }

    return { leads }
}

export async function updateLeadStatus(leadId: string, status: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: "Not authenticated" }

    // Verify ownership implicitly via RLS or explicit check.
    // RLS policy: Access own leads.
    // We can just update directly, RLS will fail if not owned.

    const { error } = await supabase
        .from("leads")
        .update({ status })
        .eq("id", leadId)

    if (error) return { error: error.message }

    revalidatePath("/dashboard/leads")
    return { success: true }
}

export async function addLead(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: "Not authenticated" }

    const { data: business } = await supabase
        .from("businesses")
        .select("id")
        .eq("user_id", user.id)
        .single()

    if (!business) return { error: "Business not found" }

    const name = formData.get("name") as string
    const phone = formData.get("phone") as string
    const email = formData.get("email") as string
    const source = formData.get("source") as string
    const notes = formData.get("notes") as string

    const { error } = await supabase
        .from("leads")
        .insert({
            business_id: business.id,
            name,
            phone,
            email,
            source,
            status: "new",
            notes
        })

    if (error) return { error: error.message }

    revalidatePath("/dashboard/leads")
    return { success: true }
}
