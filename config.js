//config.js
'use strict';

console.log('trying the new config.js');

const nconf = module.exports = require('nconf');
const path = require('path');

nconf.argv().env([
					'NODE_ENV',
					'DATA_BACKEND',
					'GCLOUD_PROJECT',
					'server_host',
					'server_port',
					'database_host',
					'database_port',
					'database_user',
					'database_pwd',
					'database_auth_db'])
			.file({ file:path.join('config', 'config.json')})
			.defaults({
				NODE_ENV: 'development',
				DATA_BACKEND: 'mongo',
				GCLOUD_PROJECT: 'DEFAULT',
				server_host: 'localhost',
				server_port: '8080',
				database_host: 'DEFAULT',
				database_port: 'DEFAULT',
				database_user: 'DEFAULT',
				database_pwd: 'DEFAULT',
				database_auth_db: 'DEFAULT'
			});

checkConfig('GCLOUD_PROJECT');

if (nconf.get('DATA_BACKEND') === 'mongo') {
	checkConfig('database_user');
	checkConfig('database_pwd');
	if (nconf.get('NODE_ENV') === 'production') {
		checkConfig('database_host');
		checkConfig('database_port');

		//nconf.set('database.connection' = )
	}
}

function checkConfig(setting){
	if (!nconf.get(setting)) {
		throw new Error('You must set ${setting} as an environment variable -OR- in config.json')
	}
}

