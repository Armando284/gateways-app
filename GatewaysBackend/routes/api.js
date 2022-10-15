const express = require('express')
const router = express.Router()
const { v4: uuid } = require('uuid')
const mongoose = require('mongoose')

// MongoDB URL from docker-compose
const dbHost = 'mongodb://database/Gateways'

// Connect to mongodb
mongoose.connect(dbHost)

// Create schema for devices
const DeviceSchema = new mongoose.Schema({
	UID: mongoose.ObjectId, // TODO: This data has to be a number!
	vendor: String,
	createdAt: Date,
	status: Boolean
})

// Create schema for gateways
const GatewaySchema = new mongoose.Schema({
	serialNumber: String, // TODO: Here I'll use uuid package to generate a unique identifier separately from mongodb document ids. This data can be added by the user, perhaps I can add an enpoint to suggest an unique id to the user.
	name: String,
	ipv4: String,
	devices: [DeviceSchema] // TODO: Set the maximum number of devices to 10
})

// Create gateways and device models
const Gateway = mongoose.model('Gateway', GatewaySchema)
const Device = mongoose.model('Device', DeviceSchema)

// Enpoints list
router.get('/', (req, res) => {
	res.status(200)
	res.render("index")
})

// List all gateways and devices
router.get('/gateways', (req, res) => {
	Gateway.find({}, (error, gateways) => {
		if (error) res.status(500).send(error)
		res.status(200).contentType('application/json').json(gateways)
	})
})

// Find a gateway by its id
router.get('/gateways/:id', (req, res) => {
	const gatewayId = req.params.id
	Gateway.findById(gatewayId, (error, gateway) => {
		if (error) res.status(500).send(error)
		res.status(200).contentType('application/json').json(gateway)
	})
})

// Add a new gateway
router.post('/gateways', (req, res) => {
	const newGateway = new Gateway(
		...req.params.gateway
	)

	// TODO: Validate new gateway here
	if (false /** Validation error */) res.status(500).send(error)
	newGateway.save((error, gateway) => {
		if (error) res.status(500).send(error)
		res.status(201).contentType('application/json').json(gateway)
	})
})

// Delete a gateway 
router.delete('/gateways/:id', (req, res) => {
	const gatewayId = req.params.id
	Gateway.findByIdAndDelete(gatewayId, error => {
		if (error) res.status(500).send(error)
		res.status(200).json({
			message: 'Gateway data deleted successfully'
		})
	})
})

// Edit is not mentioned as a requirement! But I'll add it just to complete the CRUD 
router.patch('/gateways/:id', (req, res) => {

})

// Devices endpoints
// Add device to gateway 
router.post('/gateways/:id/add_device', (req, res) => {
	const newDevice = new Device(...req.params.device)
	const gateway = Gateway.findById(req.params.id)

})

// Delete a device from gateway

// Update a device in gateway

// TEST ENDPOINTS SECTION
// Add test data
router.get('/add_test_data', (req, res) => {
	// Example data source
	const device_one = new Device({
		vendor: 'Apple',
		createdAt: new Date(),
		status: true
	})

	const device_two = new Device({
		vendor: 'Samsung',
		createdAt: new Date(),
		status: false
	})

	const gateway_one = new Gateway({
		serialNumber: uuid(),
		name: 'Gateway One',
		ipv4: '192.168.0.255',
		devices: [device_one, device_two]
	})

	const gateway_two = new Gateway({
		serialNumber: uuid(),
		name: 'Gateway Two',
		ipv4: '192.132.0.255',
		devices: []
	})

	let errorMsg;

	gateway_one.save(error => {
		if (error) errorMsg.gateway_one_error = error
	})

	gateway_two.save(error => {
		if (error) errorMsg.gateway_two_error = error
	})

	if (errorMsg) res.status(500).send(errorMsg);

	res.status(201).json({
		message: 'Test Gateway data saved successfully'
	})
})

router.get('/clean_all_data', (req, res) => {
	Gateway.deleteMany({}, error => {
		if (error) res.status(500).send(error)
		res.status(200).json({
			message: 'All Gateway data deleted successfully'
		})
	})
})

module.exports = router;