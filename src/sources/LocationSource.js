// Where should async go? There is no right answer. You can put it in actions or in stores.
// You can use something like fetch to fetch some data from a server. For the purposes of this tutorial we will be using setTimeout and Promise to mimic a request made using fetch API.

var LocationActions = require('../actions/LocationActions');

var mockData = [
	{ id: 0, name: 'Abu Dhabi' },
	{ id: 1, name: 'Berlin' },
	{ id: 2, name: 'Bogota' },
	{ id: 3, name: 'Buenos Aires' },
	{ id: 4, name: 'Cairo' },
	{ id: 5, name: 'Chicago' },
	{ id: 6, name: 'Lima' },
	{ id: 7, name: 'London' },
	{ id: 8, name: 'Miami' },
	{ id: 9, name: 'Moscow' },
	{ id: 10, name: 'Mumbai' },
	{ id: 11, name: 'Paris' },
	{ id: 12, name: 'San Francisco' }
];

var LocationSource = {
	fetch: function() {
		// returning a Promise because that is what fetch does.
		return new Promise(function(resolve, reject) {
			// simulate an asynchronous action where data is fetched on
			// a remote server somewhere.
			setTimeout(function() {
				// resolve with some mock data
				resolve(mockData);
			}, 250);
		});
	}

	// fetch() {
	// 	return {
	// 		remote() {
	// 			return new Promise(function(resolve, reject) {
	// 				// simulate an asynchronous flow where data is fetched on
	// 				// a remote server somewhere.
	// 				setTimeout(function() {

	// 					// change this to `false` to see the error action being handled.
	// 					if (true) {
	// 						// resolve with some mock data
	// 						resolve(mockData);
	// 					} else {
	// 						reject('Things have broken');
	// 					}
	// 				}, 250);
	// 			});
	// 		},

	// 		local() {
	// 			// Never check locally, always fetch remotely.
	// 			return null;
	// 		},

	// 		success: LocationActions.updateLocations,
	// 		error: LocationActions.locationsFailed,
	// 		loading: LocationActions.fetchLocations
	// 	}
	// }
};

module.exports = LocationSource;