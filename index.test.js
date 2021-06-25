const app = require('./index')
const supertest = require("supertest")
const request = supertest(app);

  
  it('/content/:content_id GET valid conten_id', async done => {
    const response = await request.get('/content/1')
    .set('Authorization', 'Basic eHl6Onh5ejEyMw==')
    console.log(response.body)
    expect(response.body).toStrictEqual({ content_id: 1, title: 'content1', language: 'German', duration: 20})
    done()
  }, 6000)

  it('/content GET test for non availbale content_id', async done => {
    //5 is not available in current database
    const response = await request.get('/content/5')
    .set('Authorization', 'Basic eHl6Onh5ejEyMw==')
    expect(response.status).toBe(404)
    done()
  }, 6000)

  it('/content GET content_id:1111', async done => {
    //5 is not available in current database
    const response = await request.get('/content/1111')
    .set('Authorization', 'Basic eHl6Onh5ejEyMw==')
    expect(response.status).toBe(400)
    done()
  },6000);

  it('/content GET content_id:2222', async done => {
    //5 is not available in current database
    const response = await request.get('/content/2222')
    .set('Authorization', 'Basic eHl6Onh5ejEyMw==')
    expect(response.status).toBe(500)
    done()
  },6000)

  it('/content/:content_id GET  Authentication', async done => {
    const response = await request.get('/content/1')
    expect(response.body).toStrictEqual({ content_id: 1, title: 'content1', language: 'German', duration: 20})
    done()
  },6000)

  it('POST test Authentication and updating new data', async done => {
    //for user:XYZ post should pass
    const response = await request.post('/content')
    .set('Authorization', 'Basic eHl6Onh5ejEyMw==') 
    .send({ content_id: 4, title: 'content4', language: 'Hindi', duration: 70});
    expect(response.status).toBe(200)
    done()
  }, 6000);

  it('POST test Authentication should fail for random user', async done => {
    const response = await request.post('/content')
    .set('Authorization', 'Basic 123456') //random user code
    .send({ content_id: 4, title: 'content4', language: 'Hindi', duration: 70});
    expect(response.status).toBe(403)
    done()
  },6000)

  it('POST test for mandatory fields', async done => {
    const response = await request.post('/content');
    expect(response.status).toBe(400)
    done()
  },6000)

  it('POST test response', async done => {
    const response = await request.post('/content')
    .set('Authorization', 'Basic eHl6Onh5ejEyMw==') 
    .set({content_id:4});
    expect(response.status).toBe(400)
    done()
  },6000)




