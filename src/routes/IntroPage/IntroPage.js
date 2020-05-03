import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import tlp from '../../images/tlp.png';
import tp from '../../images/tp.png';
import pp from '../../images/pp.png';
import TripListContext from '../../context/TripListContext';
import AuthApiService from '../../services/auth-api-service';
import { Button } from '../../components/Utils/Utils';
import './IntroPage.css';

const DEMO_CREDENTIAL = {
	email: 'demo@gmail.com',
	password: 'P@ssw0rd'
}

export default class IntroPage extends Component {
	constructor(props) {
		super(props);
		this.state = { error: false };
	}

	static contextType = TripListContext;
	
	handleClickOnExplore = () => {
		AuthApiService.postLogin({ ...DEMO_CREDENTIAL })
			.then(res => {
				this.context.setAuthState(true);
				this.props.history.push('/');
			})
			.catch(res => {
				this.setState({ error: res.error });
			});
	}

	renderExploreBtn() {
		return (
			<Button type='button' className='IntroPage__btn' onClick={e => this.handleClickOnExplore()}>
				EXPLORE VAMOS
			</Button>
		);
	}

	renderFooter() {
		return (
			<footer>
				<p className='footer__author'>
					{'Created by '}
					<a href='http://asching7108.github.io/portfolio' target='_blank' rel="noopener noreferrer">
						Esther Lin
					</a>
				</p>
				<div className='IconsDiv'>
					<a href="https://github.com/asching7108/" target="_blank" rel="noopener noreferrer" className='footer__icon'>
						<FontAwesomeIcon icon={['fab', 'github']} />
					</a>
					<a href='http://www.linkedin.com/in/esther-lin-tw/' target='_blank' rel="noopener noreferrer" className='footer__icon'>
						<FontAwesomeIcon icon={['fab', 'linkedin']} />
					</a>
				</div>
				<p className='footer__copyright'>Copyright ©2020</p>
			</footer>
		)
	}

	render() {
		const { error } = this.state;
		return (
			<>
				<section className='IntroPage'>
					<div role='alert'>
						{error && <p className='red'>{error}</p>}
					</div>
					<div className='IntroPage__content-wide'>
						<h1>Create itineraries can be a breeze.</h1>
						<img src={tlp} alt='Trip list page screenshot' />
						<h1>Easily managed. Smartly displayed.</h1>
						<img src={tp} alt='Trip page screenshot' />
						<h1>Have all the travel infos you need at hand.</h1>
						<img src={pp} alt='Plan page screenshot' />
						{this.renderExploreBtn()}
					</div>
					<div className='IntroPage__content-narrow'>
						<h2>Create, manage and display itineraries like a breeze.</h2>
						{this.renderExploreBtn()}
					</div>
				</section>
				{this.renderFooter()}
			</>
		);
	}
}