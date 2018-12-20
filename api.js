const express = require('express');
const Joi = require('joi');
const cors = require('cors');
const places = require('./places')
const mongoose = require('mongoose');
const Places = require('./models/places')
const app = express();

// const places = [
//         {
//             id: 1,
//             name: "Hawker Hall",
//             suburb: "Windsor",
//             style: "Modern Asian Tapas",
//             price: "$"
//         },
//         {
//             id: 2,
//             name: "Hanoi Hannah",
//             suburb: "Richmond",
//             style: "Vietnamese",
//             price: "$$"
//         },
//         {
//             id: 3,
//             name: "Shop Ramen",
//             suburb: "Collingwood",
//             style: "Ramen",
//             price: "$"
//         }
// ]

mongoose.connect('mongodb://localhost:27017/places');

mongoose.connection.on('connected', () => {
    console.log('connected to mongod')
});

mongoose.connection.on('error', () => {
    console.log('connected to mongod')
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    Places.find({})
        .then(docs => {
        return res.send(docs)
    })
})

app.get('/places', (req, res) => {
    Places.find({})
        .then(doc => {
        return res.send(doc)
    })
})

app.get('/places/:id', (req, res) => {
    // const id = parseInt(req.params.id)
    // const place = places.find(p => p.id === id)
    // if(!place) {
    //     return res.status(404).send("Oopsie Daisy! Pick another place.")
    // }
    // return res.send([place])

    const id = req.params._id;
    Places.findOne({ id })
        .then(doc => res.send(doc));
})

app.post('/places', (req, res) => {
    // const id = req.body.id
    // const name = req.body.name
    // const suburb = req.body.suburb
    // const style = req.body.style
    // const price = req.body.price

    // const place = {id, name, suburb, style, price}
    // places.push(place)

    // return res.send(place)

    const { name, suburb, style, price } = req.body;
    const places = new Places({
            name,
            suburb,
            style,
            price
        });
        places.save()
            .then(doc => res.send(doc))

})

app.put('/places/:id', (req, res) => {
    // const id = parseInt(req.params.id)
    // const place = places.find(p => p.id === id)
    // if(!place) {
    //     return res.status(404).send("Oopsie Daisy! Pick another place.")
    // }
    
    // const schema = {
    //     name: Joi.string().required(),
    //     suburb: Joi.string().required(),
    //     style: Joi.string().required(),
    //     price: Joi.string().required()
    // }

    // const valid = Joi.validate(req.body, schema)
    // const error = valid.error
    // if(error) {
    //     return res.status(400).send(error.details[0].message)
    // }

    // const name = req.body.name
    // const suburb = req.body.suburb
    // const style = req.body.style
    // const price = req.body.price

    // place.name = name
    // place.suburb = suburb
    // place.style = style
    // place.price = price

    // return res.send(place)

    const id = req.params._id
    const { name, suburb, style, price } = req.body

    Places.findOneAndUpdate(
        // how we are finding the selection
        { id },
        // what we want to update
        { name, suburb, style, price },
        {
            new: true,
            runValidators: true
        }
    )
    .then(doc => res.send(doc));

})

app.delete('/places/:id', (req, res) => {
    // const id = parseInt(req.params.id)
    // const place = places.find(p => p.id === id)
    // if(!place) {
    //     return res.status(404).send("Oopsie Daisy! Pick another place.")
    // }

    // const index = places.indexOf(place)
    // places.splice(index, 1)

    // return res.send(place)

    const id = req.params._id

    Places.findOneAndRemove({ id })
    .then(doc => res.send(doc));
})


app.listen(5000, () => {
    console.log('listening on port 5000')
})