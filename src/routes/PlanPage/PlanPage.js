import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TripContext from '../../context/TripContext';
import { formattedDate, getTypeIcon } from '../../components/Utils/Utils';
import './PlanPage.css';

export default class PlanPage extends Component {
	static defaultProps = {
		match: { params: {} }
	}

	constructor(props) {
		super(props);
		this.state = { plans: [] };
	}

	static contextType = TripContext;
	
	componentDidMount() {
		const { trip_id } = this.props.match.params;
		if (this.context.needToUpdate) {
			this.context.updateTrip(trip_id);
		}
		this.updateState();
	}

	componentDidUpdate() {
		if (!this.state.plans[0] && this.context.planList[0]) {
			this.updateState();
		}
	}

	updateState() {
		const { plan_id } = this.props.match.params;
		this.setState({
			plans: this.context.planList.filter(p => p.id == plan_id)
		});
	}

	render() {
		const { plans } = this.state;
		
		if (!plans[0]) return <></>;
		return (
			<section className='PlanPage'>
				<h2 className='PlanPage__name'>{plans[0].plan_name}</h2>

				<p className="PlanPage__type">{plans[0].plan_type}</p>
				<p className='PlanPage__subtype'>{plans[0].plan_subtype}</p>
				<div className='PlanItem__details'>
					
					<h4>{formattedDate(plans[0].comparable_date, 'HH:mm')}</h4>
					<div className='PlanItem__text'>
						<p className='PlanPage__subtype'>{plans[0].plan_subtype}</p>
					</div>
				</div>
			</section>
		);
	}
}