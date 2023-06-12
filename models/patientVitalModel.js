const mongoose = require ('mongoose')
const {Schema} = require('mongoose')

const vitalSchema  = new Schema({

},{
    timestamps:true
})

const VitalModel = mongoose.model("vitals",vitalSchema)
 module.exports = VitalModel