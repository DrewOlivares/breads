const express = require('express')
const bread_router = express.Router()
const Bread = require('../models/bread.js')

// INDEX
bread_router.get('/', (req, res) => {
  Bread.find().then(foundBreads =>{
      res.render('index', {
        breads: foundBreads
      })
    })
    // res.render('index', {
    //   breads: Bread
    // })
  // res.send(Bread)
})

// NEW
bread_router.get('/new', (req, res) => {
  res.render('new')
})

// SHOW
bread_router.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
      .then(foundBread => {
          res.render('show', {
              bread: foundBread
          })
      }).catch(err => {
        res.status(404).render('error404')
      })
})


// DELETE
bread_router.delete('/:id', (req, res) => {
  Bread.findByIdAndDelete(req.params.id) 
    .then(deletedBread => { 
      res.status(303).redirect('/breads')
    })
})


// UPDATE
bread_router.put('/:id', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(updatedBread => {
  res.redirect(`/breads/${req.params.id}`)
  })
})

// EDIT
bread_router.get('/:id/edit', (req, res) => {
  Bread.findById(req.params.id)
  .then(foundBread => {
    res.render('edit', {
    bread: foundBread,
    })
  })
})


// CREATE
bread_router.post('/', (req, res) => {
  if (!req.body.image) {
    req.body.image = undefined
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = 'true'
  } else {
    req.body.hasGluten = 'false'
  }
  Bread.create(req.body)
  res.redirect('/breads')
})

module.exports = bread_router
