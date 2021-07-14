
const mongoose=require('mongoose');
const abcSchema=new mongoose.Schema(
{
name:{
type:String,
required:true
}
}
)
const Abc=mongoose.model('Abc',abcSchema);
module.exports=Abc;


