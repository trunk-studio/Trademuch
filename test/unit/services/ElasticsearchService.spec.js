import axios from 'axios';

describe('about Elasticsearch Service .', function() {
  let elastic;
  describe('init', () => {

    // let testUser,place;
    before(async (done) => {
      try {

        let findeIndex = await axios.get(`http://${sails.config.elasticsearch.host}/_aliases`);
        if( findeIndex.data.trademuch ){
          let result = await axios({
            method: 'delete',
            url: `http://${sails.config.elasticsearch.host}/trademuch`
          });
          console.log(result);
        }

        done();
      } catch (e) {
        sails.log.error(e)
        done(e);
      }
    });

    it('test init', async (done) => {
      try {
        await ElasticsearchService.init();
        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });
  });

  describe('test add place', () => {

    // let testUser,place;
    before(async (done) => {
      try {
        let findeIndex = await axios.get(`http://${sails.config.elasticsearch.host}/_aliases`);
        if( findeIndex.data.trademuch ){
          let result = await axios({
            method: 'delete',
            url: `http://${sails.config.elasticsearch.host}/trademuch`
          });
          console.log(result);
        }
        await ElasticsearchService.init();
        done();
      } catch (e) {
        console.log(e);
        done(e);
      }
    });

    it('test add', async (done) => {
      try {
        let result = await ElasticsearchService.addPost({
          id: 123123123,
          title: 'testElasticTitle',
          location:{
            lat: 24,
            lon: 120
          }
        });
        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });
  });

  describe('test search place', () => {

    // let testUser,place;
    before(async (done) => {
      try {
        let findeIndex = await axios.get(`http://${sails.config.elasticsearch.host}/_aliases`);
        if( findeIndex.data.trademuch ){
          let result = await axios({
            method: 'delete',
            url: `http://${sails.config.elasticsearch.host}/trademuch`
          });
          console.log(result);
        }
        await ElasticsearchService.init();
        await ElasticsearchService.addPost({
          id: 1,
          title: 'test Elastic Title 2',
          location:{
            lat: 24,
            lon: 120
          }
        })
        await ElasticsearchService.addPost({
          id: 2,
          title: 'test Elastic Title 2',
          location:{
            lat: 24.1,
            lon: 120.1
          }
        })
        await ElasticsearchService.addPost({
          id: 4,
          title: 'test Elastic Title 4',
          location:{
            lat: 30,
            lon: 80
          }
        })
        await ElasticsearchService.addPost({
          id: 3,
          title: 'test Elastic termTest 1',
          location:{
            lat: 24.08,
            lon: 120.08
          }
        })
        await ElasticsearchService.addPost({
          id: 4,
          title: 'test Elastic termTest 2',
          location:{
            lat: 80,
            lon: 100
          }
        })
        await ElasticsearchService.addPost({
          id: 4,
          title: 'test Elastic termTest 2',
          location:{
            lat: 80.1,
            lon: 100
          }
        })
        await ElasticsearchService.addPost({
          id: 4,
          title: 'AAA',
          location:{
            lat: 80.1,
            lon: 100
          }
        })
        await ElasticsearchService.addPost({
          id: 4,
          title: '測試測試',
          location:{
            lat: 80.1,
            lon: 100
          }
        })
        await ElasticsearchService.addPost({
          id: 4,
          title: '二手iphone',
          location:{
            lat: 80.1,
            lon: 100
          }
        })
        await ElasticsearchService.addPost({
          id: 4,
          title: '二手 Mac',
          location:{
            lat: 80.1,
            lon: 100
          }
        })
        await new Promise(done => setTimeout(done, 3000));
        done();
      } catch (e) {
        console.log(e);
        done(e);
      }
    });

    it('test add search 20km ', async (done) => {
      try {
        let result = await ElasticsearchService.postPlace({
          distance: '20km',
          location: {
            lat: 24,
            lon: 120
          }
        });
        console.log(result);
        result.length.should.be.equal(3);
        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

    it('test add search keyword ', async (done) => {
      try {
        let result = await ElasticsearchService.postPlace({
          keyword: "termTest"
        });
        console.log(result);
        result.length.should.be.equal(3);
        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

    it('test add search keyword & geo', async (done) => {
      try {
        let result = await ElasticsearchService.postPlace({
          distance: '20km',
          keyword: "termTest",
          location: {
            lat: 80,
            lon: 100
          }
        });
        console.log(result);
        result.length.should.be.equal(2);
        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

    it('test add search keyword ', async (done) => {
      try {
        let result = await ElasticsearchService.postPlace({
          keyword: "AA"
        });
        console.log(result);
        result.length.should.be.equal(1);
        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

    it('test add search keyword ', async (done) => {
      try {
        let result = await ElasticsearchService.postPlace({
          keyword: "測試"
        });
        console.log(result);
        result.length.should.be.equal(1);
        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

    it('test add search keyword ', async (done) => {
      try {
        let result = await ElasticsearchService.postPlace({
          keyword: "測"
        });
        console.log(result);
        result.length.should.be.equal(1);
        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

    it('test add search keyword ', async (done) => {
      try {
        let result = await ElasticsearchService.postPlace({
          keyword: "二手"
        });
        console.log(result);
        result.length.should.be.equal(2);
        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

    it('test add search keyword ', async (done) => {
      try {
        let result = await ElasticsearchService.postPlace({
          keyword: "iphone"
        });
        console.log(result);
        result.length.should.be.equal(1);
        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });
  });

});
