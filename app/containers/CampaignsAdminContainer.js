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
  horzLayout: {
    display:'inline-block',
    verticalAlign:'top',
    width:'20%'  
  },
  parentDiv: {
    display: 'inline-block',
    position: 'relative',
    width:'120px'
  },
 btn: {
    margin: '12',
    float: 'right'
 },
  toggle: {
    display:'inline-block',
    verticalAlign:'top',
    paddingTop: '15px',
    width:'60px'  
  },
  newrow:{
      width:'700px'
  }  
};


var CampaignsAdminContainer = React.createClass({
  propTypes: {
    campaigns: React.PropTypes.array,
    onCampaignsUpdate: React.PropTypes.func,     
    onSave:React.PropTypes.func,
    onCancel:React.PropTypes.func
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
  handleAddRow: function() {
      //Show create campaign dialog
     
  },
  handleRowAccepted : function(e) {
      //Call parent so it can add new row to array

  },
  handleSaveHours : function() {
    //TODO:Check to see if new row needs to be accepted first
    // TODO: Also commit any changes to updated rows
    this.props.onSave();  
  },
  handleCancelHours : function() {
    // Throw away any uncommitted changes, call parent to do this.
    //TODO: Reject new row if it's visible
    this.props.onCancel();  
  },

    render: function() {
        var add_row = (
                    <div>
                        <IconButton onClick={this.handleAddRow}>
                            <ContentAdd color={Colors.green300} hoverColor={Colors.green700} />
                        </IconButton>                      
                    </div>            
        );

        return (
            <div>
                <div>
                    <CampaignsTable 
                        rows={this.props.campaigns}
                        onCampaignsUpdate={this.props.onCampaignsUpdate}/>
                    <div>
                        {add_row}
                    </div>
                </div>
                <div>
                    <FlatButton label="Save"
                        secondary={true} 
                        onClick={this.handleSaveHours} 
                        style={AdminStyles.btn} />
                    <FlatButton label="Cancel" 
                        primary={true} 
                        onClick={this.handleCancelHours} 
                        style={AdminStyles.btn} />
                </div>
            </div>
        );
    }
});

module.exports = CampaignsAdminContainer;
