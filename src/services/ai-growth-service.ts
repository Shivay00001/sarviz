export interface GrowthPlanData {
    platforms_recommended: string[]
    daily_budget_suggestion: number
    marketing_funnel: {
        stage: string
        action: string
        tips: string
    }[]
    offer_ideas: string[]
    ad_copy_suggestions: {
        platform: string
        copy: string
    }[]
    seo_checklist: {
        task: string
        impact: "High" | "Medium" | "Low"
    }[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateGrowthPlan(business: any, responses: any): GrowthPlanData {
    const industry = business.industry || "general"
    const goal = business.goal || "leads"
    const city = business.city || "your city"

    const plan: GrowthPlanData = {
        platforms_recommended: [],
        daily_budget_suggestion: 0,
        marketing_funnel: [],
        offer_ideas: [],
        ad_copy_suggestions: [],
        seo_checklist: []
    }

    // 1. Platform Recommendations
    if (industry === "retail" || industry === "restaurant") {
        plan.platforms_recommended = ["Instagram", "Google Maps", "Facebook"]
    } else if (industry === "services" || industry === "clinic") {
        plan.platforms_recommended = ["Google Search", "Google Maps", "LinkedIn"]
    } else {
        plan.platforms_recommended = ["Google Search", "Facebook", "Instagram"]
    }

    // 2. Budget Suggestion (Simple rule: 10% of monthly budget / 30 days)
    const monthly = business.monthly_budget || 10000
    plan.daily_budget_suggestion = Math.round(monthly / 30)

    // 3. Marketing Funnel
    plan.marketing_funnel = [
        {
            stage: "Awareness",
            action: `Run ${plan.platforms_recommended[0]} Ads targeting people in ${business.service_area}`,
            tips: "Use bright images and clear value prop."
        },
        {
            stage: "Consideration",
            action: "Collect reviews on Google My Business",
            tips: "Ask happy customers to mention '" + industry + "' in reviews."
        },
        {
            stage: "Conversion",
            action: goal === "calls" ? "Add 'Call Now' button to ads" : "Create a lead form",
            tips: "Respond within 5 minutes."
        }
    ]

    // 4. Offer Ideas
    if (industry === "restaurant") {
        plan.offer_ideas = ["Buy 1 Get 1 Free", "Free Dessert with Meal", "10% Off for Reviews"]
    } else if (industry === "clinic") {
        plan.offer_ideas = ["Free Initial Consultation", "50% Off First Visit", "Health Checkup Bundle"]
    } else {
        plan.offer_ideas = ["Free Quote", "First Month Discount", "Referral Bonus"]
    }

    // 5. Ad Copy
    plan.ad_copy_suggestions = [
        {
            platform: "Google",
            copy: `Best ${industry} in ${city}? We offer ${responses.unique_selling_point || "great service"}. Call now!`
        },
        {
            platform: "Facebook/Insta",
            copy: `Stop struggling with ${responses.current_problems?.[0] || "problems"}. Get ${responses.unique_selling_point} today. Tap to learn more!`
        }
    ]

    // 6. SEO Checklist
    plan.seo_checklist = [
        { task: `Claim Google Business Profile in ${city}`, impact: "High" },
        { task: "Add at least 10 photos to GMB", impact: "Medium" },
        { task: "Get 5 new 5-star reviews", impact: "High" },
        { task: "Add services list to website/profile", impact: "Medium" }
    ]

    return plan
}
