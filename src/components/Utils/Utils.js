import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './Utils.css';

export function FormattedDate(dateStr, format = 'dddd, MMMM D, YYYY') {
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

export function ButtonLikeLink({ className, ...props }) {
	return (
		<Link className={['ButtonLikeLink', className].join(' ')} {...props} />
	);
}

export function ButtonBox({ className, ...props }) {
	return (
		<div className={['ButtonBox', className].join(' ')} {...props} />
	);
}