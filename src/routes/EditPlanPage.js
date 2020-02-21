import React, { Component } from 'react';
import TripContext from '../context/TripContext';
import PlanForm from '../components/PlanForm/PlanForm';

export default class EditPlanPage extends Component {
	static contextType = TripContext;

	handleUpdatePlanSuccess = plan => {
		const trip_id = this.props.match.params.trip_id;

    const { history } = this.props;
    history.push(`/trip/${trip_id}`);
	}

	handleClickOnCancel = () => {
		const { history } = this.props;
    history.goBack();
	}
	
	render() {
    const { planList } = this.context;
    const plan_id = this.props.match.params.plan_id;
    const plan = planList.find(p => p.id == plan_id);
    return (
			<section className='EditPlanPage'>
				<h2>Edit plan</h2>
        <PlanForm 
          plan={plan}
					location={this.props.location}
					onUpdatePlanSuccess={this.handleUpdatePlanSuccess}
					onClickOnCancel={this.handleClickOnCancel}
				/>
			</section>
		);
  }
}