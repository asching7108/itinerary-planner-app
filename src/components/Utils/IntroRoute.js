import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenService from '../../services/token-service';

export default function IntroRoute({ component, ...props }) {
	const Component = component;
	return (
		<Route
			{...props}
			render={componentProps => (
				TokenService.hasAuthToken()
					? <Component {...componentProps} />
					: <Redirect to='/intro' />
			)}
		/>
	);
}
