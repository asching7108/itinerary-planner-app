import React, { Component } from 'react';
import Modal from 'react-modal';
import './ReactModal.css';

Modal.setAppElement(document.getElementById('root'));

export default class ReactModal extends Component {
	static defaultProps = {
		showModal: false,
		name: '',
		onCloseModal: () => {},
		onClickOnDelete: () => {}
	};

	render() {
		const { showModal, name, onCloseModal, onClickOnDelete } = this.props;
		return (
			<Modal
				isOpen={showModal}
				onRequestClose={onCloseModal}
				className='ReactModal__cus-content'
				overlayClassName='ReactModal__cus-overlay'
				contentLabel='Confirm Delete'
				shouldFocusAfterRender={false}
			>
				<h2>{`Delete ${name}`}</h2>
				<h4>It will be deleted permanently.</h4>
				<div className='ButtonsDiv'>
					<button className='ReactModal__btn-cancel' onClick={onCloseModal}>Cancel</button>
					<button className='ReactModal__btn-delete' onClick={onClickOnDelete}>Delete</button>
				</div>
			</Modal>
		);
	}
}
