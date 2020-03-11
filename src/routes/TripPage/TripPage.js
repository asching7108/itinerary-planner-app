import React, { Component } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TripContext from '../../context/TripContext';
import TripsApiService from '../../services/trips-api-service';
import TripItem from '../../components/TripItem/TripItem';
import PlanItem from '../../components/PlanItem/PlanItem';
import { FormattedDate, Button, ButtonBox, ButtonLikeLink } from '../../components/Utils/Utils';
import './TripPage.css';

export default class TripPage extends Component {
	static defaultProps = {
		match: { params: {} }
	}
	static contextType = TripContext;

	componentDidMount() {
		const { trip_id } = this.props.match.params;
		this.context.clearError();
		
		TripsApiService.getTripById(trip_id)
			.then(this.context.setTrip)
			.catch(this.context.setError);

		TripsApiService.getTripPlans(trip_id)
			.then(this.context.setPlanList)
			.catch(this.context.setError);
	}

	componentWillUnmount() {
		this.context.clearTrip();
	}

	handleClickOnDelete = e => {
		const { trip_id } = this.props.match.params;
		TripsApiService.deleteTrip(trip_id)
			.then(() => {
				const { history } = this.props;
				history.push('/');
			})
			.catch(res => {
				console.log(res.error);
			});
	}

	renderDate(i, date) {
		return (
			<p key={i} className='TripPage__date'>
				{FormattedDate(date).toUpperCase()}
			</p>
		);
	}

	renderPlans() {
		const { trip, planList = [] } = this.context;
		
		if (!planList.length) {
			return (
				<p className='TripPage__no-plan'>
					Start adding plans to your trip now.
				</p>
			);
		}

		const elements = [];
		let currDate = getDateStrWithoutTime(planList[0].comparable_date);
		
		elements.push(
			this.renderDate(0, currDate)
		);
		for(let i = 0; i < planList.length; i++) {
			const plan = planList[i];
			
			if (getDateStrWithoutTime(plan.comparable_date) > currDate) {
				currDate = getDateStrWithoutTime(plan.comparable_date);
				elements.push(
					this.renderDate(elements.length, currDate)
				);
			}
			elements.push(
				<PlanItem
					key={elements.length}
					trip_id={trip.id}
					plan={plan}
					location={this.props.location}
				/>
			);
		}
		return elements;
	}

	render() {
		const { trip } = this.context;
		return (
			<section className='TripPage'>
				<div className='TripPage__close-icon-box'>
					<div 
						className='TripPage__close-icon'
						onClick={e => this.props.history.goBack()}
					>
						<FontAwesomeIcon className='grey' icon='times' />
					</div>
				</div>
				<TripItem
					trip={trip}
					location={this.props.location}
				/>
				<ButtonBox>
					<ButtonLikeLink 
						to={`/trip/${trip.id}/edit`}
						className='delete'
					>
						Edit trip
					</ButtonLikeLink>
					<Button
						className='delete'
						onClick={this.handleClickOnDelete}
					>
						Delete trip
					</Button>
					<ButtonLikeLink 
						to={`/trip/${trip.id}/add-plan`}
						className='add'
					>
						Add a plan
					</ButtonLikeLink>
				</ButtonBox>
				<div className='TripPage__plan_list'>
					{this.renderPlans()}
				</div>
			</section>
		);
	}
}

function getDateStrWithoutTime(dateStr) {
	let date = moment.parseZone(dateStr);
	return `${date.format('YYYY-MM-DD')}T00:00:00${date.format('Z')}`;
}