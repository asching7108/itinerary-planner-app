import React, { Component } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import './Autocomplete.css';

export default class Autocomplete extends Component {
	static defaultProps = {
		id: '',
		value: '',
		type: [],
		componentRestrictions: {},
		onChange: () => {},
		onSelect: () => {}
	};

	constructor(props) {
		super(props);
		this.state = { 
			inputValue: ''
		};
	}

	componentDidMount() {
		this.setState({
			inputValue: this.props.value
		});
	}

	componentDidUpdate(prevProps) {
		if (prevProps.value !== this.props.value) {
			this.setState({
				inputValue: this.props.value
			});
		}
	}

	handleChange = content => {
		const { id, onChange } = this.props;
		this.setState({ inputValue: content });
		onChange({ name: content }, id);
	}

	handleSelect = (selection, placeId) => {
		this.setState({ inputValue: selection });
		
		/*global google*/
		const map = new google.maps.Map(document.createElement('div'), {
			center: { lat: 0, lng: 0 },
			zoom: 0
		});
		const service = new google.maps.places.PlacesService(map);
		const request = {
			placeId,
			fields: ['place_id', 'name', 'utc_offset_minutes']
		};
		service.getDetails(request, this.handlePlaceDetails);
	}

	handlePlaceDetails = (place, status) => {
		const { id, onSelect } = this.props;
		const selection = {
			name: place.name,
			place_id: place.place_id,
			utc_offset_minutes: place.utc_offset_minutes
		};

		onSelect(selection, id);
	}

	renderInput = ({ getInputProps, getSuggestionItemProps, suggestions }) => {
		const activeStyle = { display: 'block' };
		const inactiveStyle = { display: 'none' };
		
		return (
			<div className='Autocomplete'>
				<input className='Input' {...getInputProps()} />
				<div 
					className='Autocomplete__dropdown'
					style={suggestions.length ? activeStyle : inactiveStyle}
				>
					{suggestions.map(suggestion => (
						<div {...getSuggestionItemProps(suggestion)} className='Autocomplete__suggestion'>
							<span place_id={suggestions.place_id}>{suggestion.description}</span>
						</div>
					))}
				</div>
			</div>
		);
	};

	render() {
		const { types, componentRestrictions } = this.props;
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