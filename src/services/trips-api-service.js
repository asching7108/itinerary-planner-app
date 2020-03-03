import config from '../config';
import TokenService from './token-service';

const TripsApiService = {
	getTripsByUser() {
		return fetch(`${config.API_ENDPOINT}/trips`, {
			headers: {
				'authorization': `Bearer ${TokenService.getAuthToken()}`
			}
		})
			.then(res =>
				(!res.ok)
					? res.json().then(e => Promise.reject(e))
					: res.json()
			);
	},
	getTripById(tripId) {
		return fetch(`${config.API_ENDPOINT}/trips/${tripId}`, {
			headers: {
				'authorization': `Bearer ${TokenService.getAuthToken()}`
			}
		})
			.then(res =>
				(!res.ok)
					? res.json().then(e => Promise.reject(e))
					: res.json()
			);
	},
	postTrip(trip) {
		return fetch(`${config.API_ENDPOINT}/trips`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				'authorization': `Bearer ${TokenService.getAuthToken()}`
			},
			body: JSON.stringify({ ...trip }),
		})
			.then(res =>
				(!res.ok)
					? res.json().then(e => Promise.reject(e))
					: res.json()
			);
	},
	getTripPlans(tripId) {
		return fetch(`${config.API_ENDPOINT}/trips/${tripId}/plans`, {
			headers: {
				'authorization': `Bearer ${TokenService.getAuthToken()}`
			}
		})
			.then(res =>
				(!res.ok)
					? res.json().then(e => Promise.reject(e))
					: res.json()
			);
	},
	getPlanById(tripId, planId) {
		return fetch(`${config.API_ENDPOINT}/trips/${tripId}/plans/${planId}`, {
			headers: {
				'authorization': `Bearer ${TokenService.getAuthToken()}`
			}
		})
			.then(res =>
				(!res.ok)
					? res.json().then(e => Promise.reject(e))
					: res.json()
			);
	},
	postPlan(plan) {
		return fetch(`${config.API_ENDPOINT}/plans`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				'authorization': `Bearer ${TokenService.getAuthToken()}`,
			},
			body: JSON.stringify({ ...plan }),
		})
			.then(res =>
				(!res.ok)
					? res.json().then(e => Promise.reject(e))
					: res.json()
			);
	}
}

export default TripsApiService;
