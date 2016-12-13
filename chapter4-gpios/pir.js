var Gpio = require('onoff').Gpio,
  sensor = new Gpio(17, 'in', 'both');    //#A


var oldValue = 0;
interval = setInterval(function () { //#C
    var value = sensor.readSync(); //#D
    if(oldValue !== value) {
	console.log(value ? 'there is someone!' : 'not anymore!');
	oldValue = value;
    }
}, 500);

function exit(err) {
  if (err) console.log('An error occurred: ' + err);
  sensor.unexport();
  console.log('Bye, bye!')
  process.exit();
}
process.on('SIGINT', exit);

// #A Initialize pin 17 in input mode, 'both' means we want to handle both rising and falling interrupt edges
// #B Listen for state changes on pin 17, if a change is detected the anonymous callback function will be called with the new value
