const request = require('request');

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    var encodedAddress = encodeURIComponent(address);
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
      json: true
    }, (error, response, body) => {
       if (error) {
         //console.log('Unable to connect to website');
         reject('Unable to connect to website');
       } else if (body.status === 'ZERO_RESULTS') {
         //console.log('Unable to find that address');
         reject('Unable to find that address');
       } else if (body.status === 'OK') {
         resolve({
           address: body.results[0].formatted_address,
           latitude: body.results[0].geometry.location.lat,
           longitude: body.results[0].geometry.location.lng
         });
         // console.log(`Address: ${body.results[0].formatted_address}`);
         // console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
         // console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
      //console.log(body);
      //console.log(JSON.stringify(response, undefined, 2));
     }
    });
  })
};

geocodeAddress('000000').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
});
