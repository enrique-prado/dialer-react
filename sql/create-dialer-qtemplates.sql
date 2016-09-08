/*
 * Copyright (C) 2010 - 2016, Intellisist Inc
 */

/* These are query templates used for the Dialer Administration UI
 * meta data.
 */


DELETE FROM mpact.query_template WHERE name = "dlr_getcampaign_summaries";
 INSERT mpact.query_template 
 (name,allow_guide,allow_super,allow_admin,template,args,format) VALUES (
 "dlr_getcampaign_summaries","1","1","1",
 "SELECT campaign_id, name, start_date, end_date, active FROM dialer.campaign
  WHERE client=@client_name AND deleted=0",
 "SET @client_name=''",'{"campaign_id":"%campaign_id%s%","name":"%name%s%","start":"%start_date%s%","end":"%end_date%s%","status":"%active%s%"}'
 );


DELETE FROM mpact.query_template WHERE name = "dlr_markcampaign_deleted";
INSERT INTO mpact.query_template
(name,allow_guide,allow_super,allow_admin,template,args,format) VALUES
("dlr_markcampaign_deleted","1","1","1",
 "UPDATE dialer.campaign SET deleted=1 WHERE campaign_id=@campid;", 
 "SET @campid=''", "success");