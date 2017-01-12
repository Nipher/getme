const axios = require('axios');
const chalk = require('chalk');
const ora = require('ora');
const os = require('os');

const spinner = ora({
  text: 'Loading IPs',
  color: 'yellow',
});

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  const addresses = [];

  Object.keys(interfaces).forEach((netInterface) => {
    interfaces[netInterface].forEach((interfaceObject) => {
      if (interfaceObject.family === 'IPv4' && !interfaceObject.internal) {
        addresses.push(interfaceObject.address);
      }
    });
  });
  return addresses;
}

async function optIP() {
  spinner.start();

  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    const { data, status: statusCode } = response;
    spinner.stop();

    if (statusCode !== 200) {
      return console.log('It was not possible to retrieve your IP this time');
    }

    return console.log(`\nPublic IP ${chalk.blue(data.ip)}\nNetwork IP ${chalk.blue(getLocalIP())}`);
  } catch (err) {
    return console.log('It was not possible to retrieve your IP this time');
  }
}

module.exports = optIP;

