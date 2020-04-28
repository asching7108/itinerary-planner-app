import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import * as serviceWorker from './serviceWorker';
import { TripListProvider } from './context/TripListContext';
import { TripProvider } from './context/TripContext';
import App from './components/App/App';
import './index.css';

import {
	faPlusSquare,
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
	faPhone,
	faPlus,
	faMinus,
	faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';

library.add(
	faPlusSquare,
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
	faPhone,
	faPlus,
	faMinus,
	faPaperPlane,
	far
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