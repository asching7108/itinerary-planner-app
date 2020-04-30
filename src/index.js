import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import * as serviceWorker from './serviceWorker';
import { TripListProvider } from './context/TripListContext';
import { TripProvider } from './context/TripContext';
import App from './components/App/App';
import './index.css';

import {
	faEdit,
	faTrashAlt,
	faTimes,
	faPlane,
	faBed,
	faCar,
	faUtensils,
	faWalking,
	faHeart,
	faLaptop,
	faSubway,
	faMapMarkerAlt,
	faPhone,
	faGlobe,
	faPlus,
	faMinus,
	faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';

library.add(
	faEdit,
	faTrashAlt,
	faTimes,	// close icon
	faPlane,	// type: flight
	faBed,	// type: lodging
	faCar,	// type: car rental
	faUtensils,	// type: restaurant
	faWalking,	// type: activity
	faHeart,	// type: sightseeing
	faLaptop,	// type: meeting
	faSubway,	// type: transportation
	faMapMarkerAlt,	// address
	faPhone,	// phone number
	faGlobe,	// website
	faPlus,
	faMinus,
	faPaperPlane,	// favicon
	far,
	fab
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