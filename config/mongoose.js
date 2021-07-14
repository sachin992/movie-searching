
 const mongoose=require('mongoose');
 mongoose.connect('mongodb://localhost/sam');
 const db=mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log("succdesfully connecteed to data base");
});