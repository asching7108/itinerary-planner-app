import React, { Component } from 'react';
import PlanItem from '../components/PlanItem/PlanItem';
import { test_trip_plans } from '../data';

export default class PlanPage extends Component {
	static defaultProps = {
		match: { params: {} }
	}
	
	state = {
		plan: {}
	}

	componentDidMount() {
		const { plan_id } = this.props.match.params;		
		const plan = test_trip_plans.find(p => 
			p.id === Number(plan_id)
		);
		this.setState({ plan });
	}

	render() {
		const { plan } = this.state;
		
		return (
			<section className='PlanPage'>
				<PlanItem
					trip_id={this.props.match.params.trip_id}
					plan={plan}
					location={this.props.location}
				/>
			</section>
		);
	}
}