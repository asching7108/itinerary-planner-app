import React, { Component } from 'react';
import TripContext from '../context/TripContext';
import PlanForm from '../components/PlanForm/PlanForm';

export default class AddPlanPage extends Component {
	static defaultProps = { match: { params: '' } };

	constructor(props) {
		super(props);
		this.state = { error: null };
	}

	static contextType = TripContext;

	componentDidMount() {
		if (this.context.needToUpdate()) {
			this.context.updateTrip(this.props.match.params.trip_id);
		}
	}

	componentDidUpdate() {
		if (!this.state.error && this.context.error) {
			this.setState({ error: this.context.error });
		}
	}

	handleAddPlanSuccess = plans => {
		this.context.updateTrip(plans[0].trip_id);

		const { history } = this.props;
		history.push(`/trip/${plans[0].trip_id}`);
	}

	handleClickOnCancel = () => {
		const { match: { params }, history } = this.props;
		history.push(`/trip/${params.trip_id}`);
	}
	
	render() {
		const { trip } = this.context;
		const { error } = this.state;

		if (error) {
			return <section><h2>{error}</h2></section>;
		}

		return (
			<section className='AddPlanPage'>
				<h2>Create a plan</h2>
				<PlanForm 
					trip={trip}
					location={this.props.location}
					onAddPlanSuccess={this.handleAddPlanSuccess}
					onClickOnCancel={this.handleClickOnCancel}
				/>
			</section>
		);
	}
}