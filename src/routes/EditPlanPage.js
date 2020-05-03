import React, { Component } from 'react';
import TripContext from '../context/TripContext';
import PlanForm from '../components/PlanForm/PlanForm';

export default class EditPlanPage extends Component {
	static defaultProps = { match: { params: '' } };

	constructor(props) {
		super(props);
		this.state = { plans: [] };
	}

	static contextType = TripContext;

	componentDidMount() {
		if (this.context.needToUpdate()) {
			this.context.updateTrip(this.props.match.params.trip_id);
		}
	}

	componentDidUpdate() {
		const { match: { params }, history } = this.props;
		const { planList, error } = this.context;
		if (error) {
			history.push('/page-not-found');
		}
		else if (!this.state.plans[0] && planList[0]) {
			if (planList.find(p => p.id === Number(params.plan_id))) {
				this.setState({
					plans: planList.filter(p => p.id === Number(params.plan_id))
				});
			}
			else {
				history.push('/page-not-found');
			}
		}
	}

	handleUpdatePlanSuccess = plans => {
		this.context.updateTrip(plans[0].trip_id);

		const { history } = this.props;
		history.push(`/trip/${plans[0].trip_id}`);
	}

	handleClickOnCancel = () => {
		this.props.history.goBack();
	}
	
	render() {
		return (
			<section className='EditPlanPage'>
				<h2>Edit plan</h2>
				<PlanForm 
					trip={this.context.trip}
					plans={this.state.plans}
					location={this.props.location}
					onUpdatePlanSuccess={this.handleUpdatePlanSuccess}
					onClickOnCancel={this.handleClickOnCancel}
				/>
			</section>
		);
	}
}