import React, { Component } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TripContext from '../../context/TripContext';
import TripItem from '../../components/TripItem/TripItem';
import PlanItem from '../../components/PlanItem/PlanItem';
import { FormattedDate, ButtonBox, ButtonLikeLink } from '../../components/Utils/Utils';
import { test_trips, test_trip_plans } from '../../data';
import './TripPage.css';
import { Link } from 'react-router-dom';

export default class TripPage extends Component {
	static defaultProps = {
		match: { params: {} }
	}
	static contextType = TripContext;

	componentDidMount() {
		const { trip_id } = this.props.match.params;		
		const trip = test_trips.find(t => 
			t.id == trip_id
		);
		this.context.setTrip(trip);
			
		const planList = test_trip_plans.filter(p => 
			p.trip_id == trip_id
		);
		this.context.setPlanList(planList);	
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
		let currDate = getDateStrWithoutTime(planList[0].start_date);
		
		elements.push(
			this.renderDate(0, currDate)
		);
		for(let i = 0; i < planList.length; i++) {
			const plan = planList[i];
			
			if (getDateStrWithoutTime(plan.start_date) > currDate) {
				currDate = getDateStrWithoutTime(plan.start_date);
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
						to={`/trip/${trip.id}/edit-trip`}
						className='delete'
					>
						Edit trip
					</ButtonLikeLink>
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