var React = require('react');
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';
import TextField from 'material-ui/lib/text-field';
import DatePicker from 'material-ui/lib/date-picker/date-picker';

import IconButton from 'material-ui/lib/icon-button';
import Colors from 'material-ui/lib/styles/colors';
import ActionDelete from 'material-ui/lib/svg-icons/action/delete';

const tableStyles = {
  narrowColumn: {
    width: '7%'
  },
    mediumColumn: {
    width: '10%',
  },    
  wideColumn: {
    width: '160px',
  },
  hiddenColumn: {
      display: 'none'
  }
};

var CampaignsTable = React.createClass({
  propTypes: {
    rows: React.PropTypes.array,
    //onCampaignsUpdate: React.PropTypes.func,
    onCampaignDelete: React.PropTypes.func,
    //enableDialerActions:React.PropTypes.bool,
    //enableCampaignEditing:React.PropTypes.bool
  },
  
  handleRowSelected : function(rowIdx){
    return this.props.rows[rowIdx]
  },
  
  handleDeleteRow : function(key, e) {
    console.log('Delete Row clicked:' );
    console.log('Row key: ' + key );
    console.log('Correspoding row_id: ' + this.props.rows[key].row_id);
    var updatedRow = this.props.rows[key];
    //updatedRow.deleted = true;
    this.props.onCampaignDelete(key, updatedRow);       
  },

  //UI Rendering
  
  render:function(){
    var self = this;
    var rowsCount = this.props.rows ? this.props.rows.length : 0;
    var campaigns_list = this.props.rows.map(function(campaign, index) {
        if (!campaign.deleted) {
            return (
                <TableRow key={index}>
                    <TableRowColumn style={tableStyles.narrowColumn}>
                        {campaign.status}
                    </TableRowColumn>
                    <TableRowColumn style={tableStyles.mediumColumn}>
                        {campaign.name}
                    </TableRowColumn>                    
                    <TableRowColumn style={tableStyles.mediumColumn}>
                        {campaign.startDate}
                    </TableRowColumn>
                    <TableRowColumn style={tableStyles.mediumColumn}>
                        {campaign.endDate}
                    </TableRowColumn>
                    <TableRowColumn style={tableStyles.narrowColumn}>
                        <IconButton onClick={self.handleDeleteRow.bind(self, index)}>
                            <ActionDelete color={Colors.green300} hoverColor={Colors.green700} />
                        </IconButton>
                    </TableRowColumn>
                </TableRow>
            )
        }
    });
    
    return(
      <Table
      height="auto"
      selectable={false}
      rowsCount={rowsCount}
      minHeight={290}
      >
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
                <TableHeaderColumn style={tableStyles.narrowColumn} tooltip="Current status of campaign">Status</TableHeaderColumn>
                <TableHeaderColumn style={tableStyles.mediumColumn} tooltip="Name of Campaign">Campaign Name</TableHeaderColumn>
                <TableHeaderColumn style={tableStyles.mediumColumn} tooltip="Day and time when campaign starts running">Start Date</TableHeaderColumn>
                <TableHeaderColumn style={tableStyles.mediumColumn} tooltip="Date when campaign stops">End Date</TableHeaderColumn>
                <TableHeaderColumn style={tableStyles.narrowColumn} tooltip="Actions allowed by Administrators">Admin Actions</TableHeaderColumn>
            </TableRow>
        </TableHeader>
        <TableBody showRowHover={true} displayRowCheckbox={false} >
            {campaigns_list}
        </TableBody>
      </Table>        
    );
  }

});

module.exports = CampaignsTable;  