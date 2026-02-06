"use client"

import { createCampaign } from "@/actions/campaigns"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CampaignForm() {
    const router = useRouter()
    const [isPending, setIsPending] = useState(false)

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Create New Campaign</CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    action={async (formData) => {
                        setIsPending(true)
                        await createCampaign(formData)
                        setIsPending(false)
                        router.push("/campaigns")
                    }}
                    className="space-y-6"
                >
                    <div className="space-y-2">
                        <Label htmlFor="name">Campaign Name</Label>
                        <Input id="name" name="name" placeholder="Summer Sale 2024" required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="platform">Platform</Label>
                            <Select name="platform" defaultValue="google">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Platform" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="google">Google Ads</SelectItem>
                                    <SelectItem value="facebook">Facebook Ads</SelectItem>
                                    <SelectItem value="instagram">Instagram Ads</SelectItem>
                                    <SelectItem value="linkedin">LinkedIn Ads</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select name="status" defaultValue="draft">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="running">Active</SelectItem>
                                    <SelectItem value="paused">Paused</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="budget">Total Budget (₹)</Label>
                        <Input id="budget" name="budget" type="number" placeholder="5000" required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="start_date">Start Date</Label>
                            <Input id="start_date" name="start_date" type="date" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="end_date">End Date</Label>
                            <Input id="end_date" name="end_date" type="date" required />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <Button variant="outline" type="button" onClick={() => router.back()}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Campaign
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
