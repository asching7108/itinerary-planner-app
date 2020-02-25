import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Autocomplete from '../Autocomplete/Autocomplete';
import { FormattedDate, Button, Input, Textarea, ButtonBox } from '../Utils/Utils';
import './TripForm.css';

export default class TripForm extends Component {
  static defaultProps = {
    onAddTripSuccess: () => {},
    onClickOnCancel: () => {}
  }

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      dest_city: [],
      start_date: '',
      end_date: '',
      description: '',
      destCityCount: 1,
      error: null,
      test: ''
    };
  }

  componentDidMount() {
    const { trip } = this.props;
    
    if (trip) {
      this.setState({
        id: trip.id,
        name: trip.name,
        dest_city: trip.dest_city,
        start_date: FormattedDate(trip.start_date, 'YYYY-MM-DD'),
        end_date: FormattedDate(trip.end_date, 'YYYY-MM-DD'),
        description: trip.description,
        destCityCount: trip.dest_city.length,
        error: null
      });
    }
  }
  
  inputChanged(field, content) {
    this.setState({ [field]: content });
  }

  destCityChanged = (field, content, serialStr) => {
    const newDestCity = this.state.dest_city;
    const serial = serialStr.charAt(serialStr.length - 1) - 1;
    newDestCity[serial] = content;
    this.setState({ 'dest_city': newDestCity });
  }

  destCityCountChanged(change) {
    const { destCityCount, dest_city } = this.state;
    change > 0
      ? dest_city.push('')
      : dest_city.pop();
    this.setState({
      dest_city,
      destCityCount: destCityCount + change
    });
  }

  handleAddSubmit = e => {
    e.preventDefault();
    const { name, dest_city, start_date, end_date, description } = this.state;
    const trip = { name, dest_city, start_date, end_date, description };

    this.setState({ 
      name: '',
      dest_city: [],
      start_date: '',
      end_date: '',
      description: '',
      destCityCount: 1,
      error: null
    });

    this.props.onAddTripSuccess(trip);
  }

  handleUpdateSubmit = e => {
    e.preventDefault();
    const { id, name, dest_city, start_date, end_date, description } = this.state;
    const trip = { id, name, dest_city, start_date, end_date, description };
    
    this.setState({ 
      name: '',
      dest_city: [],
      start_date: '',
      end_date: '',
      description: '',
      destCityCount: 1,
      error: null
    });

    this.props.onUpdateTripSuccess(trip);
  }

  renderDestCity() {
    const { dest_city, destCityCount } = this.state;
    const elements = [];

    if (destCityCount === 1) {
      elements.push(
        <div key={1} className='TripForm__dest-city'>
          <Autocomplete 
            id={`TripForm__dest-city-1`}
            types={['(cities)']} 
            value={dest_city[0]}
            field={'dest_city'}
            onSelect={this.destCityChanged}
          />
          <button 
            type='button' 
            className='TripForm__plus-button '
            onClick={e => this.destCityCountChanged(1)}
          >
            <FontAwesomeIcon icon='plus' className='white' />
          </button>
        </div>
      );
    }

    else {
      for (let i = 0; i < destCityCount - 1; i++) {
        elements.push(
          <div key={i + 1} className='TripForm__dest-city'>
            <Autocomplete 
              id={`TripForm__dest-city-${i + 1}`}
              types={['(cities)']} 
              value={dest_city[i]}
              onSelect={this.destCityChanged}
            />
          </div>
        );
      }

      elements.push(
        <div key={destCityCount} className='TripForm__dest-city'>
          <Autocomplete 
            id={`TripForm__dest-city-${destCityCount}`}
            types={['(cities)']} 
            value={dest_city[destCityCount - 1]}
            onSelect={this.destCityChanged}
          />
          <button 
            type='button' 
            className='TripForm__minus-button'
            onClick={e => this.destCityCountChanged(-1)}
          >
            <FontAwesomeIcon icon='minus' className='white' />
          </button>
        </div>
      );

      elements.push(
        <button key={destCityCount + 1}
          type='button' 
          className='TripForm__plus-button TripForm__plus-button-row'
          onClick={e => this.destCityCountChanged(1)}
        >
          <FontAwesomeIcon icon='plus' className='white' />
        </button>
      );
    }
    
    return elements;
  }

  render() {
    const { location } = this.props;
    const { error } = this.state;
    return (
      <form
        className='TripForm'
        onSubmit={location.pathname === '/add-trip'
          ? this.handleAddSubmit
          : this.handleUpdateSubmit
        }
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div>
          <label htmlFor='TripForm__name'>
            Trip name
          </label>
          <Input
            name='name'
            type='text'
            id='TripForm__name'
            required
            value={this.state.name}
            onChange={e => this.inputChanged('name', e.target.value)}
          />
        </div>
        <div className='TripForm__dest-cities'>
          <label htmlFor='TripForm__dest-city-1'>
            Destination city
          </label>
          {this.renderDestCity()}
        </div>
        <div>
          <label htmlFor='TripForm__start-date'>
            Start date
          </label>
          <Input
            name='start-date'
            type='date'
            id='TripForm__start-date'
            required
            value={this.state.start_date}
            onChange={e => this.inputChanged('start_date', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='TripForm__end-date'>
            End date
          </label>
          <Input
            name='end-date'
            type='date'
            id='TripForm__end-date'
            required
            value={this.state.end_date}
            onChange={e => this.inputChanged('end_date', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='TripForm__description'>
            Description
          </label>
          <Textarea
            name='description'
            type='textarea'
            id='TripForm__description'
            value={this.state.description}
            onChange={e => this.inputChanged('description', e.target.value)}
          />
        </div>
        <ButtonBox>
          <Button type='button' onClick={this.props.onClickOnCancel}>
            Cancel
          </Button>
          <Button type='submit'>
            {
              location.pathname === '/add-trip'
                ? 'Submit'
                : 'Update'
            }
          </Button>
        </ButtonBox>
      </form>
    );
  }
}