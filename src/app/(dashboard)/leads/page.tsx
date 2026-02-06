import { getLeads } from "@/actions/leads"
import LeadBoard from "@/components/features/crm/lead-board"

export default async function LeadsPage() {
    const { leads } = await getLeads()

    return (
        <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Lead Management</h2>
            </div>
            <LeadBoard leads={leads || []} />
        </div>
    )
}
