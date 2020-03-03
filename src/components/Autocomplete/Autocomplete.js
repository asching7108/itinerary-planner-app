import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
import './Autocomplete.css';

export default class Autocomplete extends Component {
	static defaultProps = {
		id: '',
		field: '',
		value: '',
		type: [],
		componentRestrictions: {},
		onSelect: () => {}
	};

	constructor(props) {
		super(props);
		
		this.state = {
			items: [],
			inputValue: ''
		};
	}

	componentDidMount() {
		this.setState({
			inputValue: this.props.value
		});
	}

	handleChange = content => {
		this.setState({ inputValue: content });
	}

	handleSelect = selection => {
		const { id, field, onSelect } = this.props;
		this.setState({ inputValue: selection });
		
		onSelect(field, selection, id);
	}

	renderInput = ({ getInputProps, getSuggestionItemProps, suggestions }) => {
		const activeStyle = { display: 'block' };
		const inactiveStyle = { display: 'none' };
		
		return (
			<div className='Autocomplete'>
				<input className="Input" {...getInputProps()} />
				<div 
					className="Autocomplete__dropdown"
					style={suggestions.length ? activeStyle : inactiveStyle}
				>
					{suggestions.map(suggestion => (
						<div {...getSuggestionItemProps(suggestion)} className="Autocomplete__suggestion">
							<span>{suggestion.description}</span>
						</div>
					))}
				</div>
			</div>
		);
	};

	render() {
		const { callbackName, types, componentRestrictions } = this.props;
		const { inputValue } = this.state;


		const searchOptions = {
			types,
			componentRestrictions
		 }

		return (
			<PlacesAutocomplete
				value={inputValue}
				onChange={this.handleChange}
				onSelect={this.handleSelect}
				// Pass the search options prop
				searchOptions={searchOptions}
				googleCallbackName='callbackFunc'
			>
				{this.renderInput}
			</PlacesAutocomplete>
		);
	}
}