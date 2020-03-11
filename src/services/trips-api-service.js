import config from '../config';
import TokenService from './token-service';

const TripsApiService = {
	getTripsByUser() {
		return fetch(`${config.API_BASE_URL}/trips`, {
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
		return fetch(`${config.API_BASE_URL}/trips/${tripId}`, {
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
	postTrip(newTrip) {
		return fetch(`${config.API_BASE_URL}/trips`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				'authorization': `Bearer ${TokenService.getAuthToken()}`
			},
			body: JSON.stringify({ ...newTrip })
		})
			.then(res =>
				(!res.ok)
					? res.json().then(e => Promise.reject(e))
					: res.json()
			);
	},
	deleteTrip(tripId) {
		return fetch(`${config.API_BASE_URL}/trips/${tripId}`, {
			method: 'DELETE',
			headers: {
				'authorization': `Bearer ${TokenService.getAuthToken()}`
			}
		})
			.then(res => {
				if (!res.ok) {
					return res.json().then(e => Promise.reject(e));
				}
			});
	},
	updateTrip(tripId, updateTrip) {
		return fetch(`${config.API_BASE_URL}/trips/${tripId}`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				'authorization': `Bearer ${TokenService.getAuthToken()}`
			},
			body: JSON.stringify({ ...updateTrip })
		})
			.then(res => 
				(!res.ok)
					? res.json().then(e => Promise.reject(e))
					: res.json()
			);
	},
	getTripPlans(tripId) {
		return fetch(`${config.API_BASE_URL}/trips/${tripId}/plans`, {
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
		return fetch(`${config.API_BASE_URL}/trips/${tripId}/plans/${planId}`, {
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
	postPlan(tripId, newPlan) {
		return fetch(`${config.API_BASE_URL}/trips/${tripId}/plans`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				'authorization': `Bearer ${TokenService.getAuthToken()}`
			},
			body: JSON.stringify({ ...newPlan })
		})
			.then(res =>
				(!res.ok)
					? res.json().then(e => Promise.reject(e))
					: res.json()
			);
	},
	deletePlan(tripId, planId) {
		return fetch(`${config.API_BASE_URL}/trips/${tripId}/plans/${planId}`, {
			method: 'DELETE',
			headers: {
				'authorization': `Bearer ${TokenService.getAuthToken()}`
			}
		})
			.then(res => {
				if (!res.ok) {
					return res.json().then(e => Promise.reject(e));
				}
			});
	},
	updatePlan(tripId, planId, updatePlan) {
		return fetch(`${config.API_BASE_URL}/trips/${tripId}/plans/${planId}`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				'authorization': `Bearer ${TokenService.getAuthToken()}`
			},
			body: JSON.stringify({ ...updatePlan })
		})
			.then(res => 
				(!res.ok)
					? res.json().then(e => Promise.reject(e))
					: res.json()
			);
	}
};

export default TripsApiService;
