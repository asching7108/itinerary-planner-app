import config from '../config';
import TokenService from './token-service';
import IdleService from './idle-service';

const AuthApiService = {
	postUser(user) {
		return fetch(`${config.API_BASE_URL}/users`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(user),
		})
			.then(res => 
				(!res.ok)
					? res.json().then(e => Promise.reject(e))
					: res.json()
			);
	},

	postLogin({ email, password }) {
		return fetch(`${config.API_BASE_URL}/auth/login`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({ email, password })
		})
			.then(res => 
				(!res.ok)
					? res.json().then(e => Promise.reject(e))
					: res.json()
			)
			.then(res => {
				/* save the token in local storage*/
				TokenService.saveAuthToken(res.authToken);
				/* queue auto logout when the user goes idle */
				IdleService.registerIdleTimerResets();
				/* queue a call to the refresh endpoint based on the JWT's exp value */
				TokenService.queueCallbackBeforeExpiry(() => {
					AuthApiService.postRefreshToken();
				});
				return res;
			});
	},

	postRefreshToken() {
		return fetch(`${config.API_BASE_URL}/auth/refresh`, {
			method: 'POST',
			headers: {
				'authorization': `Bearer ${TokenService.getAuthToken()}`,
			}
		})
			.then(res => 
				(!res.ok)
				? res.json().then(e => Promise.reject(e))
				: res.json()
			)
			.then(res => {
				TokenService.saveAuthToken(res.authToken);
				TokenService.queueCallbackBeforeExpiry(() => {
					AuthApiService.postRefreshToken();
				});
			})
			.catch(err => {
				console.log('refresh token request error')
				console.log(err);
			})
	},
};

export default AuthApiService;