const express = require("express")
const router = express.Router()
const schemaModel = require("../models/schemaModel.js")
const { isLoggedIn } = require("../middleware.js")
const asyncWrap = require("../utils/asyncWrap.js")
const ExpressError = require("../utils/expressError.js")
const { listingSchemaModel, reviewModel } = require("../schemaValidation.js");
const reviewSchema = require("../models/review.js")


router.get("/", async(req, res) => {

    const data = await schemaModel.find({})
    res.render("./listing/index", { data })

})
router.get("/new", isLoggedIn, async(req, res) => {
    res.render("./listing/add")
})


router.post("/new", isLoggedIn, asyncWrap(async(req, res, next) => {

    let result = await listingSchemaModel.validate(req.body);
    if (result.error) {
        throw new expressError(404, result.error)
    }

    const { title, description, image, price, location, country } = req.body;
    const data = await new schemaModel({ title, description, image, price, location, country }).save()
    req.flash("success", "Listing added successfully!")
    res.redirect("/listing");

}))

router.get("/:id/update", isLoggedIn, asyncWrap(async(req, res) => {
    const { id } = req.params;
    const listing = await schemaModel.findById(id)
    res.render("./listing/update", { listing })
}))


router.put("/:id", isLoggedIn, asyncWrap(async(req, res) => {
    const { id } = req.params;
    const { title, description, price, location, country } = req.body;
    await schemaModel.findByIdAndUpdate(id, { title, description, price, location, country })
    res.redirect(`/listing/${id}`)
}))
router.delete("/:id", isLoggedIn, asyncWrap(async(req, res) => {
    const { id } = req.params;

    await schemaModel.findByIdAndDelete(id)
    res.redirect("/listing");
}))
router.get("/:id", isLoggedIn, asyncWrap(async(req, res) => {
    const { id } = req.params;
    const listing = await schemaModel.findById(id).populate("reviews")
    res.render("./listing/show", { listing })

}))


module.exports = router;