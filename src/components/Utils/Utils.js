import React from 'react';
import { Link } from 'react-router-dom';
import Flatpickr from 'react-flatpickr';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Utils.css';
import 'flatpickr/dist/themes/dark.css';

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
		default: return 'walking';
	}
}

export function getDate(date) {
	return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}