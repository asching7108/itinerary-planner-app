import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from '../components/App/App';
import Autocomplete from '../components/Autocomplete/Autocomplete';
import Header from '../components/Header/Header';
import LoginForm from '../components/LoginForm/LoginForm';
import PlanForm from '../components/PlanForm/PlanForm';
import PlanItem from '../components/PlanItem/PlanItem';
import ReactModal from '../components/ReactModal/ReactModal';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import TripForm from '../components/TripForm/TripForm';
import TripItem from '../components/TripItem/TripItem';
import { makeTripsArray, makePlansArray } from './test-helpers';

describe(`App Component`, () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(
			<BrowserRouter>
				<App />
			</BrowserRouter>,
			div
		);
		ReactDOM.unmountComponentAtNode(div);
	})
})

describe(`Autocomplete Component`, () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Autocomplete />, div);
		ReactDOM.unmountComponentAtNode(div);
	})

	it('renders the UI as expected', () => {
		const wrapper = shallow(<Autocomplete />);
		expect(toJson(wrapper)).toMatchSnapshot();
	})
})

describe(`Header Component`, () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(
			<BrowserRouter>
				<Header />
			</BrowserRouter>,
			div
		);
		ReactDOM.unmountComponentAtNode(div);
	})

	it('renders the UI as expected', () => {
		const wrapper = shallow(<Header />);
		expect(toJson(wrapper)).toMatchSnapshot();
	})
})

describe(`LoginForm Component`, () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<LoginForm />, div);
		ReactDOM.unmountComponentAtNode(div);
	})

	it('renders the UI as expected', () => {
		const wrapper = shallow(<LoginForm />);
		expect(toJson(wrapper)).toMatchSnapshot();
	})
})

describe(`PlanForm Component`, () => {
	const TYPES = [
		'Flight',
		'Lodging',
		'Car Rental',
		'Restaurant',
		'Activity',
		'Sightseeing',
		'Meeting',
		'Transportation'
	];

	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<PlanForm />, div);
		ReactDOM.unmountComponentAtNode(div);
	})

	it(`renders the UI as expected'`, () => {
		const wrapper = shallow(<PlanForm />);
		expect(toJson(wrapper)).toMatchSnapshot();
	})
	
	TYPES.forEach(type => {
		it(`renders the UI given type equals '${type}'`, () => {
			const wrapper = shallow(<PlanForm />);
			wrapper.setProps({ plans: [{ plan_type: type }] });
			wrapper.setState({
				start_date: '',
				start_time: '',
				end_date: '',
				end_time: ''
			});
			expect(toJson(wrapper)).toMatchSnapshot();
		})
	})
	
	it(`renders given existing trip and plans props'`, () => {
		const testTrip = makeTripsArray()[0];
		const testPlans = makePlansArray().filter(p => p.id === 2);
		const wrapper = shallow(<PlanForm />);
		wrapper.setProps({ trip: testTrip, plans: testPlans });
		expect(toJson(wrapper)).toMatchSnapshot();
	})
})

describe(`PlanItem Component`, () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(
			<BrowserRouter>
				<PlanItem />
			</BrowserRouter>,
			div
		);
		ReactDOM.unmountComponentAtNode(div);
	})

	it(`renders the UI as expected'`, () => {
		const wrapper = shallow(<PlanItem />);
		expect(toJson(wrapper)).toMatchSnapshot();
	})
	
	const testPlans = makePlansArray();
	testPlans.forEach(testPlan => {
		it(`renders given existing plan props'`, () => {
			const wrapper = shallow(<PlanItem />);
			wrapper.setProps({ plan: testPlan });
			expect(toJson(wrapper)).toMatchSnapshot();
		})
	})
})

describe(`ReactModal Component`, () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<ReactModal />, div);
		ReactDOM.unmountComponentAtNode(div);
	})
	
	it('renders the UI as expected', () => {
		const wrapper = shallow(<ReactModal />);
		expect(toJson(wrapper)).toMatchSnapshot();
	})

	it(`renders the UI when 'showModal' props is set to true`, () => {
		const wrapper = shallow(<ReactModal />);
		wrapper.setProps({ showModal: true });
		expect(toJson(wrapper)).toMatchSnapshot();
	})

	it(`renders the UI when 'showModal' props is set to false`, () => {
		const wrapper = shallow(<ReactModal />);
		wrapper.setProps({ showModal: false });
		expect(toJson(wrapper)).toMatchSnapshot();
	})
})

describe(`RegisterForm Component`, () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<RegisterForm />, div);
		ReactDOM.unmountComponentAtNode(div);
	})

	it('renders the UI as expected', () => {
		const wrapper = shallow(<RegisterForm />);
		expect(toJson(wrapper)).toMatchSnapshot();
	})
})

describe(`TripForm Component`, () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<TripForm />, div);
		ReactDOM.unmountComponentAtNode(div);
	})

	it(`renders the UI as expected'`, () => {
		const wrapper = shallow(<TripForm />);
		wrapper.setState({
			start_date: '',
			end_date: ''
		});
		expect(toJson(wrapper)).toMatchSnapshot();
	})

	it(`renders given existing trip props'`, () => {
		const testTrip = makeTripsArray()[0];
		const wrapper = shallow(<TripForm />);
		wrapper.setProps({ trip: testTrip });
		expect(toJson(wrapper)).toMatchSnapshot();
	})
})

describe(`TripItem Component`, () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<TripItem />, div);
		ReactDOM.unmountComponentAtNode(div);
	})

	it(`renders the UI as expected'`, () => {
		const wrapper = shallow(<TripItem />);
		wrapper.setState({
			start_date: '',
			end_date: ''
		});
		expect(toJson(wrapper)).toMatchSnapshot();
	})

	it(`renders link given existing trip props and pathname equals '/'`, () => {
		const testTrip = makeTripsArray()[0];
		const wrapper = shallow(<TripItem />);
		wrapper.setProps({ trip: testTrip, location: { pathname: '/' } });
		expect((wrapper).exists('.TripItem')).toEqual(true);
	})
	
	it(`renders link given existing trip props and pathname not equals '/'`, () => {
		const testTrip = makeTripsArray()[0];
		const wrapper = shallow(<TripItem />);
		wrapper.setProps({ trip: testTrip, location: { pathname: `${testTrip.id}` } });
		expect((wrapper).exists('.TripItem__heading')).toEqual(true);
	})
})