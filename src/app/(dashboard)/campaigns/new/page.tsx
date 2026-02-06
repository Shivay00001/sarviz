import CampaignForm from "@/components/features/campaigns/campaign-form"

export default function NewCampaignPage() {
    return (
        <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Launch Campaign</h2>
            </div>
            <CampaignForm />
        </div>
    )
}
