"use client"

import Link from "next/link"
import { MoreHorizontal, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Campaign = {
    id: string
    name: string
    platform: string
    status: string
    budget: number
    start_date: string
    end_date: string
}

export default function CampaignList({ campaigns }: { campaigns: Campaign[] }) {
    if (campaigns.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center border rounded-lg p-12 bg-muted/10 border-dashed">
                <h3 className="text-lg font-semibold mb-2">No Campaigns Yet</h3>
                <p className="text-muted-foreground mb-4 text-center max-w-sm">Create your first ad campaign to start getting more customers.</p>
                <Button asChild>
                    <Link href="/dashboard/campaigns/new"><Plus className="mr-2 h-4 w-4" /> Create Campaign</Link>
                </Button>
            </div>
        )
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Campaigns</CardTitle>
                        <CardDescription>Manage your ads across platforms</CardDescription>
                    </div>
                    <Button asChild size="sm">
                        <Link href="/dashboard/campaigns/new"><Plus className="mr-2 h-4 w-4" /> New Campaign</Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {campaigns.map((campaign) => (
                        <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-muted/50 transition-colors">
                            <div className="space-y-1">
                                <h4 className="font-semibold">{campaign.name}</h4>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span className="capitalize px-2 py-0.5 rounded bg-secondary text-secondary-foreground text-xs">{campaign.platform}</span>
                                    <span>•</span>
                                    <span>₹{campaign.budget}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize border ${campaign.status === 'running' ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-900' :
                                        campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-900' :
                                            'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-800'
                                    }`}>
                                    {campaign.status}
                                </span>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Toggle menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                        <DropdownMenuItem>View Analytics</DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
