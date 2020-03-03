import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { FormattedDate } from '../Utils/Utils';
import './TripItem.css';

export default class TripItem extends Component {
	static defaultProps = {
		trip: {}
	};

	renderTripItemDetailDesc() {
		const { trip } = this.props;
		if (this.props.location.pathname !== '/' && trip.description) {
			return (
				<p className='TripItem__description'>
					{trip.description}
				</p>
			);
		}
	}

	renderTripItemDetail() {
		const { trip } = this.props;
			
		return (
			<div className='TripItem__details'>
				<h2 className='TripItem__title'>{trip.trip_name}</h2>
				<h3 className='TripItem__dest_city'>
					{trip.dest_cities && trip.dest_cities.map(destCity => destCity.city_name).join(', ')}
				</h3>
				<h4 className='TripItem__date'>
					{
						hasSameYear(trip.start_date, trip.end_date)
							? FormattedDate(trip.start_date, 'ddd, MMM D')
							: FormattedDate(trip.start_date, 'ddd, MMM D, YYYY')
					} - {
						FormattedDate(trip.end_date, 'ddd, MMM D, YYYY')
					}
				</h4>
				{this.renderTripItemDetailDesc()}
			</div>
		);
	}
	
	//{FormattedDate(new Date(trip.start_date))} - {FormattedDate(new Date(trip.end_date))}
	renderTripItem() {
		return (
			<div className='TripItem TripItem__heading'>
				{this.renderTripItemDetail()}
			</div>
		);
	}
	
	renderTripItemLink() {
		const { trip } = this.props;
		return (
			<Link to={`/trip/${trip.id}`} className='TripItem'>
				{this.renderTripItemDetail()}
			</Link>
		);
	}
	
	render() {
		return (
			this.props.location.pathname === '/'
				? this.renderTripItemLink()
				: this.renderTripItem()
		);
	}
}

function hasSameYear(date1, date2) {
	if (moment.parseZone(date1).get('year') === moment.parseZone(date2).get('year')) {
		return true;
	}
	return false;
}