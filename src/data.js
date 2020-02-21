export const test_trips = [
  {
    id: 1,
    name: 'summer trip',
    dest_city: [
      'barcelona',
      'florence',
      'rome'
    ],
    start_date: '2019-04-01T00:00:00.000Z',
		end_date: '2019-04-14T00:00:00.000Z',
		description: ''
	},
  {
    id: 2,
    name: 'family trip 2020',
    dest_city: [
      'Tokyo'
    ],
    start_date: '2019-04-30T00:00:00.000Z',
		end_date: '2019-05-06T00:00:00.000Z',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?'
  }
]

export const test_trip_plans = [
  {
    id: 5,
    name: 'BR772',
    type: 'Flight',
    sub_type: 'Arrival',
    start_date: '2019-04-01T01:40:00.000+07:00',
    end_date: '2019-04-01T11:00:00.000Z',
    description: '',
    trip_id: 1,
    from: 'Taipei',
    to: 'Barcelona'
	},
  {
    id: 1,
    name: 'H10 Metropolitan Hotel',
    type: 'Lodging',
    sub_type: 'Check in',
    start_date: '2019-04-01T13:00:00.000Z',
    end_date: '2019-04-06T00:00:00.000Z',
    description: '',
    trip_id: 1
	},
  {
    id: 4,
    name: 'La Sagrada Familia',
    type: 'Activity',
    sub_type: 'Sightseeing',
    start_date: '2019-04-05T14:00:00.000Z',
    end_date: '2019-04-05T18:00:00.000Z',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    trip_id: 1
  },
  {
    id: 3,
    name: 'Good Food',
    type: 'Restaurant',
    sub_type: null,
    start_date: '2019-04-05T20:00:00.000Z',
    end_date: null,
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    trip_id: 1
  },
  {
    id: 2,
    name: 'H10 Metropolitan Hotel',
    type: 'Lodging',
    sub_type: 'Check out',
    start_date: '2019-04-06T09:00:00.000Z',
    end_date: null,
    description: '',
    trip_id: 1
	}
]
