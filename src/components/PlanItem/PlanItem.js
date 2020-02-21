import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedDate } from '../Utils/Utils';
import './PlanItem.css';

export default class PlanItem extends Component {
	render() {
    const { trip_id, plan } = this.props;
    
    return (
      <Link to={`/trip/${trip_id}/plan/${plan.id}/edit`} className='PlanItem'>
        <div className='PlanItem__details'>
          <span className='PlanItem__icon'>
            <FontAwesomeIcon className='white' icon={getTypeIcon(plan.type)} />
          </span>
          <h4>{FormattedDate(plan.start_date, 'HH:mm')}</h4>
          <div className='PlanItem__text'>
            <p className='PlanItem__name'>{plan.name}</p>
            <p className='PlanItem__sub-type'>{plan.sub_type}</p>
          </div>
        </div>
      </Link>
    );
	}
}

function getTypeIcon(type) {
  switch (type) {
    case 'Flight': return 'plane';
    case 'Lodging': return 'bed';
    case 'Car Rental': return 'car';
    case 'Restaurant': return 'utensils';
    default: return 'walking';
  }
}