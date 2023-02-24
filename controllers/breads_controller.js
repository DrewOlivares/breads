const express = require('express')
const Baker = require('../models/baker.js')
const bread_router = express.Router()
const Bread = require('../models/bread.js')
const baker = require('./bakers_controller.js')

// INDEX
bread_router.get('/', (req, res) => {
  Baker.find()
    .then(foundBakers => {
      Bread.find()
        .then(foundBreads =>{
          res.render('index', {
            breads: foundBreads,
            bakers: foundBakers
          })
        })
    })
})

// NEW
bread_router.get('/new', (req, res) => {
  Baker.find()
  .then(foundBakers => {
    res.render('new', {
      bakers: foundBakers
    })
  })
})

// SHOW
bread_router.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
    .populate('baker')
      .then(foundBread => {
        const bakedBy = foundBread.getBakedBy();
        res.render('show', {
            bread: foundBread
        })
      })
      .catch(err => {
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
  Baker.find()
    .then(foundBakers => {
      Bread.findById(req.params.id)
        .then(foundBread => {
          res.render('edit', {
          bread: foundBread,
          bakers: foundBakers
        })
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

//seed
bread_router.get('/data/seed', (req, res) => {
      Bread.insertMany([
    {
      name: 'Rye',
      hasGluten: true,
      image: 'https://images.unsplash.com/photo-1595535873420-a599195b3f4a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    },
    {
      name: 'French',
      hasGluten: true,
      image: 'https://images.unsplash.com/photo-1534620808146-d33bb39128b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    },
    {
      name: 'Gluten Free',
      hasGluten: false,
      image: 'https://images.unsplash.com/photo-1546538490-0fe0a8eba4e6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
    },
    {
      name: 'Pumpernickel',
      hasGluten: true,
      image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
    }
      ])
        .then(createdBreads => {
          res.redirect('/breads')
        })
    })

module.exports = bread_router
