import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TripsApiService from '../../services/trips-api-service';
import Autocomplete from '../Autocomplete/Autocomplete';
import { formatDate, toDate, Button, Input, Textarea, CFlatpickr } from '../Utils/Utils';
import './TripForm.css';

export default class TripForm extends Component {
	static defaultProps = {
		trip: {},
		onAddTripSuccess: () => {},
		onClickOnCancel: () => {},
		location: { pathname: '' }
	};

	constructor(props) {
		super(props);
		this.state = {
			trip_name: '',
			dest_cities: [],
			start_date: toDate(),
			end_date: toDate(),
			description: '',
			destCityCount: 1,
			error: null
		};
	}

	componentDidMount() { this.updateState(); }

	componentDidUpdate(prevProps) {
		if (Object.keys(this.props.trip).length > Object.keys(prevProps.trip).length) {
			this.updateState();
		}
	}

	updateState() {
		const { trip } = this.props;
		
		if (Object.keys(trip).length !== 0) {
			this.setState({
				trip_name: trip.trip_name,
				dest_cities: trip.dest_cities,
				start_date: [toDate(trip.start_date)],
				end_date: [toDate(trip.end_date)],
				description: trip.description,
				destCityCount: trip.dest_cities.length,
				error: null
			});
		}
	}

	resetState() {
		this.setState({ 
			trip_name: '',
			dest_cities: [],
			start_date: '',
			end_date: '',
			description: '',
			destCityCount: 1,
			error: null
		});
	}
	
	inputChanged(field, content) {
		this.setState({ [field]: content });
	}

	destCityChanged = (content, serialStr) => {
		const newDestCities = this.state.dest_cities;
		const serial = serialStr.charAt(serialStr.length - 1) - 1;
		const newDestCity = {
			city_name: content.name,
			city_place_id: content.place_id,
			utc_offset_minutes: content.utc_offset_minutes,
			viewport: {}
		};
		if (content.viewport) {
			newDestCity.viewport = {
				ne_lat: content.viewport.Ya.j,
				ne_lng: content.viewport.Ua.j,
				sw_lat: content.viewport.Ya.i,
				sw_lng: content.viewport.Ua.i
			};
		}
		newDestCities[serial] = newDestCity;
		this.setState({ 'dest_cities': newDestCities });
	}

	destCityCountChanged(change) {
		const { destCityCount, dest_cities } = this.state;
		change > 0
			? dest_cities.push('')
			: dest_cities.pop();
		this.setState({
			dest_cities,
			destCityCount: destCityCount + change
		});
	}

	handleAddSubmit = e => {
		e.preventDefault();
		const trip = this.getTrip();

		TripsApiService.postTrip(trip)
			.then(trip => {
				this.resetState();		
				this.props.onAddTripSuccess(trip);
			})
			.catch(res => {
				this.setState({ error: res.error });
			});
	}

	handleUpdateSubmit = e => {
		e.preventDefault();
		const trip = this.getTrip();
		
		TripsApiService.updateTrip(this.props.trip.id, trip)
			.then(trip => {
				this.resetState();
				this.props.onUpdateTripSuccess(trip);
			})
			.catch(res => {
				this.setState({ error: res.error });
			});
	}

	getTrip() {
		const { trip_name, dest_cities, start_date, end_date, description } = this.state;
		return {
			trip_name,
			dest_cities,
			start_date: formatDate(start_date[0], 'YYYY-MM-DD'),
			end_date: formatDate(end_date[0], 'YYYY-MM-DD'),
			description
		};
	}

	renderDestCity() {
		const { dest_cities, destCityCount } = this.state;
		const elements = [];
		
		if (destCityCount === 1) {
			elements.push(
				<div key={1} className='TripForm__dest-city'>
					<Autocomplete 
						id={`TripForm__dest-city-1`}
						types={['(cities)']} 
						value={dest_cities.length 
							? dest_cities[0].city_name 
							: ''
						}
						field={'dest_cities'}
						onChange={this.destCityChanged}
						onSelect={this.destCityChanged}
					/>
					<button 
						type='button' 
						className='TripForm__plus-button'
						onClick={e => this.destCityCountChanged(1)}
					>
						<FontAwesomeIcon icon='plus' className='white' />
					</button>
				</div>
			);
		}

		else {
			for (let i = 0; i < destCityCount - 1; i++) {
				elements.push(
					<div key={i + 1} className='TripForm__dest-city'>
						<Autocomplete 
							id={`TripForm__dest-city-${i + 1}`}
							types={['(cities)']} 
							value={dest_cities.length 
								? dest_cities[i].city_name 
								: ''
							}
							onChange={this.destCityChanged}
							onSelect={this.destCityChanged}
						/>
					</div>
				);
			}

			elements.push(
				<div key={destCityCount} className='TripForm__dest-city'>
					<Autocomplete 
						id={`TripForm__dest-city-${destCityCount}`}
						types={['(cities)']} 
						value={dest_cities.length 
							? dest_cities[destCityCount - 1].city_name 
							: ''
						}
						onChange={this.destCityChanged}
						onSelect={this.destCityChanged}
					/>
					<button 
						type='button' 
						className='TripForm__minus-button'
						onClick={e => this.destCityCountChanged(-1)}
					>
						<FontAwesomeIcon icon='minus' className='white' />
					</button>
				</div>
			);

			elements.push(
				<button key={destCityCount + 1}
					type='button' 
					className='TripForm__plus-button TripForm__plus-button-row'
					onClick={e => this.destCityCountChanged(1)}
				>
					<FontAwesomeIcon icon='plus' className='white' />
				</button>
			);
		}
		
		return elements;
	}

	render() {
		const { location } = this.props;
		const { trip_name, start_date, end_date, description, error } = this.state;
		return (
			<form
				className='TripForm'
				onSubmit={location.pathname === '/add-trip'
					? this.handleAddSubmit
					: this.handleUpdateSubmit
				}
			>
				<div role='alert'>
					{error && <p className='red'>{error}</p>}
				</div>
				<div>
					<label htmlFor='TripForm__trip-name'>
						Trip name
					</label>
					<Input
						name='trip-name'
						type='text'
						id='TripForm__trip-name'
						required
						value={trip_name}
						onChange={e => this.inputChanged('trip_name', e.target.value)}
						autoComplete='no'
					/>
				</div>
				<div className='TripForm__dest-cities'>
					<label htmlFor='TripForm__dest-city-1'>
						Destination city
					</label>
					{this.renderDestCity()}
				</div>
				<div>
					<label htmlFor='TripForm__start-date'>
						Start date
					</label>
					<CFlatpickr
						id='TripForm__start-date'
						name='start-date'
						value={start_date}
						onChange={date => this.inputChanged('start_date', date)}
						required
						options={{ dateFormat: 'm / d / Y' }}
					/>
				</div>
				<div>
					<label htmlFor='TripForm__end-date'>
						End date
					</label>
					<CFlatpickr
						id='TripForm__end-date'
						name='end-date'
						value={end_date}
						onChange={date => this.inputChanged('end_date', date)}
						required
						options={{ dateFormat: 'm / d / Y' }}
					/>
				</div>
				<div>
					<label htmlFor='TripForm__description'>
						Description
					</label>
					<Textarea
						name='description'
						type='textarea'
						id='TripForm__description'
						value={description}
						onChange={e => this.inputChanged('description', e.target.value)}
					/>
				</div>
				<div className='ButtonsDiv'>
					<Button type='button' onClick={this.props.onClickOnCancel}>
						Cancel
					</Button>
					<Button type='submit'>
						{
							location.pathname === '/add-trip'
								? 'Submit'
								: 'Update'
						}
					</Button>
				</div>
			</form>
		);
	}
}