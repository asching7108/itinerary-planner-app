import React, { Component } from 'react';
import TripsApiService from '../../services/trips-api-service';
import Autocomplete from '../Autocomplete/Autocomplete';
import { formattedDate, Button, Select, Input, Textarea } from '../Utils/Utils';
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
		onAddPlanSuccess: () => {},
		onClickOnCancel: () => {}
	}

	constructor(props) {
		super(props);
		this.state = {
			plan_name: '',
			plan_type: '',
			start_date: '',
			end_date: '',
			start_time: '',
			end_time: '',
			description: '',
			plan_place_id: '',
			city_name: '',
			utc_offset_minutes: '',
			from_name: '',
			from_place_id: '',
			from_utc_offset_minutes: '',
			to_name: '',
			to_place_id: '',
			to_utc_offset_minutes: '',
			error: null
		};
	}
	
	componentDidMount() { this.updateState(); }

	componentDidUpdate(prevProps) {
		const { plans = [], destCities = [] } = prevProps;
		if ((!plans[0] && this.props.plans && this.props.plans[0]) ||
			(!destCities[0] && this.props.destCities && this.props.destCities[0])) {
			this.updateState();
		}
	}

	updateState() {
		const { plans = [], destCities = [] } = this.props;

		if (plans[0]) {
			this.setState({
				plan_name: plans[0].plan_name,
				plan_type: plans[0].plan_type,
				start_date: formattedDate(plans[0].start_date, 'YYYY-MM-DD'),
				end_date: formattedDate(plans[0].end_date, 'YYYY-MM-DD'),
				start_time: formattedDate(plans[0].start_date, 'HH:mm'),
				end_time: formattedDate(plans[0].end_date, 'HH:mm'),
				description: plans[0].description,
				plan_place_id: plans[0].plan_place_id,
				city_name: plans[0].city_name,
				utc_offset_minutes: plans[0].utc_offset_minutes,
				from_name: plans[0].from_name,
				from_place_id: plans[0].from_place_id,
				from_utc_offset_minutes: plans[0].from_utc_offset_minutes,
				to_name: plans[plans.length - 1].to_name,
				to_place_id: plans[plans.length - 1].to_place_id,
				to_utc_offset_minutes: plans[plans.length - 1].to_utc_offset_minutes,
				error: null
			});
		}
		else if (destCities[0]) {
			this.setState({
				plan_type: 'Flight',
				city_name: destCities[0].city_name,
				utc_offset_minutes: destCities[0].utc_offset_minutes,
			});
		}
	}

	inputChanged = (field, content) => {
		this.setState({ [field]: content });
	}

	cityChanged = (cityId) => {
		const { destCities } = this.props;
		const city = destCities.find(dc => dc.id === Number(cityId));
		this.setState({
			city_name: city.city_name,
			utc_offset_minutes: city.utc_offset_minutes
		});
	}

	planNameChanged = (content) => {
		this.setState({
			plan_name: content.name,
			plan_place_id: content.place_id
		});
	}

	fromPlaceChanged = (content) => {
		this.setState({
			from_name: content.name,
			from_place_id: content.place_id,
			from_utc_offset_minutes: content.utc_offset_minutes
		});
	}

	toPlaceChanged = (content) => {
		this.setState({
			to_name: content.name,
			to_place_id: content.place_id,
			to_utc_offset_minutes: content.utc_offset_minutes
		});
	}

	handleAddSubmit = e => {
		e.preventDefault();
		const { tripId } = this.props;
		const plan = this.getPlan();
		plan.plan_details = this.getPlanDetails();
		
		TripsApiService.postPlan(Number(tripId), plan)
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
		const { tripId, plans } = this.props;
		const updatePlan = this.getPlan();
		updatePlan.plan_details = this.getPlanDetails();

		TripsApiService.updatePlan(Number(tripId), Number(plans[0].id), updatePlan)
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
			plan_name, 
			plan_type, 
			start_date, 
			start_time,
			end_date, 
			end_time,
			description,
			city_name,
			utc_offset_minutes
		} = this.state;

		return { 
			plan_name, 
			plan_type, 
			start_date: `${start_date}T${start_time}:00.000Z`, 
			end_date: `${end_date}T${end_time}:00.000Z`, 
			description,
			city_name,
			utc_offset_minutes
		};
	}
	
	getPlanDetails() {
		const { 
			plan_type, 
			from_name,
			from_place_id,
			from_utc_offset_minutes,
			to_name,
			to_place_id,
			to_utc_offset_minutes
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
				},
				{
					plan_subtype: 'Drop off',
					to_name,
					to_place_id,
					to_utc_offset_minutes
				}
			];
		}

		return plan_details;
	}

	resetState() {
		this.setState({ 
			plan_name: '',
			plan_type: '',
			start_date: '',
			end_date: '',
			start_time: '',
			end_time: '',
			description: '',
			plan_place_id: '',
			city_name: '',
			utc_offset_minutes: '',
			error: null
		});
	}

	renderCity() {
		const { destCities } = this.props;
		return (
			<div>
				<label htmlFor='PlanForm__city'>
					City
				</label>
				<Select
					name='city'
					id='PlanForm__city'
					defaultValue={destCities && destCities[0].id}
					onChange={e => this.cityChanged(e.target.value)}
				>
					{destCities && destCities.map((dc, idx) => 
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
		const { plan_type } = this.state;
		if (plan_type === 'Flight') {
			return (
				<Input
					name='name'
					type='text'
					id='PlanForm__name'
					required
					value={this.state.plan_name}
					onChange={e => this.inputChanged('plan_name', e.target.value)}
				/>
			);
		}
		return (
			<Autocomplete
				id='PlanForm__name'
				value={this.state.plan_name}
				onChange={this.planNameChanged}
				onSelect={this.planNameChanged}
			/>
		);
	}

	renderFromToPlaces() {
		const { plan_type } = this.state;
		if (TYPES_FOR_DETAILS.includes(plan_type)) {
			return (
				<>
					<div>
						<label htmlFor='PlanForm__from'>
							From
						</label>
						<Autocomplete
							id='PlanForm__from'
							value={this.state.from_name}
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
							value={this.state.to_name}
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
		const { error } = this.state;
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
					<div>
						<label htmlFor='PlanForm__start-date'>
							{this.renderStartDateAndTimeText()} date
						</label>
						<Input
							name='start-date'
							type='date'
							id='PlanForm__start-date'
							required
							value={this.state.start_date}
							onChange={e => this.inputChanged('start_date', e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='PlanForm__start-time'>
							{this.renderStartDateAndTimeText()} time
						</label>
						<Input
							name='start-time'
							type='time'
							id='PlanForm__start-time'
							required
							value={this.state.start_time}
							onChange={e => this.inputChanged('start_time', e.target.value)}
						/>
					</div>
				</div>
				<div className='PlanForm__row'>
					<div>
						<label htmlFor='PlanForm__end-date'>
							{this.renderEndDateAndTimeText()} date
						</label>
						<Input
							name='end-date'
							type='date'
							id='PlanForm__end-date'
							required
							value={this.state.end_date}
							onChange={e => this.inputChanged('end_date', e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='PlanForm__end-time'>
							{this.renderEndDateAndTimeText()} time
						</label>
						<Input
							name='end-time'
							type='time'
							id='PlanForm__end-time'
							required
							value={this.state.end_time}
							onChange={e => this.inputChanged('end_time', e.target.value)}
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
						value={this.state.description}
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