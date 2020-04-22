import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDate, getTypeIcon } from '../Utils/Utils';
import './PlanItem.css';

export default class PlanItem extends Component {
	render() {
		const { trip_id, plan } = this.props;
		const address = plan.formatted_address
			? plan.formatted_address
			: plan.from_formatted_address
				? plan.from_formatted_address
				: plan.to_formatted_address;
		
		return (
			<Link to={`/trip/${trip_id}/plan/${plan.id}`} className='PlanItem'>
				<div className='PlanItem__details'>
					<span className='PlanItem__icon'>
						<FontAwesomeIcon icon={getTypeIcon(plan.plan_type)} />
					</span>
					<h4>{formatDate(plan.comparable_date, 'hh:mm a')}</h4>
					<div className='PlanItem__text'>
						<div className='PlanItem__text-row'>
							<p className='PlanItem__name'>{plan.plan_name}</p>
							{plan.plan_subtype && <p className='PlanItem__subtype'>{plan.plan_subtype}</p>}
						</div>
						{address && <p className='PlanItem__address'>{address}</p>}
					</div>
				</div>
			</Link>
		);
	}
}