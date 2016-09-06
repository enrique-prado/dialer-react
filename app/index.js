console.log('React Dialer Admin is up and running!');
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import SpokenPlayerApp from './containers/SpokenDialerApp';
import MockHOOPService from '../services/MockHOOPService';
//import MockDialerAdminService from '../services/MockDialerAdminService';
import DialerAdminService from '../services/DialerAdminService';

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

ReactDOM.render(
    <SpokenPlayerApp 
        hoopService={MockHOOPService}
        dialerAdminService={DialerAdminService} />,
    document.getElementById('app')
);