import React from 'react';
import { Link } from 'react-router-dom';
import Flatpickr from 'react-flatpickr';
import moment from 'moment';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Utils.css';
import 'flatpickr/dist/themes/dark.css';
import {
	faEdit,
	faTrashAlt,
	faTimes,
	faPlane,
	faBed,
	faCar,
	faUtensils,
	faWalking,
	faHeart,
	faLaptop,
	faSubway,
	faMapMarkerAlt,
	faPhone,
	faGlobe,
	faPlus,
	faMinus,
	faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';

export function formatDate(dateStr, format = 'dddd, MMMM D, YYYY') {
	return moment.parseZone(dateStr).format(format);
}

export function toDate(dateStr) {
	return moment(formatDate(dateStr, 'YYYY-MM-DDTHH:mm:ss'))
		.utcOffset(new Date().getTimezoneOffset()).toDate();
}

export function Button({ className, ...props }) {
	return (
		<button className={['Button', className].join(' ')} {...props} />
	);
}

export function Select({ className, ...props }) {
	return (
		<select className={['Select', className].join(' ')} {...props} />
	);
}

export function Input({ className, ...props }) {
	return (
		<input className={['Input', className].join(' ')} {...props} />
	);
}

export function Textarea({ className, ...props }) {
	return (
		<textarea className={['Textarea', className].join(' ')} {...props} />
	)
}

export function Required({ className, ...props }) {
	return (
		<span className={['Required', className].join(' ')} {...props}>
			&#42;
		</span>
	);
}

export function CFlatpickr({ className, options, ...props }) {
	return (
		<Flatpickr 
			className={['Input', className].join(' ')} 
			options={{
				shorthandCurrentMonth: true,
				...options
			}}
			{ ...props } 
		/>
	);
}

export function LinkButton({ className, ...props }) {
	return (
		<Link className={['LinkButton Button', className].join(' ')} {...props} />
	);
}

export function EditIcon({ className, ...props }) {
	return (
		<Link className={['Icon blue', className].join(' ')} {...props}>
			<FontAwesomeIcon icon='edit' />
		</Link>
	);
}

export function DeleteIcon({ className, ...props }) {
	return (
		<button className={['Icon blue', className].join(' ')} {...props}>
			<FontAwesomeIcon icon='trash-alt' />
		</button>
	);
}

export function CloseIcon({ className, ...props }) {
	return (
		<div className={['Icon CloseIcon grey', className].join(' ')} {...props}>
			<FontAwesomeIcon icon='times' />
		</div>
	);
}

export function getTypeIcon(type) {
	switch (type) {
		case 'Flight': return 'plane';
		case 'Lodging': return 'bed';
		case 'Car Rental': return 'car';
		case 'Restaurant': return 'utensils';
		case 'Sightseeing': return 'heart';
		case 'Meeting': return 'meeting';
		case 'Transportation': return 'subway';
		default: return 'walking';
	}
}

export function registerIcons() {
	library.add(
		faEdit,
		faTrashAlt,
		faTimes,	// close icon
		faPlane,	// type: flight
		faBed,	// type: lodging
		faCar,	// type: car rental
		faUtensils,	// type: restaurant
		faWalking,	// type: activity
		faHeart,	// type: sightseeing
		faLaptop,	// type: meeting
		faSubway,	// type: transportation
		faMapMarkerAlt,	// address
		faPhone,	// phone number
		faGlobe,	// website
		faPlus,
		faMinus,
		faPaperPlane,	// favicon
		far,
		fab
	);
}