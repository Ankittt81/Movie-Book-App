const mongoose=require('mongoose')

const bookingSchema=new mongoose.Schema({
    show:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'shows'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    seats:{
        types:Array,
        required:true
    },
    transactionId:{
        type:String,
        required:true
    }
},{timestamps:true}
)

module.exports=mongoose.model('bookings',bookingSchema)