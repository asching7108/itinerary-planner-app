import React, { Component } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import './Autocomplete.css';

let google = window.google;

export default class Autocomplete extends Component {
	static defaultProps = {
		id: '',
		value: '',
		type: [],
		componentRestrictions: {},
		viewport: {},
		required: false,
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
		if (!google && window.google) { google = window.google; }
	}

	handleChange = content => {
		const { id, onChange } = this.props;
		this.setState({ inputValue: content });
		onChange({
			name: content,
			place_id: '',
			formatted_address: '',
			international_phone_number: '',
			website: ''
		}, id);
	}

	handleSelect = (selection, placeId) => {
		this.setState({ inputValue: selection });

		if (!placeId) { return; }
		const map = new google.maps.Map(document.createElement('div'), {
			center: { lat: 0, lng: 0 },
			zoom: 0
		});
		const service = new google.maps.places.PlacesService(map);
		const request = {
			placeId,
			fields: [
				'place_id', 
				'name', 
				'utc_offset_minutes',
				'formatted_address',
				'international_phone_number',
				'website',
				'geometry'
			]
		};
		service.getDetails(request, this.handlePlaceDetails);
	}

	handlePlaceDetails = (place, status) => {
		const { id, onSelect } = this.props;
		const selection = {
			name: place.name,
			place_id: place.place_id,
			utc_offset_minutes: place.utc_offset_minutes,
			formatted_address: place.formatted_address,
			international_phone_number: place.international_phone_number,
			website: place.website,
			viewport: place.geometry.viewport
		};

		onSelect(selection, id);
	}

	renderInput = ({ getInputProps, getSuggestionItemProps, suggestions }) => {
		const { required } = this.props;
		const dropdownClassName = suggestions.length 
			? 'Autocomplete__dropdown-active' 
			: 'Autocomplete__dropdown-inactive';

		return (
			<div className='Autocomplete'>
				<input {...getInputProps({ className: 'Input', required })} />
				<div className={dropdownClassName}>
					{suggestions.map(suggestion => {
						const suggestionClassName = suggestion.active
							? 'Autocomplete__suggestion-focus'
							: 'Autocomplete__suggestion';
						return (
							<div className={suggestionClassName} {...getSuggestionItemProps(suggestion)}>
								<span place_id={suggestions.place_id}>{suggestion.description}</span>
							</div>
						);
					})}
				</div>
			</div>
		);
	};

	render() {
		const { types, componentRestrictions, viewport } = this.props;
		const { inputValue } = this.state;
		
		const searchOptions = {
			types,
			componentRestrictions
		}
		
		if (google) {
			searchOptions.bounds = new google.maps.LatLngBounds(
				new google.maps.LatLng(parseFloat(viewport.sw_lat), parseFloat(viewport.sw_lng)),
				new google.maps.LatLng(parseFloat(viewport.ne_lat), parseFloat(viewport.ne_lng))
			);
		}

		return (
			<PlacesAutocomplete
				value={inputValue}
				onChange={this.handleChange}
				onSelect={this.handleSelect}
				searchOptions={searchOptions}
				googleCallbackName='callbackFunc'
			>
				{this.renderInput}
			</PlacesAutocomplete>
		);
	}
}