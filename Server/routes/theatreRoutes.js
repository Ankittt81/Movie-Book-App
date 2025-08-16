const router=require('express').Router()
const Theatre=require('../models/theatreModel')

router.post('/add-theatre',async (req,res)=>{
    try {
        const newTheatre=new Theatre(req.body)
        await newTheatre.save()
        res.send({
            success:true,
            message:'New theatre has been added!'
        })
    } catch (err) {
        res.send({
            success:false,
            message:err.message
        })
    }
})


//Admin-Get All theatres -Admin should get all the theatres from different owners
router.get('./get-all-theatres',async (req,res)=>{
    try {
        const allTheatres=await Theatre.find().populate('owner')
        res.send({
            success:true,
            message:'All thatres fetched!',
            data:allTheatres
        })
    } catch (err) {
        res.send({
            success:false,
            message:err.message
        })
    }
})
//Get the theatres of a specific owner
router.get('/get-all-theatres-by-owner', async (req,res)=>{
    try {
        const allTheatres=await Theatre.find({owner:req.body.owner})
        res.send({
            success:true,
            message:'All theatres fetched successfully!',
            data:allTheatres
        })
    } catch (err) {
        res.send({
            success:false,
            message:err.message
        })
    }
})


router.put("/update-theatre", async (req, res) => {
  try {
    await Theatre.findByIdAndUpdate(req.body.TheatreId,req.body)
    res.send({
      success: true,
      message: "New theatre has been updated!",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});


router.delete("/delete-theatre", async (req, res) => {
  try {
    await Theatre.findByIdAndDelete(req.body.TheatreId)
    res.send({
      success: true,
      message: "New theatre has been deleted!",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

module.exports=router