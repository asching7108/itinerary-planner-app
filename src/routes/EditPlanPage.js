import React, { Component } from 'react';
import TripContext from '../context/TripContext';
import PlanForm from '../components/PlanForm/PlanForm';

export default class EditPlanPage extends Component {
	static defaultProps = { match: { params: '' } };

	constructor(props) {
		super(props);
		this.state = {
			plans: [],
			error: null
		};
	}

	static contextType = TripContext;

	componentDidMount() {
		if (this.context.needToUpdate()) {
			this.context.updateTrip(this.props.match.params.trip_id);
		}
	}

	componentDidUpdate() {
		const { plan_id } = this.props.match.params;
		const { planList, error } = this.context;

		if (!this.state.error && error) {
			this.setState({ error });
		}
		
		else if (!this.state.error && !this.state.plans[0] && planList[0]) {
			if (planList.find(p => p.id === Number(plan_id))) {
				this.setState({
					plans: planList.filter(p => p.id === Number(plan_id))
				});
			}
			else {
				this.setState({ error: `Plan doesn't exist` });
			}
		}
	}

	handleUpdatePlanSuccess = plans => {
		this.context.updateTrip(plans[0].trip_id);

		const { history } = this.props;
		history.push(`/trip/${plans[0].trip_id}/plan/${plans[0].id}`);
	}

	handleClickOnCancel = () => {
		const { match: { params }, history } = this.props;
		history.push(`/trip/${params.trip_id}/plan/${params.plan_id}`);
	}
	
	render() {
		const { trip } = this.context;
		const { plans, error } = this.state;
		
		if (error) {
			return <section><h2>{error}</h2></section>;
		}

		return (
			<section className='EditPlanPage'>
				<h2>Edit plan</h2>
				<PlanForm 
					trip={trip}
					plans={plans}
					location={this.props.location}
					onUpdatePlanSuccess={this.handleUpdatePlanSuccess}
					onClickOnCancel={this.handleClickOnCancel}
				/>
			</section>
		);
	}
}