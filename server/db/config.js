const pg = require('pg');
pg.defaults.ssl = true;
 
const config = {
  host: 'ec2-54-221-245-174.compute-1.amazonaws.com',
  user: 'dnersqothnuhmk', //env var: PGUSER 
  database: 'd4velak272iqtd', //env var: PGDATABASE 
  password: 'h2OC-WcG1myJIourMnl7ttuyWl', //env var: PGPASSWORD 
  port: 5432, //env var: PGPORT 
  max: 19 // max number of clients in the pool 
  // idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed 
};

module.exports.pool = new pg.Pool(config);

module.exports.pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack)
});