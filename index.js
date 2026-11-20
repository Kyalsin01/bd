const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


const database = require('./DataAccess/dbconfig')
const User = require('./DataAccess/models/user-model')
const Role = require('./DataAccess/models/role-model')
const app = express()
const port = 3000

const options = {
    origin:['http://localhost:5173','http://localhost:5174'],
    methods: [
        'GET','POST','PUT','DELETE'
    ],
}

app.use(cors(options))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

database.authenticate().then((res) => {
    console.log('database successfully connected')
}).catch((err) => {
    console.log(err)
})
database.sync({ force: false }).then((res) => {

}).catch((err) => {
    console.log(err)
})


// ?name=user&&role_id=1
//get and then substitude to the other
app.get('/', async (req, res) => {
    const name=req.query.name
    let filter={}
    if(name){
        filter.name=name
    }
    const list = await User.findAll({where:filter})
    res.json(list)
})



// route <define data>
app.post('/',async(req,res)=>{
    let returnValue
    const user={
        id:req.body.id ==   0 ? null : req.body.id,
        name:req.body.name,
        username:req.body.username,
        password:req.body.password
    }

    if(user.id>0){

        returnValue = await User.update(user ,{where:{id:user.id}})
    }else{
         returnValue = await User.create(user)
        
    }
    console.log(returnValue)
        // console.log(req.body,req.params,req.headers,req.query)
        res.json({success:true})
})


//1.get data=>get/ parameter getbyid?id -- getbyid?id=1&&name=zinmin - req.query.id


//2.param / getbyid/1 <= param
// (2)app.get('/getbyid/:id',(req,res)=>{

// })

app.get('/getbyid',async(req,res)=>{
    const id = req.query.id
    const result = await User.findByPk(id,{id:id})//find data in db
    res.json(result)

    console.log(result)

}) 

//delete
app.delete('/delete',async(req,res)=>{
    const id=req.query.id
    const result = await User.destroy({where:{id: id}})
    res.json(result)

    console.log(result)
})



//role


//get data from role_tb
app.get('/role', async (req, res) => {
    const list = await Role.findAll()
    res.json(list)

    console.log(list)
})

// route <define data> /to display frontend
app.post('/role',async(req,res)=>{
    console.log("Fronted Data",req.body);
        // console.log(req.body,req.params,req.headers,req.query)
    res.json({
        success:true,
        data:req.body

    })
})



app.listen(port, () => {
    console.log(`app is listen on http://localhost:${port}`)
})