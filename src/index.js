import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import * as serviceWorker from './serviceWorker';
import { TripListProvider } from './context/TripListContext';
import { TripProvider } from './context/TripContext';
import App from './components/App/App';
import './index.css';

import {
	faEdit,
	faTrashAlt,
	faTimes,
	faGlobeAsia,
	faPlane,
	faBed,
	faCar,
	faUtensils,
	faWalking,
	faMapMarkerAlt,
	faPlus,
	faMinus,
} from '@fortawesome/free-solid-svg-icons';

library.add(
	faEdit,
	faTrashAlt,
	faTimes,
	faGlobeAsia, // icon
	faPlane, // flight
	faBed, // lodging
	faCar, // car rental
	faUtensils, // restaurant
	faWalking, // activity
	faMapMarkerAlt,
	faPlus,
	faMinus,
);

ReactDOM.render(
	<BrowserRouter>
		<TripListProvider>
			<TripProvider>
				<App />
			</TripProvider>
		</TripListProvider>
	</BrowserRouter>, 
	document.getElementById('root')
);

serviceWorker.unregister();