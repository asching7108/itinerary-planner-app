import React, { Component } from 'react';
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
			id: '',
			name: '',
			type: '',
			trip_id: '',
			dest_city: '',
			start_date: '',
			end_date: '',
			start_time: '',
			end_time: '',
			description: '',
			error: null
		};
	}
	
	componentDidMount() {
		const { plan } = this.props;
		
		if (plan) {
			this.setState({
				id: plan.id,
				name: plan.name,
				type: plan.type,
				trip_id: plan.trip_id,
				dest_city: plan.dest_city,
				start_date: FormattedDate(plan.start_date, 'YYYY-MM-DD'),
				end_date: FormattedDate(plan.end_date, 'YYYY-MM-DD'),
				start_time: FormattedDate(plan.start_date, 'HH:mm'),
				end_time: FormattedDate(plan.end_date, 'HH:mm'),
				description: plan.description,
				error: null
			});
		}
		else {
			this.setState({
				type: 'Flight'
			});
		}
	}

	inputChanged = (field, content) => {
		this.setState({ [field]: content });
	}

	handleAddSubmit = e => {
		e.preventDefault();
		const { name, type, start_date, end_date, description } = this.state;
		const plan = { name, type, start_date, end_date, description };

		this.setState({ 
			id: '',
			name: '',
			type: '',
			trip_id: '',
			dest_city: '',
			start_date: '',
			end_date: '',
			description: '',
			error: null
		});

		this.props.onAddPlanSuccess(plan);
	}

	handleUpdateSubmit = e => {
		e.preventDefault();
		const { id, name, type, start_date, end_date, description } = this.state;
		const plan = { id, name, type, start_date, end_date, description };
		
		this.setState({ 
			name: '',
			dest_city: [],
			start_date: '',
			end_date: '',
			description: '',
			destCityCount: 1,
			error: null
		});

		this.props.onUpdatePlanSuccess(plan);
	}

	renderTypeOptions() {
		const { type } = this.state;
		const elements = [];
		types.forEach(t => {
			if (t === type) {
				elements.push(<option key={t} value={t} selected>{t}</option>);
			}
			else {
				elements.push(<option key={t} value={t}>{t}</option>);
			}
		})
		return elements;
	}

	renderNameInput() {
		const { type } = this.state;
		if (type === 'Flight') {
			return (
				<Input
					name='name'
					type='text'
					id='PlanForm__name'
					required
					value={this.state.name}
					onChange={e => this.inputChanged('name', e.target.value)}
				/>
			);
		}
		return (
			<Autocomplete
				id='PlanForm__name'
				value={this.state.name}
				field={'name'}
				onSelect={this.inputChanged}
			/>
		);
	}

	renderNameText() {
		const { type } = this.state;
		switch (type) {
			case 'Flight': return 'Flight';
			case 'Car Rental': return 'Rental agency';
			default: return 'Name';
		}
	}

	renderStartDateAndTimeText() {
		const { type } = this.state;
		switch (type) {
			case 'Flight': return 'Departure';
			case 'Lodging': return 'Check In';
			default: return 'Start';
		}
	}

	renderEndDateAndTimeText() {
		const { type } = this.state;
		switch (type) {
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
				<div>
					<label htmlFor='PlanForm__type'>
						Type
					</label>
					<Select
						name='type'
						id='PlanForm__type'
						required
						onChange={e => this.inputChanged('type', e.target.value)}
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