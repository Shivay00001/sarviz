"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Copy, DollarSign, Lightbulb, LineChart, Megaphone, Target } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GrowthPlanViewerProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    plan: any
}

export default function GrowthPlanViewer({ plan }: GrowthPlanViewerProps) {
    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Recommended Platforms */}
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-100 dark:border-blue-900">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Top Platforms</CardTitle>
                        <Megaphone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                            {plan.platforms_recommended?.join(", ")}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Best channels for your industry
                        </p>
                    </CardContent>
                </Card>

                {/* Daily Budget */}
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-100 dark:border-green-900">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Daily Budget</CardTitle>
                        <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                            ₹{plan.daily_budget_suggestion}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Recommended starting spend
                        </p>
                    </CardContent>
                </Card>

                {/* Focus Goal */}
                <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 border-orange-100 dark:border-orange-900">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Strategy Focus</CardTitle>
                        <Target className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">Conversion</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Optimized for maximum leads
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Marketing Funnel */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <LineChart className="h-5 w-5 text-purple-500" />
                            Your Marketing Funnel
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {plan.marketing_funnel?.map((step: any, idx: number) => (
                            <div key={idx} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                                <div className="bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                                    {idx + 1}
                                </div>
                                <div>
                                    <h4 className="font-semibold">{step.stage}</h4>
                                    <p className="text-sm font-medium mt-1">{step.action}</p>
                                    <p className="text-sm text-muted-foreground mt-1">💡 {step.tips}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Ad Copy Suggestions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Lightbulb className="h-5 w-5 text-yellow-500" />
                            Ad Copy Ideas
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {plan.ad_copy_suggestions?.map((ad: any, idx: number) => (
                            <div key={idx} className="p-4 border rounded-lg bg-card">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold px-2 py-1 bg-primary/10 text-primary rounded uppercase">{ad.platform}</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                        <Copy className="h-3 w-3" />
                                    </Button>
                                </div>
                                <p className="text-sm italic">&quot;{ad.copy}&quot;</p>
                            </div>
                        ))}

                        <div className="mt-6">
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                                <Target className="h-4 w-4 text-red-500" /> Irresistible Offers
                            </h4>
                            <ul className="list-disc pl-5 space-y-1 text-sm">
                                {plan.offer_ideas?.map((offer: string, idx: number) => (
                                    <li key={idx}>{offer}</li>
                                ))}
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* SEO Checklist */}
            <Card>
                <CardHeader>
                    <CardTitle>Local SEO Checklist</CardTitle>
                    <CardDescription>Improve your local ranking with these steps</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {plan.seo_checklist?.map((item: any, idx: number) => (
                            <div key={idx} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded transition-colors group">
                                <CheckCircle2 className={`h-5 w-5 ${item.impact === 'High' ? 'text-green-500' : 'text-gray-400'}`} />
                                <div className="flex-1">
                                    <span className={item.checked ? "line-through text-muted-foreground" : ""}>{item.task}</span>
                                </div>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${item.impact === 'High' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                    item.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                        'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                                    }`}>
                                    {item.impact} Impact
                                </span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
