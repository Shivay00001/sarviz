"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Loader2, Sparkles } from "lucide-react"

export default function SEOPage() {
    const [generatedPost, setGeneratedPost] = React.useState("")
    const [isGenerating, setIsGenerating] = React.useState(false)

    const handleGenerate = () => {
        setIsGenerating(true)
        setTimeout(() => {
            setGeneratedPost("📣 Special Offer! 🌟\n\nLooking for the best service in town? Visit us today and get 20% off your first purchase! We are dedicated to providing top-notch quality and customer satisfaction.\n\n📍 Visit us at: [Your Address/Link]\n📞 Call now: [Your Phone]\n\n#LocalBusiness #SpecialOffer #BestInTown")
            setIsGenerating(false)
        }, 1500)
    }

    return (
        <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Local SEO Tools</h2>
            </div>
            <Tabs defaultValue="post-generator" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="post-generator">Google Post Generator</TabsTrigger>
                    <TabsTrigger value="reviews">Review Management</TabsTrigger>
                </TabsList>
                <TabsContent value="post-generator" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Create Updates</CardTitle>
                                <CardDescription>
                                    Generate engaging posts for your Google Business Profile.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="topic">Post Topic / Offer</Label>
                                    <Input id="topic" placeholder="e.g. Summer Sale, New Menu Item..." />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="vibe">Tone</Label>
                                    <Input id="vibe" placeholder="Exciting, Professional, Urgent..." />
                                </div>
                                <Button onClick={handleGenerate} disabled={isGenerating}>
                                    {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                                    Generate with AI
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Preview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-muted p-4 rounded-md min-h-[200px] whitespace-pre-wrap text-sm">
                                    {generatedPost || "Your generated post will appear here..."}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full" onClick={() => navigator.clipboard.writeText(generatedPost)} disabled={!generatedPost}>
                                    <Copy className="mr-2 h-4 w-4" /> Copy to Clipboard
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="reviews">
                    <Card>
                        <CardHeader>
                            <CardTitle>Review Reply Templates</CardTitle>
                            <CardDescription>
                                Quick replies for your customers.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-3">
                                <Card className="bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-900">
                                    <CardHeader>
                                        <CardTitle className="text-sm">5 Star (Gratitude)</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-xs text-muted-foreground">&quot;Thank you so much for your kind words! We are thrilled to hear you had a great experience.&quot;</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="ghost" size="sm" className="w-full h-6 text-xs">Copy</Button>
                                    </CardFooter>
                                </Card>
                                <Card className="bg-yellow-50 dark:bg-yellow-900/10 border-yellow-100 dark:border-yellow-900">
                                    <CardHeader>
                                        <CardTitle className="text-sm">Neutral (Follow up)</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-xs text-muted-foreground">&quot;Thanks for visiting! We appreciate your feedback and hope to impress you even more next time.&quot;</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="ghost" size="sm" className="w-full h-6 text-xs">Copy</Button>
                                    </CardFooter>
                                </Card>
                                <Card className="bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900">
                                    <CardHeader>
                                        <CardTitle className="text-sm">Negative (Apology)</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-xs text-muted-foreground">&quot;We apologize for falling short. Please contact us directly so we can make it right.&quot;</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="ghost" size="sm" className="w-full h-6 text-xs">Copy</Button>
                                    </CardFooter>
                                </Card>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
