import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { TripListProvider } from './context/TripListContext';
import { TripProvider } from './context/TripContext';
import App from './components/App/App';
import { registerIcons } from './components/Utils/Utils';
import './index.css';

registerIcons();

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