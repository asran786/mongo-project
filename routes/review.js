const express = require("express")
const router = express.Router({ mergeParams: true })
const schemaModel = require("../models/schemaModel.js")
const { isLoggedIn } = require("../middleware.js")
const asyncWrap = require("../utils/asyncWrap.js")


const reviewSchema = require("../models/review.js")

router.post("/", asyncWrap(async(req, res) => {
    console.log(req.params)
    let listing = await schemaModel.findById(req.params.id)
    const { comment, rating } = req.body;
    const reviewData = new reviewSchema({ comment, rating })
    listing.reviews.push(reviewData)
    await reviewData.save();
    await listing.save();
    res.redirect(`/listing/${req.params.id}`)
}))
router.delete("/:reviewId", isLoggedIn, asyncWrap(async(req, res) => {
    const { id, reviewId } = req.params;
    let dta = await schemaModel.findByIdAndUpdate(id, { $pull: { reviews: { _id: reviewId } } })
    dta.save();
    await reviewSchema.findByIdAndDelete(reviewId)
    res.redirect(`/listing/${id}`)

}))


module.exports = router;