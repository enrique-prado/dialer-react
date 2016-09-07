var DialerAdminService = (function () {
        var moment = require('moment');
        var urlBase = '/getdata?template=';
        var getCampaignSummariesQTemplate = 'dlr_getcampaign_summaries';
        var getClientListQTemplate = 'userclientlist';
        var rowsRange = '&startrow=0&rowcount=30';
        var custNameParam = '&cust_name=';
        var queueTypeParam = '&queue_type=';
        
        var defaultCustomers = [
                {value:1, label:"neat"},
                {value:2, label:"SpokenDA"},
                {value:3, label:"Guthy"}
            ];
            
        var weekDays = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ]
            
        function getCustomers () {
            return new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.onload = function() {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        console.log('dataService.getCustomers succeeds');
                        //parse response and make customers array
                        var custlist = xhr.response.replace(/\r\n/g,"\n");
                        var customers = custlist.split("\n");
                        var custResults = []
                        //get rid of the last line in customers if it is empty
                        if (customers[customers.length - 1] == '')
                            customers.length = customers.length - 1;
                        
                        for (var i = 0 ; i < customers.length; i++) {
                            var val = i + 1;
                            var custItem = {value: val, label: customers[i]};
                            custResults.push(custItem);
                            //console.log('value = ' + custItem.value + ' ,label = ' + custItem.label);
                        }
                        
                        console.log('num of customers is ' + custResults.length);
                        
                        resolve(custResults); // Resolve Promise returning customer array
                    }
                    else {
                        console.log('ERROR retrieving dataService.getCustomers()');
                        resolve([]);
                    }
                }
                
                xhr.onerror = reject;
                xhr.open('GET', '/getdata?template=userclientlist&startrow=0&rowcount=30', true);                
                xhr.send();
            });
        };
        

        function getCampaignSummaries( clientId ) {
            console.log("getCampaignSummaries called...");
            console.log("clientId = " + clientId);

            return new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                
                xhr.onload = function() {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        console.log('DialerAdminService.getCampaignSummaries succeeds');
                        //parse response and make entries array
                        var entryList = xhr.response.replace(/\r\n/g,"\n");
                        var entries = entryList.split("\n");
                        var campaignEntries = [];
                        
                        //get rid of the last line in entries if it is empty
                        if (entries[entries.length - 1] == '')
                            entries.length = entries.length - 1;
                        
                        console.log('Number of entries returned: ' + entries.length);
                        
                        for (var i = 0; i < entries.length; i++) {
                            var jsonEntry = JSON.parse(entries[i]);
                            var campaign = new CampaignSummaryVM(jsonEntry);
                            campaignEntries.push(campaign);
                        }
                        console.log('NUMBER OF ENTRIES INSERTED: ' + campaignEntries.length)
                        resolve (campaignEntries); // Return final array
                    }
                    else {
                        console.log('ERROR retrieving DialerAdminService.getCampaignSummaries()');
                        resolve([]);                        
                    }
                }
                                                    
                xhr.onerror = reject;
                console.log("Fetching for Client " + clientId );
                xhr.open("GET","/getdata?template=" + getCampaignSummariesQTemplate +
                    "&client_name=" + clientId +
                    "&startrow=0&rowcount=30", true);            
   
                xhr.send();
            });             
        }


        function CampaignSummaryVM(campaign) {
            this.name = campaign.name;
            this.status = convertStatus(campaign.status);
            this.startDate = campaign.start;
            this.endDate = campaign.end;
            this.row_id = campaign.campaign_id;
            this.deleted = false; // Query template only returns non deleted campaigns
            this.updated =false; // flag that indicates if record has been changed by user
        }            
        
        
    //Helper functions

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
            case "1" :
                return "running";
            case "0" :
                return "pending";
            default:
                return "invalid";
        }
    }

    function parseDate(selector) {
        console.log('date to be parsed: ' + selector );
        //Check to see if date is in format of '____-mm-dd' and convert it to valid date
        if (selector.indexOf("____-") > -1 ) {
            var yearStr = new Date().getFullYear();
            var dateStr = yearStr + selector.replace("____", '' ) + ' 00:00:00';
            console.log('date to be converted: ' + dateStr );
            
            return new Date(dateStr);
        }
        // date string is already in valid format
        return new Date(selector);
    }
    
    function getTimeString(date) {
        var h = addZero(date.getHours());
        var m = addZero(date.getMinutes());
        var s = addZero(date.getSeconds());
        var timeStr = h + ":" + m + ":" + s;
        return timeStr;
    }
    
    function getDateString(date) {
        /*var year = date.getFullYear();
        var month = addZero(date.getMonth() + 1); //getMonth returns 0-11
        var day = addZero(date.getDate());
        var dateStr = year + '-' + month + '-' + day + ' 00:00:00';*/
        var dateStr = date.format('YYYY-MM-DD') + ' 00:00:00';
        return dateStr;        
    }        
    
    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    function getDayIndex(dowName) {
        for (var i = 0; i < weekDays.length; i++) {
            if (weekDays[i] == dowName) {
                return i;
            }
        }
        return -1; // Day string not found
    }
   
    // Public interface methods
    return {
        getCampaignSummaries : getCampaignSummaries

    }
})();

module.exports = DialerAdminService;