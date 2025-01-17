const { DatabaseAnalyser } = global.DBGATE_PACKAGES['dbgate-tools'];
const fs = require('fs');

class Analyser extends DatabaseAnalyser {
  constructor(dbhan, driver, version) {
    super(dbhan, driver, version);
  }

  async _runAnalysis() {
    const collectionsAndViews = await this.dbhan.getDatabase().listCollections().toArray();
    fs.appendFileSync(
      '/Users/thomas/Downloads/out.txt',
      'collectionsAndViews: ' + JSON.stringify(collectionsAndViews, null, 2)
    );
    const collections = collectionsAndViews.filter((x) => x /*.type == 'collection'*/);
    const views = collectionsAndViews.filter((x) => x.type == 'view');

    let stats;
    try {
      stats = await Promise.all(
        collections
          .filter((x) => x.type == 'collection')
          .map((x) =>
            this.dbhan
              .getDatabase()
              .collection(x.name)
              .aggregate([{ $collStats: { count: {} } }])
              .toArray()
              .then((resp) => ({ name: x.name, count: resp[0].count }))
          )
      );
    } catch (e) {
      // $collStats not supported
      stats = [];
    }

    const res = this.mergeAnalyseResult({
      collections: [
        ...collections.map((x, index) => ({
          pureName: x.name,
          objectType: 'collections',
          tableRowCount: stats[index] ? stats[index].count : 0,
          columns: [{ columnName: '_id', dataType: 'objectId' }],
          primaryKey: [{ columnName: '_id' }],
          foreignKeys: [],
          contentHash: null,
          modifyDate: new Date(),
        })),
        ...views.map((x) => ({
          pureName: x.name,
          objectType: 'views',
          columns: [{ columnName: '_id', dataType: 'objectId' }],
          primaryKey: [{ columnName: '_id' }],
          foreignKeys: [],
          contentHash: null,
          modifyDate: new Date(),
        })),
      ],
    });
    // console.log('MERGED', res);
    fs.appendFileSync('/Users/thomas/Downloads/out.txt', 'MERGED: ');
    return res;
  }
}

module.exports = Analyser;
