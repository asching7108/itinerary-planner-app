import React, { Component } from 'react';
import TripsApiService from '../../services/trips-api-service';
import Autocomplete from '../Autocomplete/Autocomplete';
import { FormattedDate, Button, Select, Input, Textarea, ButtonBox } from '../Utils/Utils';
import './PlanForm.css';

const types = [
	'Flight',
	'Lodging',
	'Car Rental',
	'Restaurant',
	'Activity'
]

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
			trip_id: '',
			dest_city: '',
			start_date: '',
			end_date: '',
			start_time: '',
			end_time: '',
			description: '',
			plan_place_id: '',
			city_name: '',
			utc_offset_minutes: '',
			error: null
		};
	}
	
	componentDidMount() {
		const { plan, destCities } = this.props;
		
		if (plan) {
			this.setState({
				plan_name: plan.plan_name,
				plan_type: plan.plan_type,
				trip_id: plan.trip_id,
				dest_city: plan.dest_city,
				start_date: FormattedDate(plan.start_date, 'YYYY-MM-DD'),
				end_date: FormattedDate(plan.end_date, 'YYYY-MM-DD'),
				start_time: FormattedDate(plan.start_date, 'HH:mm'),
				end_time: FormattedDate(plan.end_date, 'HH:mm'),
				description: plan.description,
				city_name: plan.city_name,
				utc_offset_minutes: plan.utc_offset_minutes,
				error: null
			});
		}
		else {
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
		const city = destCities.find(dc => dc.id == cityId);
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

	handleAddSubmit = e => {
		e.preventDefault();
		const { tripId } = this.props;
		const { plan_name, 
			plan_type, 
			start_date, 
			start_time,
			end_date, 
			end_time,
			description,
			city_name,
			utc_offset_minutes
		} = this.state;
		const plan = { 
			plan_name, 
			plan_type, 
			start_date: `${start_date}T${start_time}:00.000Z`, 
			end_date: `${end_date}T${end_time}:00.000Z`, 
			description,
			city_name,
			utc_offset_minutes
		};

		TripsApiService.postPlan(Number(tripId), plan)
			.then(plan => {
				this.setState({ 
					plan_name: '',
					plan_type: '',
					start_date: '',
					end_date: '',
					description: '',
					city_name: '',
					utc_offset_minutes: '',
					error: null
				});
				this.props.onAddPlanSuccess(plan);
			})
			.catch(res => {
				this.setState({ error: res.error });
			});
	}

	handleUpdateSubmit = e => {
		e.preventDefault();
		const { tripId, plan } = this.props;
		const { plan_name, 
			plan_type, 
			start_date, 
			end_date, 
			description,
			city_name,
			utc_offset_minutes
		} = this.state;
		const updatePlan = { 
			plan_name, 
			plan_type, 
			start_date, 
			end_date, 
			description,
			city_name,
			utc_offset_minutes
		};

		TripsApiService.updatePlan(Number(tripId), Number(plan.id), updatePlan)
			.then(() => {
				this.setState({ 
					plan_name: '',
					plan_type: '',
					start_date: '',
					end_date: '',
					description: '',
					city_name: '',
					utc_offset_minutes: '',
					error: null
				});
				this.props.onUpdatePlanSuccess(plan);
			})
			.catch(res => {
				this.setState({ error: res.error });
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
		types.forEach(t => {
			if (t === plan_type) {
				elements.push(<option key={t} value={t} selected>{t}</option>);
			}
			else {
				elements.push(<option key={t} value={t}>{t}</option>);
			}
		})
		return elements;
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
				field={'plan_name'}
				onChange={this.planNameChanged}
				onSelect={this.planNameChanged}
			/>
		);
	}

	renderNameText() {
		const { plan_type } = this.state;
		switch (plan_type) {
			case 'Flight': return 'Flight';
			case 'Car Rental': return 'Rental agency';
			default: return 'Name';
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
				<ButtonBox>
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
				</ButtonBox>
			</form>
		);
	}
}