var React = require('react');
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import SpokenTheme from '../themes/SpokenTheme';
var CustomerDropdown = require('../components/CustomerDropdown');

var DialerAdminDialog = require('../components/DialerAdminDialog');

    
const appStyles = {
    topnav: {
        height:'20%',
        width:'100%'
    },
    menunav: {
        height:'300px',
        width: '250px',
        float:'left',
    },
    content: {
        position:'relative',
        width:'700px',
        float:'left'
    }
          
}



var SpokenDialerApp = React.createClass({
  //LIFE CYCLE EVENTS 
  
  //Use context to pass down Theme; must be called "muiTheme"
  childContextTypes : {
    muiTheme: React.PropTypes.object,
  },
/*
  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(SpokenTheme),
    };
  },  */
  
  propTypes: {
    hoopService: React.PropTypes.object.isRequired,
    dialerAdminService: React.PropTypes.object.isRequired,    
    tenantId: React.PropTypes.string
  },
  
  getInitialState: function(){
    console.log('getInitialState CALLED...')
    return { 
        selectedCustomer: "",
        customers: [],
        campaigns: []
    };
  },

  componentDidMount: function() {
    console.log('componentDidMount CALLED...')
      var self = this;
      this.props.hoopService.getCustomers().then(function(result) {
        self.setState({
            customers : result         
        });
        if (result.length > 0) {
            self.setState({
                selectedCustomer: result[0].label //Select first customer 
            });
        }
    });      

  },
  
  componentDidUpdate: function(prevProps, prevState) {
      console.log("componentDidUpdate CALLED");
      console.log("prev Customer: " + prevState.selectedCustomer + 
                  " current: " + this.state.selectedCustomer);

      if ((prevState.selectedCustomer !== this.state.selectedCustomer)) {
        this.populateCampaignsDlg();
      }
  },
  
  // USER DRIVER EVENTS
  handleSelectCustomer: function(event, index, value) {
    this.setState({ selectedCustomer: value });
    this.setState({campaigns : [] }) // Clear table TODO: This is inefficient, find out a way to make timepicker control refresh

    console.log("Selected Customer is " + value);
  },    

  populateCampaignsDlg: function() {
      console.log('populateCampaignsDlg CALLED')
      //Reloads campaigns array
      var self = this;
       this.props.dialerAdminService.getCampaignsSummary(self.state.selectedCustomer)
       .then(function(result) {
           self.setState({
               campaigns : result
           });
       });
  },
  
  //UI RENDERING
  render: function() {
    var customer_id = this.state.customer_id;

    return (
      <div className="hrs-section" >
        <div className="topNav" style={appStyles.topnav}>
            <div className="dropdown-div" style={appStyles.dropdown}>
                <CustomerDropdown onCustomerSelect={this.handleSelectCustomer} 
                    customers={this.state.customers} selected={this.state.selectedCustomer} />
            </div>
        </div>  
        <div className="leftNav" style={appStyles.menunav}>

        </div>
        <div className="mainPane" style={appStyles.content}>
            <DialerAdminDialog campaigns={this.state.campaigns}/>
        </div>                    
      </div>
    );
  }
});

module.exports = SpokenDialerApp;