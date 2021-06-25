const { response } = require('express');
const express = require('express');
const app = express();

app.use(express.json());

let contents = [
    { content_id: 1, title: 'content1', language: 'German', duration: 20},
    { content_id: 2, title: 'content2', language: 'English', duration: 60},
    { content_id: 3, title: 'content3', language: 'Spanish', duration: 10},
];

let users = [
    {user: 'abc', password: 'password'},
    {user: 'xyz', password: 'xyz123'},
];

//call back function as a route handler
app.get('/', (req, res)=> {
    res.send('This is metadeta services.');
});

app.get('/content', (req, res)=> {
    return res.send('Please Specify the content_id');
});

app.get('/content/:content_id', async(req, res)=>{
    //Authentication
    const autherization = req.headers['authorization'];
    if(!autherization){
        return res.status(403).send('User autherization required.');
    }
    const [user, password] = validateContent(autherization);
    const userInfo = users.find(c => c.user === user);
    if(!userInfo){
        return res.status(403).send('Invalid user...!');
    }
    if(userInfo.password !== password){
        return res.status(403).send('Invalid password...!');
    }

    //Validation
    if(parseInt(req.params.content_id) === 1111){
        res.status(400).send('Invalid request');
        return;
    }

    if(parseInt(req.params.content_id) === 2222){
        res.status(500).send('Internal server error');
        return;
    }

    const content = contents.find(c => c.content_id === parseInt(req.params.content_id));
    if(!content || parseInt(content.content_id) === "0000") {
        res.status(404).send('The content with given id was not found');
        return;
    }
    
    res.send(content);
});

app.post('/content', async (req, res) =>{
    //Authentication
    const autherization = req.headers['authorization'];
    if(!autherization){
        return res.status(403).send('User autherization required.');
    }
    const [user, password] = validateContent(autherization);
    const userInfo = users.find(c => c.user === user);
    if(!userInfo){
        return res.status(403).send('Invalid user...!');
    }
    if(userInfo.password !== password){
        return res.status(403).send('Invalid password...!');
    }

    if(!req.body.content_id){
        //bad response
        res.status(400).send('Bad Request.\ncontent_id required.');
        return;
    }
    if(!req.body.title){
        //bad response
        res.status(400).send('Bad Request.\ntitle required.');
        return;
    }
    if(!req.body.language){
        //bad response
        res.status(400).send('Bad Request.\nlanguage required.');
        return;
    }
    //add validation for already avalilable content_id
    const content = {
        content_id: req.body.content_id,
        title: req.body.title,
        language: req.body.language,
        duration: req.body.duration,
    }
    contents.push(content);
    res.send(content);
});

function validateContent(autherization){
   //considering basic Auth with 'base64'
   const encode = autherization.substring(6);
   const decode = Buffer.from(encode, 'base64').toString('ascii');
   return decode.split(':')
}

module.exports = app.listen(3000)




