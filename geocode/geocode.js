const request = require('request');
const yargs = require('yargs');

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
     if (error) {
       //console.log('Unable to connect to website');
       callback('Unable to connect to website');
     } else if (body.status === 'ZERO_RESULTS') {
       //console.log('Unable to find that address');
       callback('Unable to find that address');
     } else if (body.status === 'OK') {
       callback(undefined, {
         address: body.results[0].formatted_address,
         latitude: body.results[0].geometry.location.lat,
         longitude: body.results[0].geometry.location.lng

       });
       // console.log(`Address: ${body.results[0].formatted_address}`);
       // console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
       // console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
     } else {
       console.log(body);
     }
    //console.log(body);
    //console.log(JSON.stringify(response, undefined, 2));

  });
};

module.exports.geocodeAddress = geocodeAddress;
