import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TripContext from '../../context/TripContext';
import TripsApiService from '../../services/trips-api-service';
import { formatDate, getTypeIcon, EditIcon, DeleteIcon, CloseIcon } from '../../components/Utils/Utils';
import './PlanPage.css';

export default class PlanPage extends Component {
	constructor(props) {
		super(props);
		this.state = { plans: [] };
	}

	static contextType = TripContext;
	
	componentDidMount() {
		const { trip_id } = this.props.match.params;
		if (this.context.needToUpdate(trip_id)) {
			this.context.updateTrip(trip_id);
		}
		this.updateState();
	}

	componentDidUpdate() {
		const { match: { params }, history } = this.props;
		const { planList, error } = this.context;
		if (error) {
			history.push('/page-not-found');
		}
		else if (!this.state.plans[0] && planList[0]) {
			if (planList.find(p => p.id === Number(params.plan_id))) {
				this.updateState();
			}
			else {
				history.push('/page-not-found');
			}
		}
	}

	updateState() {
		this.setState({
			plans: this.context.planList.filter(p => p.id === Number(this.props.match.params.plan_id))
		});
	}

	handleClickOnDelete = e => {
		const { match: { params }, history } = this.props;
		TripsApiService.deletePlan(params.trip_id, params.plan_id)
			.then(() => {
				history.push(`/trip/${params.trip_id}`);
			})
			.catch(res => {
				console.log(res.error);
			});
	}

	renderPlanHeading() {
		const { match: { params }, history } = this.props;
		const { plans } = this.state;

		return (
			<div className='PlanPage__heading'>
				<div className='PlanPage__title'>
					<div className='PlanPage__title-left'>
						<h2 className='PlanPage__name'>{plans[0].plan_name}</h2>
						<EditIcon to={`/trip/${params.trip_id}/plan/${params.plan_id}/edit`} />
						<DeleteIcon onClick={this.handleClickOnDelete} />
					</div>
					<CloseIcon onClick={e => history.push(`/trip/${params.trip_id}`)} />
				</div>
				<div className='PlanPage__type'>
					<span className='PlanPage__icon'>
						<FontAwesomeIcon icon={getTypeIcon(plans[0].plan_type)} />
					</span>
					<p className="PlanPage__type">{plans[0].plan_type}</p>
				</div>
			</div>
		);
	}

	renderPlanTime() {
		const { plans } = this.state;

		const startText = {
			'Flight': 'Departure',
			'Lodging': 'Check In',
			'Car Rental': 'Pick Up'
		};
		const endText = {
			'Flight': 'Arrival',
			'Lodging': 'Check Out',
			'Car Rental': 'Drop Off'
		};

		return (
			<div className='PlanPage__time'>
				<div className='PlanPage__start_time'>
					<h4>{startText[plans[0].plan_type] || 'From'}</h4>
					<h3>{formatDate(plans[0].start_date, 'ddd, MMM D').toUpperCase()}</h3>
					<h2>{formatDate(plans[0].start_date, 'hh:mm a')}</h2>
				</div>
				{plans[0].end_date && 
					<div className='PlanPage__end_time'>
						<h4>{endText[plans[0].plan_type] || 'To'}</h4>
						<h3>{formatDate(plans[0].end_date, 'ddd, MMM D').toUpperCase()}</h3>
						<h2>{formatDate(plans[0].end_date, 'hh:mm a')}</h2>
					</div>
				}
			</div>
		);
	}

	renderPlanDetails() {
		const { plans } = this.state;

		return (
			<div className='PlanPage__details'>
				<div className='PlanPage__type'>
					<span className='PlanPage__icon'>
						<FontAwesomeIcon icon='map-marker-alt' />
					</span>
					<p className='PlanPage__address'>{plans[0].formatted_address}</p>
				</div>
				<div className='PlanPage__type'>
					<span className='PlanPage__icon'>
						<FontAwesomeIcon icon='phone' />
					</span>
					<p className='PlanPage__phone'>{plans[0].international_phone_number}</p>
				</div>
				<div className='PlanPage__type'>
					<span className='PlanPage__icon'>
						<FontAwesomeIcon icon='globe-asia' />
					</span>
					<p className='PlanPage__web'>
						<a target='_blank' href={plans[0].website} rel="noopener noreferrer">{plans[0].website}</a>
					</p>
				</div>
			</div>
		);
	}

	render() {
		if (!this.state.plans[0]) return <></>;
		return (
			<section className='PlanPage'>
				{this.renderPlanHeading()}
				{this.renderPlanTime()}
				{this.renderPlanDetails()}
			</section>
		);
	}
}