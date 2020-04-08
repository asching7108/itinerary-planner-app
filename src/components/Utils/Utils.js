import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './Utils.css';

export function formattedDate(dateStr, format = 'dddd, MMMM D, YYYY') {
	return moment.parseZone(dateStr).format(format);
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

export function LinkButton({ className, ...props }) {
	return (
		<Link className={['LinkButton', className].join(' ')} {...props} />
	);
}

export function ButtonIcon({ className, ...props }) {
	return (
		<button className={['ButtonIcon', className].join(' ')} {...props} />
	);
}

export function LinkIcon({ className, ...props }) {
	return (
		<Link className={['LinkIcon', className].join(' ')} {...props} />
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