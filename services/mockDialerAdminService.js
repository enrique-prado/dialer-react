var MockDialerAdminService = (function () {
    var moment = require('moment');

    //DATA MODELS
    var campainStatuses = [
            {value:1, label:"Running"},
            {value:2, label:"Paused"},
            {value:3, label:"Auto"},            
            {value:4, label:"Expired"}
        ];

    var campaigns = [
        { campaign_id:"100", name:"Sprint Campaign 1", client:"Sprint", start_date:"2015-11-26 08:00:00", end_date:"2015-11-30 20:00:00", status:"active", deleted:false, restart:false },
        { campaign_id:"200", name:"ATT Campaign", client:"ATT", start_date:"2015-11-26 08:00:00", end_date:"2015-11-30 20:00:00", status:"active", deleted:false, restart:false },
        { campaign_id:"300", name:"Charbroil Campaign", client:"Charbroil", start_date:"2015-11-26 08:00:00", end_date:"2015-11-30 20:00:00", status:"active", deleted:false, restart:false },
        { campaign_id:"400", name:"Sprint 2", client:"Sprint", start_date:"2015-11-26 08:00:00", end_date:"2015-11-30 20:00:00", status:"paused", deleted:false, restart:false },
        { campaign_id:"500", name:"Sprint Campaign 3", client:"Sprint", start_date:"2015-11-26 08:00:00", end_date:"2015-11-30 20:00:00", status:"ended", deleted:false, restart:false },
        { campaign_id:"600", name:"ATT Campaign 2", client:"ATT", start_date:"2015-11-26 08:00:00", end_date:"2015-11-30 20:00:00", status:"active", deleted:false, restart:false },
        { campaign_id:"700", name:"Charbroil Campaign 2", client:"Charbroil", start_date:"2015-11-26 08:00:00", end_date:"2015-11-30 20:00:00", status:"active", deleted:false, restart:false },
        { campaign_id:"800", name:"Sprint 3", client:"Sprint", start_date:"2015-11-26 08:00:00", end_date:"2015-11-30 20:00:00", status:"not_started", deleted:false, restart:false }
        
    ]


    //METHODS

    function getCampaignsSummaryMock(clientID) {
        console.log("getCampaignsSummary CALLED...");
        console.log("clientID = " + clientID );        

        return new Promise(function(resolve, reject) {
            var campaignsList = [];
            for (var i = 0; i < campaigns.length; i++) {
                if (campaigns[i].client == clientID) {
                    var campaign = new CampaignSummaryVM(campaigns[i], i)
                    campaignsList.push(campaign);
                }
            }
            resolve(campaignsList);
        });
    };

    // Helper Functions

   function convertStatus(status) {
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


    function CampaignSummaryVM(campaign, rowId) {
        this.name = campaign.name;
        this.status = convertStatus(campaign.status);
        this.startDate = campaign.start_date;
        this.endDate = campaign.end_date;
        this.row_id = rowId;
    }    

    // Public interface methods
    return {
        getCampaignSummaries : getCampaignsSummaryMock

    }


})();

module.exports = MockDialerAdminService;