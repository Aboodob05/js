
const express = require('express');

const router = express.Router();

const joi = require('joi');

const { lectures, instructors } = require('./data');


router.use(express.json());


// router.get('/',(req,res)=>{
//     res.send('Welcome to my page');
// })


router.get('/',(req,res)=>{
    res.json(lectures);
})


router.get('/:id',(req,res)=>{
    const lecture = lectures.find((lec) => lec.id === parseInt(req.params.id));
    if (lecture) {
        res.json(lecture); 
    } else {
        res.status(404).send('Lecture not found'); 
    }
});


router.post('/',(req,res)=>{

    const scm = joi.object({
    name: joi.string().min(5).required(),
    major: joi.string().min(5).required()
    })


const {error} = scm.validate(req.body);
if(error){
    res.status(400).json(error.details[0].message)
}
    

   const lecture = {
    id : lectures.length +1,
    name : req.body.name,
    major : req.body.major
   }
   lectures.push(lecture);
   res.status(200).json(lecture);

})


router.put("/:id",(req,res)=>{
      const scm = joi.object({
    name: joi.string().min(5),
    major: joi.string().min(5)
    })

const {error} = scm.validate(req.body);
  if(error){
    res.status(400).json(error.details[0].message)
 }

const lecture = lectures.find((lec) => lec.id === parseInt(req.params.id));
 if(lecture){
    res.status(200).json(lecture)
 }
 else{
    res.status(404).json("not found")
 }
  })


  router.delete("/:id",(req,res)=>{
    const lecture = lectures.find((lec) => lec.id === parseInt(req.params.id));
    if(lecture){
      res.status(200).json("deleted")
    }
    else{
      res.status(404).json("not found")
   }
 
  })


  router.get('/instName/:id',(req,res)=>{

    const lecture = lectures.find((lec) => lec.id === parseInt(req.params.id));
     if(lecture){
        const inst = instructors.find((inst) => inst.id === lecture.instructorID);
        if (inst) {
           res.json(inst.name); 
        } 
        else {
           res.status(404).send('Instructor not found'); 
        }
    }

    else{
      res.status(404).json("not found")
    }
  })

    


module.exports = router;