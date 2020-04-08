import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formattedDate, getTypeIcon } from '../Utils/Utils';
import './PlanItem.css';

export default class PlanItem extends Component {
	render() {
		const { trip_id, plan } = this.props;
		
		return (
			<Link to={`/trip/${trip_id}/plan/${plan.id}`} className='PlanItem'>
				<div className='PlanItem__details'>
					<span className='PlanItem__icon'>
						<FontAwesomeIcon icon={getTypeIcon(plan.plan_type)} />
					</span>
					<h4>{formattedDate(plan.comparable_date, 'HH:mm')}</h4>
					<div className='PlanItem__text'>
						<p className='PlanItem__name'>{plan.plan_name}</p>
						<p className='PlanItem__subtype'>{plan.plan_subtype}</p>
					</div>
				</div>
			</Link>
		);
	}
}