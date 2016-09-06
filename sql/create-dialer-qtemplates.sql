/*
 * Copyright (C) 2010 - 2016, Intellisist Inc
 */

/* These are query templates used for the Dialer Administration UI
 * meta data.
 */


DELETE FROM mpact.query_template WHERE name = "dialer_getCampaignSummaries";
 INSERT mpact.query_template 
 (name,allow_guide,allow_super,allow_admin,template,args,format) VALUES (
 "dialer_getCampaignSummaries","1","1","1",
 "SELECT IsMemberAllowed('~','ViewCampaigns') INTO @authok;
 SELECT cmp.campaign_id, cmp.name, cmp.client, cmp.start_date, cmp.end_date, cmp.status, cmp.deleted FROM cmp.campaign AS cmp
 WHERE client=@client_name AND tenant='Startek' AND deleted='0' AND @authok='1' ORDER BY cmp.start_date ASC",
 "SET @client_name=''","%campaign_id%s%,%name%s%,%client%s%,%start_date%s%,%end_date%s%,%status%s%");


