const request = require('request');
const yargs = require('yargs');

const geocode = require('./geocode/geocode');

const argv = yargs.options({
  a: {
    demand: true,
    alias: 'address',
    describe: 'address to fetch weather for',
    string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

  geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
      console.log(errorMessage);
    } else {
      console.log(JSON.stringify(results, undefined, 2));
    }

  });
// var encodedAddress = encodeURIComponent(argv.address);
//
//
// request({
//   url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
//   json: true
// }, (error, response, body) => {
//    if (error) {
//      console.log('Unable to connect to website');
//    } else if (body.status === 'ZERO_RESULTS') {
//      console.log('Unable to find that address');
//    } else if (body.status === 'OK') {
//      console.log(`Address: ${body.results[0].formatted_address}`);
//      console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
//      console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
//    } else {
//      console.log(body);
//    }
//   //console.log(body);
//   //console.log(JSON.stringify(response, undefined, 2));
//
// });
