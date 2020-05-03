import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDate, getTypeIcon } from '../Utils/Utils';
import './PlanItem.css';

const TYPES_FOR_DETAILS = [
	'Flight',
	'Transportation'
];

export default class PlanItem extends Component {
	static defaultProps = {
		trip_id: '',
		plan: {}
	};

	renderMainTextRow() {
		const { plan } = this.props;
		const text = TYPES_FOR_DETAILS.includes(plan.plan_type)
			? `${plan.from_name}${plan.from_terminal && ` (${plan.from_terminal})`}` + 
				`  -  ${plan.to_name}${plan.to_terminal && ` (${plan.to_terminal})`}`
			: plan.plan_name;

		return (
			<div className='PlanItem__text-row'>
				<h3>{text}</h3>
				{plan.plan_subtype && <h3 className='PlanItem__subtype'>{plan.plan_subtype}</h3>}
			</div>
		);
	}

	renderSubTextRow() {
		const { plan } = this.props;
		const address = plan.formatted_address
		? plan.formatted_address
		: plan.from_formatted_address
			? plan.from_formatted_address
			: plan.to_formatted_address;
		const text = TYPES_FOR_DETAILS.includes(plan.plan_type)
			? plan.plan_name
			: address;
		
		return (
			<div className='PlanItem__text-row'>
				{text && <h4 className='PlanItem__address'>{text}</h4>}
			</div>
		);
	}

	render() {
		const { trip_id, plan } = this.props;
		
		return (
			<Link to={`/trip/${trip_id}/plan/${plan.id}`} className='PlanItem'>
				<div className='PlanItem__details'>
					<span className='PlanItem__icon'>
						<FontAwesomeIcon icon={getTypeIcon(plan.plan_type)} />
					</span>
					{plan.comparable_date && <h4>{formatDate(plan.comparable_date, 'hh:mm a')}</h4>}
					<div className='PlanItem__text'>
						{this.renderMainTextRow()}
						{this.renderSubTextRow()}
					</div>
				</div>
			</Link>
		);
	}
}