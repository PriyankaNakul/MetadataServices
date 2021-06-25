const app = require('./index')
const supertest = require("supertest")
const request = supertest(app);


/* it("gets the test endpoint", async done => {
    const response = await request.get("/content");
  
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("pass!");
    done();
  },100000);
 */

  /* it('gets the test endpoint', async done => {
    const response = await request.get('/content')
  
    expect(response.status).toBe(200)
    //expect(response.body.message).toBe('pass!')
    done()
  }); */
  it('/content gets test for non availbale content_id', async done => {
    const response = await request.get('/content/5');
  
    expect(response.status).toBe(404)
    //expect(response.body.message).toBe('pass!')
    done()
  });
  it('/content gets test response', async done => {
    const response = await request.get('/content/1');
  
    expect(response.body.message).toBe({ content_id: 1, title: 'content1', language: 'German', duration: 20})
    //expect(response.body.message).toBe('pass!')
    done()
  });

  it('POST test for mandatory fields', async done => {
    const response = await request.post('/content');
  
    expect(response.status).toBe(400)
    //expect(response.body.message).toBe('pass!')
    done()
  });
  it('POST test response', async done => {
    const response = await request.post('/content')
    .set({content_id:4});
  
    expect(response.status).toBe(400)
    //expect(response.body.message).toBe('pass!')
    done()
  });

  it('POST test Autherization', async done => {
    const response = await request.post('/content')
    .set('Authorization', 'Basic 1234567890') 
    .send({ content_id: 4, title: 'content4', language: 'Hindi', duration: 70});
  
    expect(response.status).toBe(403)
    //expect(response.body.message).toBe('pass!')
    done()
  });
  //QUJDOnBhc3N3b3Jk
  it('POST test Autherization should pass', async done => {
    const response = await request.post('/content')
    .set('Authorization', 'Basic QUJDOnBhc3N3b3Jk') 
    .send({ content_id: 4, title: 'content4', language: 'Hindi', duration: 70});
  
    expect(response.status).toBe(403)
    //expect(response.body.message).toBe('pass!')
    done()
  });




