import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import ActionDone from 'material-ui/lib/svg-icons/action/done';
import IconButton from 'material-ui/lib/icon-button';
import Colors from 'material-ui/lib/styles/colors';
import ContentClear from 'material-ui/lib/svg-icons/content/clear';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import CampaignsTable from '../components/CampaignsTable';
var moment = require('moment');

const AdminStyles = {
  mainTable:{
      width:'90%'
  }  
};


var CampaignsAdminContainer = React.createClass({
  propTypes: {
    campaigns: React.PropTypes.array,
    onCampaignDelete:React.PropTypes.func,
    //onCancel:React.PropTypes.func
    //onNewRowAccepted:React.PropTypes.func,
    //enableDialerActions:React.PropTypes.bool,
    //enableCampaignEditing:React.PropTypes.bool,
    //selected: React.PropTypes.string
  },  
  getInitialState: function() {
      return {
          showNewEntryRow : false
      };
  },
  handleAddCampaign: function() {
      //Show create campaign dialog
     
  },
  handleCampaignDelete: function(key, updateRow) {
      //Show create campaign dialog
     this.props.onCampaignDelete(key, updateRow)
  },  

    render: function() {
        var add_row = (
                    <div>
                        <IconButton onClick={this.handleAddCampaign}>
                            <ContentAdd color={Colors.green300} hoverColor={Colors.green700} />
                        </IconButton>                      
                    </div>            
        );

        return (
            <div>
                <div>
                    <CampaignsTable style={AdminStyles.mainTable}
                        rows={this.props.campaigns}
                        onCampaignDelete={this.handleCampaignDelete}/>
                    <div>
                        {add_row}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = CampaignsAdminContainer;
