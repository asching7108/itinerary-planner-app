import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TripsApiService from '../../services/trips-api-service';
import Autocomplete from '../Autocomplete/Autocomplete';
import { FormattedDate, Button, Input, Textarea, ButtonBox } from '../Utils/Utils';
import './TripForm.css';

export default class TripForm extends Component {
	static defaultProps = {
		onAddTripSuccess: () => {},
		onClickOnCancel: () => {}
	}

	constructor(props) {
		super(props);
		this.state = {
			trip_name: '',
			dest_cities: [],
			start_date: '',
			end_date: '',
			description: '',
			destCityCount: 1,
			error: null
		};
	}

	componentDidMount() {
		const { trip } = this.props;
		
		if (trip) {
			this.setState({
				trip_name: trip.trip_name,
				dest_cities: trip.dest_cities,
				start_date: FormattedDate(trip.start_date, 'YYYY-MM-DD'),
				end_date: FormattedDate(trip.end_date, 'YYYY-MM-DD'),
				description: trip.description,
				destCityCount: trip.dest_cities.length,
				error: null
			});
		}
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
			utc_offset_minutes: content.utc_offset_minutes
		};
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
		const { trip_name, dest_cities, start_date, end_date, description } = this.state;
		const trip = { trip_name, dest_cities, start_date, end_date, description };

		TripsApiService.postTrip(trip)
			.then(trip => {
				this.setState({ 
					trip_name: '',
					dest_cities: [],
					start_date: '',
					end_date: '',
					description: '',
					destCityCount: 1,
					error: null
				});		
				this.props.onAddTripSuccess(trip);
			})
			.catch(res => {
				this.setState({ error: res.error });
			});
	}

	handleUpdateSubmit = e => {
		e.preventDefault();
		const { trip_name, dest_cities, start_date, end_date, description } = this.state;
		const trip = { trip_name, dest_cities, start_date, end_date, description };
		
		TripsApiService.updateTrip(Number(this.props.trip.id), trip)
			.then(() => {
				this.setState({ 
					trip_name: '',
					dest_cities: [],
					start_date: '',
					end_date: '',
					description: '',
					destCityCount: 1,
					error: null
				});
				this.props.onUpdateTripSuccess(trip);
			})
			.catch(res => {
				this.setState({ error: res.error });
			});
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
		const { error } = this.state;
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
						value={this.state.trip_name}
						onChange={e => this.inputChanged('trip_name', e.target.value)}
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
					<Input
						name='start-date'
						type='date'
						id='TripForm__start-date'
						required
						value={this.state.start_date}
						onChange={e => this.inputChanged('start_date', e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor='TripForm__end-date'>
						End date
					</label>
					<Input
						name='end-date'
						type='date'
						id='TripForm__end-date'
						required
						value={this.state.end_date}
						onChange={e => this.inputChanged('end_date', e.target.value)}
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
						value={this.state.description}
						onChange={e => this.inputChanged('description', e.target.value)}
					/>
				</div>
				<ButtonBox>
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
				</ButtonBox>
			</form>
		);
	}
}