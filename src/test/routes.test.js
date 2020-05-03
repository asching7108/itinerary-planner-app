import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import IntroPage from '../routes/IntroPage/IntroPage';
import LoginPage from '../routes/LoginPage/LoginPage';
import PlanPage from '../routes/PlanPage/PlanPage';
import TripListPage from '../routes/TripListPage/TripListPage';
import TripPage from '../routes/TripPage/TripPage';
import AddPlanPage from '../routes/AddPlanPage';
import AddTripPage from '../routes/AddTripPage';
import EditPlanPage from '../routes/EditPlanPage';
import EditTripPage from '../routes/EditTripPage';
import RegisterPage from '../routes/RegisterPage';
import NotFoundPage from '../routes/NotFoundPage';

describe(`IntroPage Component`, () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<IntroPage />, div);
		ReactDOM.unmountComponentAtNode(div);
	})

	it('renders the UI as expected', () => {
		const wrapper = shallow(<IntroPage />);
		expect(toJson(wrapper)).toMatchSnapshot();
	})
})

describe(`LoginPage Component`, () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(
			<BrowserRouter>
				<LoginPage />
			</BrowserRouter>, 
			div
		);
		ReactDOM.unmountComponentAtNode(div);
	})

	it('renders the UI as expected', () => {
		const wrapper = shallow(<LoginPage />);
		expect(toJson(wrapper)).toMatchSnapshot();
	})
})

describe(`PlanPage Component`, () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(
			<BrowserRouter>
				<PlanPage />
			</BrowserRouter>, 
			div
		);
		ReactDOM.unmountComponentAtNode(div);
	})

	/* Snapshot test to be updated. Context not support with enzyme. */
})

describe(`TripListPage Component`, () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(
			<BrowserRouter>
				<TripListPage />
			</BrowserRouter>, 
			div
		);
		ReactDOM.unmountComponentAtNode(div);
	})

	/* Snapshot test to be updated. Context not support with enzyme. */
})

describe(`TripPage Component`, () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(
			<BrowserRouter>
				<TripPage />
			</BrowserRouter>, 
			div
		);
		ReactDOM.unmountComponentAtNode(div);
	})

	/* Snapshot test to be updated. Context not support with enzyme. */
})

describe(`AddPlanPage Component`, () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<AddPlanPage />, div);
		ReactDOM.unmountComponentAtNode(div);
	})

	/* Snapshot test to be updated. Context not support with enzyme. */
})

describe(`AddTripPage Component`, () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<AddTripPage />, div);
		ReactDOM.unmountComponentAtNode(div);
	})

	it('renders the UI as expected', () => {
		const wrapper = shallow(<AddTripPage />);
		expect(toJson(wrapper)).toMatchSnapshot();
	})
})

describe(`EditPlanPage Component`, () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<EditPlanPage />, div);
		ReactDOM.unmountComponentAtNode(div);
	})

	/* Snapshot test to be updated. Context not support with enzyme. */
})

describe(`EditTripPage Component`, () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<EditTripPage />, div);
		ReactDOM.unmountComponentAtNode(div);
	})

	/* Snapshot test to be updated. Context not support with enzyme. */
})

describe(`NotFoundPage Component`, () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<NotFoundPage />, div);
		ReactDOM.unmountComponentAtNode(div);
	})

	it('renders the UI as expected', () => {
		const wrapper = shallow(<NotFoundPage />);
		expect(toJson(wrapper)).toMatchSnapshot();
	})
})

describe(`RegisterPage Component`, () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<RegisterPage />, div);
		ReactDOM.unmountComponentAtNode(div);
	})

	it('renders the UI as expected', () => {
		const wrapper = shallow(<RegisterPage />);
		expect(toJson(wrapper)).toMatchSnapshot();
	})
})