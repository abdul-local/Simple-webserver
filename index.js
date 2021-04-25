
const express=require('express')
require('dotenv').config()
const app=express();
const Joi =require('joi')

app.use(express.json());

 const courses=[
     {id:1, name:'courses 1'},
     {id:2, name:'courses 2'},
     {id:3, name:'courses 3'},
     {id:4, name:'courses 4'}

 ];

// Create index page
app.get('/',(req,res)=>{
    res.send('Resfult Api with Node Js');
})

// endpoint list courses
app.get('/api/courses',(req,res)=>{
    res.send(courses)
})

// endpoint single courses Http get Request
app.get('/api/courses/:id',async(req,res)=>{

    try {
        let data= await courses.find(c=>c.id===parseInt(req.params.id));
        if (!data) {
            res.status(404).send('courses yang di maksud tidak di temukan');
        }
        res.send(data)
        
    } catch (error) {
        
        console.log(error);
    }

})

// endpoint single courses Http Post Request

app.post('/api/courses',(req,res)=>{

      // validasi inputan

    //   if (!req.body.name || req.body.name.length< 3){

    //     res.status(400).send('name is required and must be more 3 character')
    //   }

     const schema=Joi.object({
         name:Joi.string().alphanum().min(3).required()
     });
     // bentuknya promise
     schema.validateAsync({name:req.body.name}).then(data=>{

        console.log(data);

        const course={
            id:courses.length+1,
            name:data.name
        };

       courses.push(course);

        res.send(course);




     }).catch(err=>{
         console.log(err);
         res.json({
             data:err.details[0].message
         })
     })
 
        
 
   




})

// new Route dengan paramter
// app.get('/api/data/:id',(req,res)=>{

//     res.send(req.params.id)
// })

// new Route dengan multiple paramter
// app.get('/api/data/:month/:year',(req,res)=>{
//     res.send(req.params);
// })

// new Route dengan Query
// app.get('/api/data/month/year',(req,res)=>{
//     res.send(req.query);
// })



const PORT=process.env.PORT || 3000;
// listen
app.listen(PORT, ()=>console.log(` server running to ${PORT} `));