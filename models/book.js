'use strict'

const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const bookSchema= Schema({
	name:String,
	author:String,
	subject:String ,
	editorial:String ,
	uBiblioteca:{type: String, enum: ['B.Graduados','B.Principal']},
	picture:String

})
/*params  ''name schema','schema'*/
module.exports =mongoose.model('Book',bookSchema)