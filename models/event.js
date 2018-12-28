var mongoose    = require("mongoose"); 

var eventSchema = new mongoose.Schema({
    name: String,
    image: String,
    date: String,
    description: String,
    author :{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

var Event = mongoose.model("Event", eventSchema);

module.exports = Event;