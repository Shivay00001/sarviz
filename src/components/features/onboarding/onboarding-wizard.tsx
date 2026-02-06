"use client"

import * as React from "react"
import { useRouter } from "next/navigation" // Correct import for App Router
import { submitOnboarding } from "@/actions/onboarding"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

export default function OnboardingWizard() {
    const [step, setStep] = React.useState(1)
    const [isSubmitting, setIsSubmitting] = React.useState(false) // Added submitting state
    const formRef = React.useRef<HTMLFormElement>(null)

    const handleNext = (e: React.MouseEvent) => {
        e.preventDefault()
        setStep(step + 1)
    }

    const handleBack = (e: React.MouseEvent) => {
        e.preventDefault()
        setStep(step - 1)
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Business Onboarding</CardTitle>
                <CardDescription>Step {step} of 3: Tell us about your business</CardDescription>
            </CardHeader>
            <CardContent>
                <form ref={formRef} action={async (formData) => {
                    setIsSubmitting(true)
                    await submitOnboarding(formData)
                    setIsSubmitting(false)
                }} className="space-y-4">
                    {step === 1 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="businessName">Business Name</Label>
                                    <Input id="businessName" name="businessName" required placeholder="Acme Inc." />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="industry">Category / Industry</Label>
                                    <Select name="industry" required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="retail">Retail Shop</SelectItem>
                                            <SelectItem value="clinic">Clinic / Healthcare</SelectItem>
                                            <SelectItem value="coaching">Coaching / Education</SelectItem>
                                            <SelectItem value="restaurant">Restaurant / Cafe</SelectItem>
                                            <SelectItem value="services">Professional Services</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" name="city" required placeholder="Mumbai" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="serviceArea">Service Area (Radius/Locality)</Label>
                                    <Input id="serviceArea" name="serviceArea" required placeholder="e.g. Bandra West, 5km radius" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="websiteUrl">Website URL (Optional)</Label>
                                <Input id="websiteUrl" name="websiteUrl" placeholder="https://..." />
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="space-y-2">
                                <Label htmlFor="monthlyBudget">Monthly Marketing Budget (₹)</Label>
                                <Select name="monthlyBudget" required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select budget..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="10000">₹5,000 - ₹10,000</SelectItem>
                                        <SelectItem value="25000">₹10,000 - ₹25,000</SelectItem>
                                        <SelectItem value="50000">₹25,000 - ₹50,000</SelectItem>
                                        <SelectItem value="100000">₹50,000+</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="goal">Primary Goal</Label>
                                <Select name="goal" required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="What do you want more of?" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="calls">Phone Calls</SelectItem>
                                        <SelectItem value="visits">Store Visits</SelectItem>
                                        <SelectItem value="leads">Website Leads / form fills</SelectItem>
                                        <SelectItem value="awareness">Brand Awareness</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="targetAudience">Target Audience</Label>
                                <Textarea id="targetAudience" name="targetAudience" required placeholder="Describe your ideal customer (e.g. Parents of teenagers, Homeowners looking for renovation)..." />
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="space-y-2">
                                <Label htmlFor="currentProblems">Current Marketing Challenges (comma separated)</Label>
                                <Textarea id="currentProblems" name="currentProblems" placeholder="e.g. Leads are too expensive, Low quality leads, No time to post..." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="competitors">Top Competitors (comma separated)</Label>
                                <Textarea id="competitors" name="competitors" placeholder="e.g. Competitor A, Competitor B..." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="uniqueSellingPoint">What makes you unique?</Label>
                                <Textarea id="uniqueSellingPoint" name="uniqueSellingPoint" placeholder="e.g. 24/7 Service, Lowest Price Guarantee, 10 years experience..." />
                            </div>
                        </div>
                    )}
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleBack} disabled={step === 1 || isSubmitting}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                {step < 3 ? (
                    <Button onClick={handleNext}>
                        Next <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                ) : (
                    <Button onClick={() => formRef.current?.requestSubmit()} disabled={isSubmitting}>
                        {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</> : "Generate Growth Plan"}
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}
