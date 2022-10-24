const express = require('express');

const router = express.Router();
const { v4: uuid } = require('uuid');
const mongoose = require('mongoose');

// MongoDB URL from docker-compose
const dbHost = 'mongodb://database/Gateways';

// Connect to mongodb
mongoose.connect(dbHost);

// Create schema for devices
const DeviceSchema = new mongoose.Schema({
  UID: {
    type: Number,
    required: [true, 'The UID field is required'],
    validate: {
      async validator(uid) {
        let uidCount = 0;
        const gateways = await mongoose.model('Gateway').find({});
        gateways.forEach((gateway) => {
          uidCount += gateway.devices.filter((device) => device.UID === uid).length;
        });
        return !uidCount;
      },
      message: (props) => `UID ${props.value} already exists!`,
    },
  },
  vendor: {
    type: String,
    required: [true, 'The vendor field is required'],
  },
  createdAt: {
    type: Date,
    required: [true, 'The createdAt field is required'],
  },
  status: {
    type: Boolean,
    required: [true, 'The status field is required'],
  },
});

// Create schema for gateways
const GatewaySchema = new mongoose.Schema({
  serialNumber: {
    type: String,
    required: [true, 'The serialNumber field is required'],
  },
  name: {
    type: String,
    required: [true, 'The name field is required'],
  },
  ipv4: {
    type: String,
    required: [true, 'The ipv4 field is required'],
    validate: {
      validator(ipAddress) {
        /**
         * I don't use regex for the entire validation
         * validating the proper range of the numbers
         *  is more difficult than doing it with a regular comparison.
         */
        if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ipAddress)) return false;
        const ipNumbers = ipAddress.split('.');
        const outOfRange = ipNumbers
          .find((number) => parseInt(number, 10) < 0 || parseInt(number, 10) > 255);

        return !outOfRange;
      },
      message: (props) => `${props.value} is not a valid ipv4!`,
    },
  },
  devices: {
    type: [DeviceSchema],
    min: 0,
    max: [10, 'The maximum amount of devices connected to a Gateway is 10'],
  },
});

// Create gateways and device models
const Gateway = mongoose.model('Gateway', GatewaySchema);
const Device = mongoose.model('Device', DeviceSchema);

// Enpoints list
router.get('/', (req, res) => res.status(200).render('index'));

// Add a new gateway
router.post('/gateways', (req, res) => {
  const newGateway = new Gateway({
    serialNumber: req.body.serialNumber,
    name: req.body.name,
    ipv4: req.body.ipv4,
    devices: [],
  });

  newGateway.save((err, gateway) => {
    if (err) return res.status(500).send(err);
    return res.status(201).json(gateway);
  });
});

// List all gateways and devices
router.get('/gateways', (req, res) => {
  Gateway.find({}, (err, gateways) => {
    if (err) return res.status(500).send(err);
    return res.status(200).contentType('application/json').json(gateways);
  });
});

// Find a gateway by its id
router.get('/gateways/:id', (req, res) => {
  const gatewayId = req.params.id;
  Gateway.findById(gatewayId, (err, gateway) => {
    if (err) return res.status(500).send(err);
    return res.status(200).contentType('application/json').json(gateway);
  });
});

// Add a device to a gateway
router.put('/gateways/add-device/:id', (req, res) => {
  const device = new Device({
    UID: req.body.UID,
    vendor: req.body.vendor,
    createdAt: req.body.createdAt,
    status: req.body.status,
  });
  Gateway
    .findByIdAndUpdate(
      req.params.id,
      { $push: { devices: device } },
      { new: true, runValidators: true },
      (err, gateway) => {
        if (err) return res.status(500).send(err);
        return res.status(200).contentType('application/json').json(gateway);
      },
    );
});

// Edit a gateway it is not mentioned but just in case.
router.put('/gateways/:id', (req, res) => {
  Gateway.findByIdAndUpdate(
    req.params.id,
    {
      serialNumber: req.body.serialNumber,
      name: req.body.name,
      ipv4: req.body.ipv4,
      devices: req.body.devices,
    },
    { new: true },
    (err, gateway) => {
      if (err) return res.status(500).send(err);
      return res.status(200).contentType('application/json').json(gateway);
    },
  );
});

// Delete a gateway
router.delete('/gateways/:id', (req, res) => {
  const gatewayId = req.params.id;
  Gateway.findByIdAndDelete(gatewayId, (err) => {
    if (err) return res.status(500).send(err);
    return res.status(200).contentType('application/json').json({
      message: 'Gateway data deleted successfully',
    });
  });
});

// TEST ENDPOINTS SECTION
// Add test data
router.get('/add_test_data', (req, res) => {
  // Example data source
  const deviceOne = new Device({
    UID: 1,
    vendor: 'Apple',
    createdAt: new Date(),
    status: true,
  });

  const deviceTwo = new Device({
    UID: 2,
    vendor: 'Samsung',
    createdAt: new Date(),
    status: false,
  });

  const gatewayOne = new Gateway({
    serialNumber: uuid(),
    name: 'Gateway One',
    ipv4: '192.168.0.255',
    devices: [deviceOne, deviceTwo],
  });

  const gatewayTwo = new Gateway({
    serialNumber: uuid(),
    name: 'Gateway Two',
    ipv4: '192.132.0.255',
    devices: [],
  });

  const saveGateways = async () => {
    const errorMsg = {};
    try {
      await gatewayOne.save();
    } catch (error) {
      errorMsg.gatewayOne = error;
    }
    try {
      await gatewayTwo.save();
    } catch (error) {
      errorMsg.gatewayTwo = error;
    }
    return errorMsg.gatewayOne || errorMsg.gatewayTwo ? errorMsg : null;
  };

  saveGateways().then((error) => {
    if (error) {
      return res.status(500).send(error);
    }
    return res.status(201).contentType('application/json').json({
      message: 'Test Gateway data saved successfully',
    });
  });
});

router.get('/clean_all_data', (req, res) => {
  Gateway.deleteMany({}, (error) => {
    if (error) return res.status(500).send(error);
    return res.status(200).contentType('application/json').json({
      message: 'All Gateway data deleted successfully',
    });
  });
});

module.exports = router;
