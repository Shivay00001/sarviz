import { getCampaigns } from "@/actions/campaigns"
import CampaignList from "@/components/features/campaigns/campaign-list"

export default async function CampaignsPage() {
    const { campaigns } = await getCampaigns()

    return (
        <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Ads Manager</h2>
            </div>
            <CampaignList campaigns={campaigns || []} />
        </div>
    )
}
