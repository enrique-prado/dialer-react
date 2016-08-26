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
    width: '10px'
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
    permissionType: React.PropTypes.string
  },
  
  handleRowSelected : function(rowIdx){
    return this.props.rows[rowIdx]
  },
  
  handleDeleteRow : function(key, e) {
    console.log('Delete Row clicked:' );
    console.log('Row key: ' + key );
    console.log('Correspoding row_id: ' + this.props.rows[key].row_id);
    var updatedRow = this.props.rows[key];
    updatedRow.deleted = true;
    this.props.onHrsUpdate(key, updatedRow);       
  },

  //UI Rendering
  
  render:function(){
    var self = this;
    var rowsCount = this.props.rows ? this.props.rows.length : 0;
    var campaigns_list = this.props.rows.map(function(campaign, index) {
        if (!campaign.deleted) {
            return (
                <TableRow key={index}>
                    <TableRowColumn style={tableStyles.wideColumn}>
                        {campaign.status}
                    </TableRowColumn>
                    <TableRowColumn style={tableStyles.wideColumn}>
                        {campaign.name}
                    </TableRowColumn>                    
                    <TableRowColumn style={tableStyles.wideColumn}>
                        {campaign.startDate}
                    </TableRowColumn>
                    <TableRowColumn style={tableStyles.wideColumn}>
                        {campaign.endDate}
                    </TableRowColumn>
                    <TableRowColumn>
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
        <TableHeader displaySelectAll={false}>
            <TableRow>
                <TableHeaderColumn tooltip="Current status of campaign">Status</TableHeaderColumn>
                <TableHeaderColumn tooltip="Name of Campaign">Campaign Name</TableHeaderColumn>
                <TableHeaderColumn tooltip="Day and time when campaign starts running">Start Date</TableHeaderColumn>
                <TableHeaderColumn tooltip="Date when campaign stops">End Date</TableHeaderColumn>
                <TableHeaderColumn tooltip="Actions allowed by Administrators">Admin Actions</TableHeaderColumn>
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