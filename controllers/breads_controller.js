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
bread_router.delete('/:indexArray', (req, res) => {
  Bread.splice(req.params.indexArray, 1)
  res.status(303).redirect('/breads')
})

// UPDATE
bread_router.put('/:arrayIndex', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread[req.params.arrayIndex] = req.body
  res.redirect(`/breads/${req.params.arrayIndex}`)
})

// EDIT
bread_router.get('/:indexArray/edit', (req, res) => {
  res.render('edit', {
    bread: Bread[req.params.indexArray],
    index: req.params.indexArray,
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
