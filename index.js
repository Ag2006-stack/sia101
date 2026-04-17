const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

let products = [
    { id: 1, name: "Ryzen 5 5600", category: "CPU", price: 7500, stock: 15, specs: "6C/12T, 3.5GHz" },
    { id: 2, name: "GTX 1660 Super", category: "GPU", price: 12000, stock: 8, specs: "6GB GDDR6" },
    { id: 3, name: "RTX 3060", category: "GPU", price: 18500, stock: 5, specs: "12GB GDDR6" },
    { id: 4, name: "B450 Aorus Elite", category: "Motherboard", price: 6500, stock: 10, specs: "AM4, ATX" },
    { id: 5, name: "T-Force Delta 16GB", category: "RAM", price: 3200, stock: 20, specs: "3600MHz CL18" },
    { id: 6, name: "Samsung 980 Pro 1TB", category: "Storage", price: 5500, stock: 12, specs: "NVMe Gen4" },
    { id: 7, name: "Corsair CV650", category: "PSU", price: 3500, stock: 7, specs: "650W 80+ Bronze" },
    { id: 8, name: "Ryzen 7 5700G", category: "CPU", price: 11000, stock: 4, specs: "8C/16T, Radeon Graphics" },
    { id: 9, name: "Cooler Master H212", category: "Cooler", price: 1800, stock: 15, specs: "Air Cooler, RGB" },
    { id: 10, name: "NZXT H510", category: "Case", price: 4500, stock: 6, specs: "Mid Tower, White" }
]

app.get('/api/products', (req, res) => {
    res.status(200).json(products)
})

app.get('/api/products/:id', (req, res) => {
    const item = products.find(p => p.id === parseInt(req.params.id))
    if (!item) {
        return res.status(404).json({ message: "Product not found" })
    }
    res.status(200).json(item)
})

app.post('/api/products', (req, res) => {
    const { name, category, price, stock } = req.body
    if (!name || !price) {
        return res.status(400).json({ message: "Bad Request" })
    }
    const newProduct = { id: Date.now(), name, category, price: Number(price), stock: Number(stock) }
    products.push(newProduct)
    res.status(201).json(newProduct)
})

app.put('/api/products/:id', (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id))
    if (index === -1) {
        return res.status(404).json({ message: "Not found" })
    }
    products[index] = { ...products[index], ...req.body }
    res.status(200).json(products[index])
})

app.delete('/api/products/:id', (req, res) => {
    products = products.filter(p => p.id !== parseInt(req.params.id))
    res.status(200).json({ message: "Deleted" })
})

app.get('/api/search', (req, res) => {
    const term = req.query.name?.toLowerCase() || ""
    const filtered = products.filter(p => p.name.toLowerCase().includes(term))
    res.status(200).json(filtered)
})

app.get('/api/category/:cat', (req, res) => {
    const filtered = products.filter(p => p.category.toLowerCase() === req.params.cat.toLowerCase())
    res.status(200).json(filtered)
})

app.get('/api/stats', (req, res) => {
    res.status(200).json({
        totalModels: products.length,
        totalStock: products.reduce((acc, p) => acc + p.stock, 0),
        lowStock: products.filter(p => p.stock < 5).length
    })
})

app.get('/api/random', (req, res) => {
    res.status(200).json(products[Math.floor(Math.random() * products.length)])
})

app.get('/api/top-deals', (req, res) => {
    res.status(200).json([...products].sort((a, b) => b.price - a.price).slice(0, 3))
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})