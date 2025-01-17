const _ = require('lodash');
const stream = require('stream');
const { MongoClient, ObjectId, AbstractCursor } = require('mongodb');
const driverBase = require('../frontend/driver');
const Analyser = require('./Analyser');

/** @type {import('dbgate-types').EngineDriver} */
const driver = {
  ...driverBase,
  analyserClass: Analyser,
  // creating connection
  async connect({ server, port, user, password, database, useDatabaseUrl, databaseUrl, ssl, useSshTunnel }) {
    let mongoUrl;

    if (useDatabaseUrl) {
      if (useSshTunnel) {
        // change port to ssh tunnel port
        const url = new URL(databaseUrl);
        url.port = port;
        mongoUrl = url.href;
      } else {
        mongoUrl = databaseUrl;
      }
    } else {
      mongoUrl = user
        ? `mongodb://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${server}:${port}`
        : `mongodb://${server}:${port}`;
    }

    const options = {
      // useUnifiedTopology: true, // this options has no longer effect
    };
    if (ssl) {
      options.tls = true;
      options.tlsCAFile = ssl.sslCaFile;
      options.tlsCertificateKeyFile = ssl.sslCertFile || ssl.sslKeyFile;
      options.tlsCertificateKeyFilePassword = ssl.password;
      // options.tlsAllowInvalidCertificates = !ssl.rejectUnauthorized;
      options.tlsInsecure = !ssl.rejectUnauthorized;
    }

    const client = new MongoClient(mongoUrl, options);
    await client.connect();
    return {
      client,
      database,
      getDatabase: database ? () => client.db(database) : () => client.db(),
    };
  },
  // called for retrieve data (eg. browse in data grid) and for update database
  async query(connection, sql) {
    return {
      rows: [],
      columns: [],
    };
  },
  // called in query console
  async stream(connection, sql, options) {
    return null;
  },
  // called when exporting table or view
  async readQuery(connection, sql, structure) {
    const pass = new stream.PassThrough({
      objectMode: true,
      highWaterMark: 100,
    });

    // pass.write(structure)
    // pass.write(row1)
    // pass.write(row2)
    // pass.end()

    return pass;
  },
  // called when importing into table or view
  async writeTable(connection, name, options) {
    return createBulkInsertStreamBase(this, stream, pool, name, options);
  },
  // detect server version
  async getVersion(connection) {
    return { version: '1.0.0' };
  },
  // list databases on server
  async listDatabases(connection) {
    return [{ name: 'db1' }, { name: 'db2' }];
  },
};

module.exports = driver;
