const mongoose = require("mongoose");
const Review = require("./review")

const schema = mongoose.Schema;



const userSchema = new schema({
    title: { type: String, required: true },
    description: { type: String },
    image: {
        type: String,
        set: (v) => {
            return v === "" ? "https://images.pexels.com/photos/18959484/pexels-photo-18959484/free-photo-of-dai-hung-chung-watchtower-in-vietnam.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" : v;
        }
    },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    country: { type: String, required: true },
    reviews: [{
        type: schema.Types.ObjectId,
        ref: "Review"
    }]

});
userSchema.post("findOneAndDelete", async(listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } })
        console.log("its deleted")
    }

})
module.exports = mongoose.model("User", userSchema);