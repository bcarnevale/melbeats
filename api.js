const express = require('express');
const Joi = require('joi')
const app = express();

const places = [
        {
            id: 1,
            name: "Hawker Hall",
            suburb: "Windsor",
            style: "Modern Asian Tapas",
            price: "$"
        },
        {
            id: 2,
            name: "Hanoi Hannah",
            suburb: "Richmond",
            style: "Vietnamese",
            price: "$$"
        },
        {
            id: 3,
            name: "Shop Ramen",
            suburb: "Collingwood",
            style: "Ramen",
            price: "$"
        }
]

app.use(express.json());

app.get('/', (req, res) => {
    return res.send(places)
})

app.get('/places', (req, res) => {
    return res.send(places)
})

app.get('/places/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const place = places.find(p => p.id === id)
    if(!place) {
        return res.status(404).send("Oopsie Daisy! Pick another place.")
    }
    return res.send([place])
})

app.post('/places', (req, res) => {
    const id = req.body.id
    const name = req.body.name
    const suburb = req.body.suburb
    const style = req.body.style
    const price = req.body.price

    const place = {id, name, suburb, style, price}
    places.push(place)

    return res.send(place)
})

app.put('/places/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const place = places.find(p => p.id === id)
    if(!place) {
        return res.status(404).send("Oopsie Daisy! Pick another place.")
    }
    
    const schema = {
        name: Joi.string().required(),
        suburb: Joi.string().required(),
        style: Joi.string().required(),
        price: Joi.string().required()
    }

    const valid = Joi.validate(req.body, schema)
    const error = valid.error
    if(error) {
        return res.status(400).send(error.details[0].message)
    }

    const name = req.body.name
    const suburb = req.body.suburb
    const style = req.body.style
    const price = req.body.price

    place.name = name
    place.suburb = suburb
    place.style = style
    place.price = price

    return res.send(place)

})

app.delete('/places/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const place = places.find(p => p.id === id)
    if(!place) {
        return res.status(404).send("Oopsie Daisy! Pick another place.")
    }

    const index = places.indexOf(place)
    places.splice(index, 1)

    return res.send(place)
})

app.listen(5000, () => {
    console.log('listening on port 5000')
})