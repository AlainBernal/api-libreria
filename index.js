/*always use the "use strict" at the beginning*/
'use strict'
/*Library imports*/
const express = require('express')
const bodyParser= require('body-parser')
const mongoose= require('mongoose')

/*app que ejecuta express*/
const app = express()
const port = process.env.PORT || 3001

/*adding midlewares to application*/
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

/*Import of the Book model from mongoose*/
const Book = require('./models/book')


/*verbs*/
//to use parameters /:name--then you can call them with${req.prams.nameffff}
app.get('/hola/:book_name',(req,res)=>{ 
	res.send({message:`Hola ${req.params.book_name}`})
})

//VERBS

app.get('/api-biblioteca/getLibros',(req,res)=>{
Book.find({},(err,books)=>{
	if(err) return res.status(500).send({message: `Error handling your request:${err}`})
	if(!books) return res.status(404).send({message: `We couldn't find the books you're looking for`})
	res.send(200,{books})
})


})


app.get('/api-biblioteca/getLibroById/:bookId',(req,res)=>{
	let bookId=req.params.bookId

	Book.findById(bookId,(err,book)=>{
		if(err) return res.status(500).send({message: `Error handling your request:${err}`})
		if(!book) return res.status(404).send({message: `We couldn't find the book you're looking for: ${bookId}`})
		res.status(200).send({book})
	})
})

app.get('/api-biblioteca/getLibroByName/:bookName',(req,res)=>{
	let bookName=req.params.bookName

	Book.findById(bookName,(err,book)=>{
		if(err) return res.status(500).send({message: `Error handling your request:${err}`})
		if(!book) return res.status(404).send({message: `We couldn't find the book you're looking for : ${bookName}`})
		res.status(200).send({name:book})
	})
})

app.post('/api-biblioteca/libro',(req,res)=>{
console.log('POST  /api-biblioteca/libro')
console.log(req.body)

let book = new Book()
book.isbn = req.body.isbn
book.name = req.body.name
book.author = req.body.author
book.subject = req.body.subject
book.editorial = req.body.editorial
book.uBiblioteca = req.body.uBiblioteca
book.picture = req.body.picture

book.save((err,bookStored)=>{
	if(err) res.status(500).send({message:'Fail try to insert in the database: ${err}'})
		
		res.status(200).send({ book: bookStored})
	})

})

app.put('/api-biblioteca/libro/:libroId',(req,res)=>{

})

app.delete('/api-biblioteca/libro/:libroId',(req,res)=>{

})

/*We need to add mongoose to the packege.json so we can use mongoose.connect*/
/*the put on connect the dirrection of the port of the database "libreria" in this case*/
mongoose.connect('mongodb://localhost:27017/libreria',(err,res)=>{
	if(err) {

		return console.log(`ERROR TRYING TO  CONNECT TO MONGODB: ${err}`)}

	console.log('CONNECTION TO MONGODB SUCCESSFUL')

app.listen(port,()=>{
	console.log(`Api rest corriendo:${port}`)
})
})





