import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import TripListContext from '../../context/TripListContext';
import Header from '../Header/Header';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicRoute from '../Utils/PublicRoute';
import IntroRoute from '../Utils/IntroRoute';
import IntroPage from '../../routes/IntroPage/IntroPage';
import LoginPage from '../../routes/LoginPage/LoginPage';
import RegisterPage from '../../routes/RegisterPage';
import TripListPage from '../../routes/TripListPage/TripListPage';
import TripPage from '../../routes/TripPage/TripPage';
import AddTripPage from '../../routes/AddTripPage';
import EditTripPage from '../../routes/EditTripPage';
import AddPlanPage from '../../routes/AddPlanPage';
import EditPlanPage from '../../routes/EditPlanPage';
import PlanPage from '../../routes/PlanPage/PlanPage';
import NotFoundPage from '../../routes/NotFoundPage';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import IdleService from '../../services/idle-service';
import TripsApiService from '../../services/trips-api-service';
import config from '../../config';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		const script = document.createElement('script');
		script.async = true;
		script.defer = true;
		script.type = 'text/javascript';
		script.src = `https://maps.googleapis.com/maps/api/js?key=${config.MAPS_API_KEY}&libraries=places&callback=callbackFunc`;
		document.head.appendChild(script);
		this.state = { hasError: false };
	}
	static contextType = TripListContext;

	static getDerivedStateFromError(error) {
		console.error(error);
		return { hasError: true };
	};
	
	componentDidMount() {
		// wakes the server
		TripsApiService.pingServer()
			.catch(error => {
				console.error(error);
			});

		IdleService.setIdleCallback(this.logoutFromIdle);

		if (TokenService.hasAuthToken()) {
			IdleService.registerIdleTimerResets();
			TokenService.queueCallbackBeforeExpiry(() => {
				AuthApiService.postRefreshToken();
			});
			this.context.setAuthState(true);
		}
	}

	componentWillUnmount() {
		IdleService.unRegisterIdleResets();
		TokenService.clearCallbackBeforeExpiry();
	}
	
	logoutFromIdle = () => {
		TokenService.clearAuthToken();
		TokenService.clearCallbackBeforeExpiry();
		IdleService.unRegisterIdleResets();
		this.context.setTripList([]);
		this.context.setAuthState(false);
		this.forceUpdate();
	}

	render() {
		const { hasError } = this.state;
		return (
			<div className='App'>
				<header className='App__header'>
					<Header />
				</header>
				<main className='App__main'>
					{
						hasError && 
						<p className='red'>Something went wrong. Please refresh the page or try again later.</p>
					}
					<Switch>
						<IntroRoute
							exact
							path={'/'}
							component={TripListPage}
						/>
						<PublicRoute
							exact
							path={'/intro'}
							component={IntroPage}
						/>
						<PublicRoute
							path={'/signin'}
							component={LoginPage}
						/>
						<PublicRoute
							path={'/signup'}
							component={RegisterPage}
						/>
						<PrivateRoute
							exact
							path={'/trip/:trip_id'}
							component={TripPage}
						/>
						<PrivateRoute
							path={'/add-trip'}
							component={AddTripPage}
						/>
						<PrivateRoute
							path={'/trip/:trip_id/edit'}
							component={EditTripPage}
						/>
						<PrivateRoute
							path={'/trip/:trip_id/add-plan'}
							component={AddPlanPage}
						/>
						<PrivateRoute
							exact
							path={'/trip/:trip_id/plan/:plan_id'}
							component={PlanPage}
						/>
						<PrivateRoute
							path={'/trip/:trip_id/plan/:plan_id/edit'}
							component={EditPlanPage}
						/>
						<Route
							component={NotFoundPage}
						/>
					</Switch>
				</main>
			</div>
		);
	}
}

export default App;
