import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import LoginPage from '../../routes/LoginPage/LoginPage';
import RegisterPage from '../../routes/RegisterPage';
import TripListPage from '../../routes/TripListPage/TripListPage';
import TripPage from '../../routes/TripPage/TripPage';
import AddTripPage from '../../routes/AddTripPage';
import EditTripPage from '../../routes/EditTripPage';
import AddPlanPage from '../../routes/AddPlanPage';
import EditPlanPage from '../../routes/EditPlanPage';
import PlanPage from '../../routes/PlanPage';
import NotFoundPage from '../../routes/NotFoundPage';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className='App'>
				<header className='App__header'>
					<Header />
				</header>
				<main className='App__main'>
					<Switch>
						<Route
							exact
							path={'/'}
							component={TripListPage}
						/>
						<Route
							path={'/signin'}
							component={LoginPage}
						/>
						<Route
							path={'/signup'}
							component={RegisterPage}
						/>
						<Route
							exact
							path={'/trip/:trip_id'}
							component={TripPage}
						/>
						<Route
							path={'/add-trip'}
							component={AddTripPage}
						/>
						<Route
							path={'/trip/:trip_id/edit-trip'}
							component={EditTripPage}
						/>
						<Route
							path={'/trip/:trip_id/add-plan'}
							component={AddPlanPage}
						/>
						<Route
							exact
							path={'/trip/:trip_id/plan/:plan_id'}
							component={PlanPage}
						/>
						<Route
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
