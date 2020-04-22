import React, { Component } from 'react';
import TripsApiService from '../../services/trips-api-service';
import Autocomplete from '../Autocomplete/Autocomplete';
import { formatDate, toDate, Button, Select, Input, Textarea, CFlatpickr } from '../Utils/Utils';
import './PlanForm.css';

const TYPES = [
	'Flight',
	'Lodging',
	'Car Rental',
	'Restaurant',
	'Activity'
];

const TYPES_FOR_DETAILS = [
	'Flight',
	'Car Rental'
];

export default class PlanForm extends Component {
	static defaultProps = {
		trip: {},
		plans: [],
		onAddPlanSuccess: () => {},
		onClickOnCancel: () => {}
	}

	constructor(props) {
		super(props);
		this.state = {
			name: '',
			plan_type: '',
			start_date: '',
			start_time: '',
			end_date: '',
			end_time: '',
			description: '',
			place_id: '',
			city_name: '',
			utc_offset_minutes: '',
			formatted_address: '',
			international_phone_number: '',
			website: '',
			from_name: '',
			from_place_id: '',
			from_utc_offset_minutes: '',
			from_formatted_address: '',
			from_international_phone_number: '',
			from_website: '',
			to_name: '',
			to_place_id: '',
			to_utc_offset_minutes: '',
			to_formatted_address: '',
			to_international_phone_number: '',
			to_website: '',
			viewport: {},
			error: null,
		};
	}
	
	componentDidMount() { this.updateState(); }

	componentDidUpdate(prevProps) {
		const { trip, plans } = prevProps;
		if (Object.keys(this.props.trip).length > Object.keys(trip).length || 
			(!plans[0] && this.props.plans && this.props.plans[0])) {
			this.updateState();
		}
	}

	updateState() {
		const { trip, plans } = this.props;

		if (plans[0]) {
			this.setState({
				name: plans[0].plan_name,
				plan_type: plans[0].plan_type,
				start_date: [toDate(plans[0].start_date)],
				start_time: [toDate(plans[0].start_date)],
				end_date: [toDate(plans[0].end_date)],
				end_time: [toDate(plans[0].end_date)],
				description: plans[0].description,
				place_id: plans[0].plan_place_id,
				city_name: plans[0].city_name,
				utc_offset_minutes: plans[0].utc_offset_minutes,
				formatted_address: plans[0].formatted_address,
				international_phone_number: plans[0].international_phone_number,
				website: plans[0].website,
				from_name: plans[0].from_name,
				from_place_id: plans[0].from_place_id,
				from_utc_offset_minutes: plans[0].from_utc_offset_minutes,
				from_formatted_address: plans[0].from_formatted_address,
				from_international_phone_number: plans[0].from_international_phone_number,
				from_website: plans[0].from_website,
				to_name: plans[plans.length - 1].to_name,
				to_place_id: plans[plans.length - 1].to_place_id,
				to_utc_offset_minutes: plans[plans.length - 1].to_utc_offset_minutes,
				to_formatted_address: plans[0].to_formatted_address,
				to_international_phone_number: plans[0].to_international_phone_number,
				to_website: plans[0].to_website,
				error: null
			});

			if (Object.keys(trip).length !== 0) {
				const defCity = trip.dest_cities.find(dc => dc.city_name === plans[0].city_name);
				if (defCity) {
					this.setState({ viewport: defCity.viewport });
				}
			}
		}
		else if (Object.keys(trip).length !== 0) {
			this.setState({
				plan_type: 'Flight',
				city_name: trip.dest_cities[0].city_name,
				utc_offset_minutes: trip.dest_cities[0].utc_offset_minutes,
				viewport: trip.dest_cities[0].viewport,
				start_date: [toDate(trip.start_date)],
				start_time: [toDate(trip.start_date)],
				end_date: [toDate(trip.start_date)],
				end_time: [toDate(trip.start_date)]
			});
		}
	}

	inputChanged = (field, content) => {
		this.setState({ [field]: content });
	}

	cityChanged = (cityId) => {
		const { trip } = this.props;
		const city = trip.dest_cities.find(dc => dc.id === Number(cityId));
		this.setState({
			city_name: city.city_name,
			utc_offset_minutes: city.utc_offset_minutes,
			viewport: city.viewport
		});
	}

	planNameChanged = (content) => { this.placeDetailChanged('', content); }

	fromPlaceChanged = (content) => {
		this.placeDetailChanged('from_', content);
		if (content.place_id && this.state.to_name === '') {
			this.placeDetailChanged('to_', content);
		}
	}

	toPlaceChanged = (content) => { this.placeDetailChanged('to_', content); }

	placeDetailChanged = (prefix, content) => {
		this.setState({
			[`${prefix}name`]: content.name,
			[`${prefix}place_id`]: content.place_id,
			[`${prefix}utc_offset_minutes`]: content.utc_offset_minutes,
			[`${prefix}formatted_address`]: content.formatted_address,
			[`${prefix}international_phone_number`]: content.international_phone_number,
			[`${prefix}website`]: content.website
		});
	}

	handleAddSubmit = e => {
		e.preventDefault();
		const plan = this.getPlan();
		plan.plan_details = this.getPlanDetails();
		
		TripsApiService.postPlan(this.props.trip.id, plan)
			.then(plans => {
				this.resetState();
				this.props.onAddPlanSuccess(plans);
			})
			.catch(res => {
				this.setState({ error: res.error });
			});
	}

	handleUpdateSubmit = e => {
		e.preventDefault();
		const { trip, plans } = this.props;
		const updatePlan = this.getPlan();
		updatePlan.plan_details = this.getPlanDetails();

		TripsApiService.updatePlan(trip.id, plans[0].id, updatePlan)
			.then(plans => {
				this.resetState();
				this.props.onUpdatePlanSuccess(plans);
			})
			.catch(res => {
				this.setState({ error: res.error });
			});
	}

	getPlan() {
		const {
			name, 
			plan_type, 
			place_id, 
			start_date, 
			start_time,
			end_date,
			end_time, 
			description,
			city_name,
			utc_offset_minutes,
			formatted_address,
			international_phone_number,
			website
		} = this.state;

		return { 
			plan_name: name, 
			plan_type, 
			plan_place_id: place_id,
			start_date: `${formatDate(start_date[0], 'YYYY-MM-DD')}T${formatDate(start_time[0], 'HH:mm')}:00.000Z`,
			end_date: `${formatDate(end_date[0], 'YYYY-MM-DD')}T${formatDate(end_time[0], 'HH:mm')}:00.000Z`,
			description,
			city_name,
			utc_offset_minutes,
			formatted_address,
			international_phone_number,
			website
		};
	}
	
	getPlanDetails() {
		const { 
			plan_type, 
			from_name,
			from_place_id,
			from_utc_offset_minutes,
			from_formatted_address,
			from_international_phone_number,
			from_website,
			to_name,
			to_place_id,
			to_utc_offset_minutes,
			to_formatted_address,
			to_international_phone_number,
			to_website,
		} = this.state;

		let plan_details;

		if (plan_type === 'Lodging') {
			plan_details = [
				{ plan_subtype: 'Check in' },
				{ plan_subtype: 'Check out' }
			];
		}
		else if (plan_type === 'Flight') {
			plan_details = [{
				from_name,
				from_place_id,
				// from_utc_offset_minutes,
				to_name,
				to_place_id,
				// to_utc_offset_minutes
			}];
		}
		else if (plan_type === 'Car Rental') {
			plan_details = [
				{
					plan_subtype: 'Pick up',
					from_name,
					from_place_id,
					from_utc_offset_minutes,
					from_formatted_address,
					from_international_phone_number,
					from_website
				},
				{
					plan_subtype: 'Drop off',
					to_name,
					to_place_id,
					to_utc_offset_minutes,
					to_formatted_address,
					to_international_phone_number,
					to_website
				}
			];
		}

		return plan_details;
	}

	resetState() {
		this.setState({ 
			name: '',
			plan_type: '',
			start_date: '',
			start_time: '',
			end_date: '',
			end_time: '',
			description: '',
			place_id: '',
			city_name: '',
			utc_offset_minutes: '',
			formatted_address: '',
			international_phone_number: '',
			website: '',
			from_name: '',
			from_place_id: '',
			from_utc_offset_minutes: '',
			from_formatted_address: '',
			from_international_phone_number: '',
			from_website: '',
			to_name: '',
			to_place_id: '',
			to_utc_offset_minutes: '',
			to_formatted_address: '',
			to_international_phone_number: '',
			to_website: '',
			viewport: {},
			error: null
		});
	}

	renderCity() {
		const { dest_cities } = this.props.trip;
		const { city_name } = this.state;
		const defCity = dest_cities && dest_cities.find(dc => dc.city_name === city_name);
		const defVal = defCity ? defCity.id : dest_cities && dest_cities[0].id;
		
		return (
			<div>
				<label htmlFor='PlanForm__city'>
					City
				</label>
				<Select
					name='city'
					id='PlanForm__city'
					value={defVal}
					onChange={e => this.cityChanged(e.target.value)}
				>
					{dest_cities && dest_cities.map((dc, idx) => 
						<option key={idx} value={dc.id}>{dc.city_name}</option>
					)}
				</Select>
			</div>
		);
	}

	renderTypeOptions() {
		const { plan_type } = this.state;
		const elements = [];
		TYPES.forEach(t => {
			if (t === plan_type) {
				elements.push(<option key={t} value={t} selected>{t}</option>);
			}
			else {
				elements.push(<option key={t} value={t}>{t}</option>);
			}
		})
		return elements;
	}

	renderNameText() {
		const { plan_type } = this.state;
		switch (plan_type) {
			case 'Flight': return 'Flight Number';
			case 'Car Rental': return 'Rental agency';
			default: return 'Name';
		}
	}

	renderNameInput() {
		const { plan_type, name, viewport } = this.state;
		if (TYPES_FOR_DETAILS.includes(plan_type)) {
			return (
				<Input
					name='name'
					type='text'
					id='PlanForm__name'
					required
					value={name}
					onChange={e => this.inputChanged('name', e.target.value)}
				/>
			);
		}
		return (
			<Autocomplete
				id='PlanForm__name'
				value={name}
				viewport={viewport}
				onChange={this.planNameChanged}
				onSelect={this.planNameChanged}
			/>
		);
	}

	renderFromToPlaces() {
		const { plan_type, from_name, to_name, viewport } = this.state;
		if (TYPES_FOR_DETAILS.includes(plan_type)) {
			return (
				<>
					<div>
						<label htmlFor='PlanForm__from'>
							From
						</label>
						<Autocomplete
							id='PlanForm__from'
							value={from_name}
							viewport={viewport}
							onChange={this.fromPlaceChanged}
							onSelect={this.fromPlaceChanged}
						/>
					</div>
					<div>
						<label htmlFor='PlanForm__to'>
							To
						</label>
						<Autocomplete
							id='PlanForm__to'
							value={to_name}
							viewport={viewport}
							onChange={this.toPlaceChanged}
							onSelect={this.toPlaceChanged}
						/>
					</div>
				</>
			);
		}
	}

	renderStartDateAndTimeText() {
		const { plan_type } = this.state;
		switch (plan_type) {
			case 'Flight': return 'Departure';
			case 'Lodging': return 'Check In';
			default: return 'Start';
		}
	}

	renderEndDateAndTimeText() {
		const { plan_type } = this.state;
		switch (plan_type) {
			case 'Flight': return 'Arrival';
			case 'Lodging': return 'Check Out';
			default: return 'End';
		}
	}

	render() {
		const { location } = this.props;
		const { start_date, start_time, end_date, end_time, description, error } = this.state;
		return (
			<form
				className='PlanForm'
				onSubmit={location.pathname.includes('add')
					? this.handleAddSubmit
					: this.handleUpdateSubmit
				}
			>
				<div role='alert'>
					{error && <p className='red'>{error}</p>}
				</div>
				{this.renderCity()}
				<div>
					<label htmlFor='PlanForm__type'>
						Type
					</label>
					<Select
						name='type'
						id='PlanForm__type'
						required
						onChange={e => this.inputChanged('plan_type', e.target.value)}
					>
						{this.renderTypeOptions()}
					</Select>
				</div>
				<div>
					<label htmlFor='PlanForm__name'>
					{this.renderNameText()}
					</label>
					{this.renderNameInput()}
				</div>
				{this.renderFromToPlaces()}
				<div className='PlanForm__row'>
					<div className='PlanForm__date'>
						<label htmlFor='PlanForm__start-date'>
							{this.renderStartDateAndTimeText()} date
						</label>
						<CFlatpickr
							name='start-date'
							id='PlanForm__start-date'
							value={start_date}
							onChange={date => this.inputChanged('start_date', date)}
							required
							options={{ dateFormat: 'm / d / Y' }}
						/>
					</div>
					<div className='PlanForm__time'>
						<label htmlFor='PlanForm__start-time'>
							{this.renderStartDateAndTimeText()} time
						</label>
						<CFlatpickr
							name='start-time'
							id='PlanForm__start-time'
							value={start_time}
							onChange={date => this.inputChanged('start_time', date)}
							required
							options={{
								dateFormat: 'G : i K',
								enableTime: true,
								noCalendar: true
							}}
						/>
					</div>
				</div>
				<div className='PlanForm__row'>
					<div className='PlanForm__date'>
						<label htmlFor='PlanForm__end-date'>
							{this.renderEndDateAndTimeText()} date
						</label>
						<CFlatpickr
							name='end-date'
							id='PlanForm__end-date'
							value={end_date}
							onChange={date => this.inputChanged('end_date', date)}
							required
							options={{ dateFormat: 'm / d / Y' }}
						/>
					</div>
					<div className='PlanForm__time'>
						<label htmlFor='PlanForm__end-time'>
							{this.renderStartDateAndTimeText()} time
						</label>
						<CFlatpickr
							name='end-time'
							id='PlanForm__end-time'
							value={end_time}
							onChange={date => this.inputChanged('end_time', date)}
							required
							options={{
								dateFormat: 'G : i K',
								enableTime: true,
								noCalendar: true
							}}
						/>
					</div>
				</div>
				<div>
					<label htmlFor='PlanForm__description'>
						Description
					</label>
					<Textarea
						name='description'
						type='textarea'
						id='PlanForm__description'
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
							location.pathname.includes('add')
								? 'Submit'
								: 'Update'
						}
					</Button>
				</div>
			</form>
		);
	}
}