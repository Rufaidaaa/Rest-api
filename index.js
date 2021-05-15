const express=require('express')
const app= express()
const Joi= require('joi')
app.use(express.json())

// app.get()
// app.post()
// app.put()
// app.delete()

const courses= [{
    id:1, name: "blah"
},
{
    id:2, name: "hey"
}]
app.get('/', (req,res) =>{
    res.send('hello')
})
app.get('/app', (req,res) =>{
    res.send('hello world!!')
})

app.get('/api/courses/:id/:month', (req,res) =>{  // route parameter= for essential and required values
    res.send(req.params)
})

app.get('/api/courses' ,(req, res) =>{
    res.send(courses)
})

app.post('/api/courses', (req,res) =>{
 
    const {error} = ValidateCourse(req.body)
    if(error) return res.status(400).send(error)
        // res.status(400).send(error.details[0].message)
        
    const course ={
        id: courses.length +1,
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
})
// handling GET requests
app.get('/api/courses/:id', (req,res) =>{ // query parameters= provide additional data for backend services / optional
    // res.send(req.query)
    const course= courses.find(c => c.id === parseInt(req.params.id))
    if(!course)
    return res.status(404).send('nof foind')
    res.send(course)
})

app.put('/api/courses/:id', (req,res) =>{
    // if not exist return error
    const course= courses.find(c => c.id === parseInt(req.params.id))
    if(!course)
    return res.status(404).send('nof foind')

    //validate
   const {error} = ValidateCourse(req.body)
    if(error)
        return res.status(400).send(error)
        // res.status(400).send(error.details[0].message)
     

    //update course
    course.name =req.body.name
    res.send(course)
})

app.delete('/api/courses/:id', (req,res) =>{
    // doesnt exist 404
    const course= courses.find(c => c.id === parseInt(req.params.id))
    if(!course)
    return res.status(404).send('nof foind')

    // delete

    const index= courses.indexOf(course)
    courses.splice(index, 1)

    res.send(course)
})
function ValidateCourse(course){
    const schema= Joi.object({
        name: Joi.string()
        .min(3)
        .max(30)
        .required()
    })
    return schema.validate(course);
}

const port= process.env.PORT || 3000
app.listen(port, () =>{
    console.log(`listning on ${port}`)
})