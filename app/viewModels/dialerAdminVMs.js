function CampaignSummaryVM(campaign) {
    this.name = campaign.name;
    this.status = this.convertStatus(campaign.status);
    this.startDate = campaign.start_date;
    this.endDate = campaign.end_date;

    this.convertStatus = function(status) {
        switch (status) {
            case "active" :
                return "running";
            case "paused" :
                return "paused";
            case "ended" :
                return "expired";
            case "stopped" :
                return "stopped";
            case "not_started" :
                return "pending";
            default:
                return "invalid";
        }
    }
}