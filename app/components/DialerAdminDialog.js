/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */
var React = require('react');
var LinearProgress = require('material-ui/lib/linear-progress');
var Slider = require('material-ui/lib/slider');
var CampaignsTable = require('../components/CampaignsTable');
//import Colors from 'material-ui/lib/styles/colors';
var moment = require('moment');

const playbarStyles = {
      container: {
        position: 'relative'
      },

      progress: {
        position: 'absolute',
        top: '49',
        left: '0',
        zindex: '10'
    },
    slider: {
      position: 'absolute',
      top: '0',
      left: '0',
      height: '100%',
      width: '100%',
      zindex: '11'
    }  
}

var DialerAdminDialog = React.createClass({
  propTypes: {
    campaigns: React.PropTypes.array
  },  
    
  render: function() {
    return (
    <div style={playbarStyles.container}>
      <CampaignsTable rows={this.props.campaigns} />
    </div>
    );
  }
});

module.exports = DialerAdminDialog;