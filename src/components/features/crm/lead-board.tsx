"use client"

import * as React from "react"
import { updateLeadStatus, addLead } from "@/actions/leads"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, MessageCircle, Phone, Plus, Search } from "lucide-react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function LeadBoard({ leads }: { leads: any[] }) {
    const [isAdding, setIsAdding] = React.useState(false)
    const [searchTerm, setSearchTerm] = React.useState("")

    const filteredLeads = leads?.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone?.includes(searchTerm)
    )

    const handleStatusChange = async (leadId: string, status: string) => {
        await updateLeadStatus(leadId, status)
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Lead Inbox</CardTitle>
                        <CardDescription>Manage and track your customer leads</CardDescription>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" /> Add Manual Lead
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Lead</DialogTitle>
                                <DialogDescription>Enter customer details manually.</DialogDescription>
                            </DialogHeader>
                            <form action={async (formData) => {
                                setIsAdding(true)
                                await addLead(formData)
                                setIsAdding(false)
                            }}>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">Name</Label>
                                        <Input id="name" name="name" className="col-span-3" required />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="phone" className="text-right">Phone</Label>
                                        <Input id="phone" name="phone" className="col-span-3" required />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="email" className="text-right">Email</Label>
                                        <Input id="email" name="email" className="col-span-3" />
                                    </div>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="source" className="text-right">Source</Label>
                                            <div className="col-span-3"> {/* Wrap Select to ensure layout */}
                                                <Select name="source" defaultValue="walk-in">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="walk-in">Walk-in</SelectItem>
                                                        <SelectItem value="phone">Phone Call</SelectItem>
                                                        <SelectItem value="referral">Referral</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="notes" className="text-right">Notes</Label>
                                        <Textarea id="notes" name="notes" className="col-span-3" />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit" disabled={isAdding}>
                                        {isAdding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Save Lead
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2 mb-4">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search leads by name or phone..."
                        className="max-w-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    {filteredLeads?.length === 0 ? (
                        <p className="text-center text-muted-foreground py-8">No leads found.</p>
                    ) : (
                        filteredLeads?.map((lead) => (
                            <div key={lead.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/5 transition-colors">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-semibold truncate">{lead.name}</h4>
                                        <span className="text-xs text-muted-foreground border px-1.5 py-0.5 rounded capitalize">{lead.source}</span>
                                    </div>
                                    <div className="text-sm text-muted-foreground flex gap-3 mt-1">
                                        {lead.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {lead.phone}</span>}
                                        {lead.email && <span className="flex items-center gap-1">@ {lead.email}</span>}
                                    </div>
                                    {lead.notes && <p className="text-xs text-muted-foreground mt-1 italic truncate max-w-md">{lead.notes}</p>}
                                </div>

                                <div className="flex items-center gap-3">
                                    <Select
                                        defaultValue={lead.status}
                                        onValueChange={(val) => handleStatusChange(lead.id, val)}
                                    >
                                        <SelectTrigger className={`w-[130px] h-8 text-xs font-medium ${lead.status === 'new' ? 'border-blue-200 text-blue-700 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400' :
                                            lead.status === 'converted' ? 'border-green-200 text-green-700 bg-green-50 dark:bg-green-900/20 dark:text-green-400' :
                                                lead.status === 'lost' ? 'border-red-200 text-red-700 bg-red-50 dark:bg-red-900/20 dark:text-red-400' :
                                                    'border-gray-200 text-gray-700'
                                            }`}>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="new">New</SelectItem>
                                            <SelectItem value="contacted">Contacted</SelectItem>
                                            <SelectItem value="converted">Won / Sold</SelectItem>
                                            <SelectItem value="lost">Lost</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <Button size="icon" variant="outline" className="h-8 w-8 text-green-600 border-green-200 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/40">
                                        <MessageCircle className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
