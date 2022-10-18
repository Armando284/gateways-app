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
router.get('/', (req, res) => {
  res.status(200).render('index');
});

// List all gateways and devices
router.get('/gateways', (req, res) => {
  Gateway.find({}, (error, gateways) => {
    if (error) res.status(500).send(error);
    res.status(200).contentType('application/json').json(gateways);
  });
});

// Find a gateway by its id
router.get('/gateways/:id', (req, res) => {
  const gatewayId = req.params.id;
  Gateway.findById(gatewayId, (error, gateway) => {
    if (error) res.status(500).send(error);
    res.status(200).contentType('application/json').json(gateway);
  });
});

// Add a new gateway
router.post('/gateways', (req, res) => {
  const gateway = new Gateway({
    serialNumber: req.body.serialNumber,
    name: req.body.name,
    ipv4: req.body.ipv4,
    devices: [],
  });

  gateway.save((error) => {
    if (error) res.status(500).send(error);
    res.status(201).json(gateway);
  });
});

// Delete a gateway
router.delete('/gateways/:id', (req, res) => {
  const gatewayId = req.params.id;
  Gateway.findByIdAndDelete(gatewayId, (error) => {
    if (error) res.status(500).send(error);
    res.status(200).json({
      message: 'Gateway data deleted successfully',
    });
  });
});

// Edit a gateway
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
    (gateway, error) => {
      console.log(gateway);
      if (error) res.status(500).send(error);
      res.status(200).json({
        message: 'Gateway data deleted successfully',
      });
    },
  );
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
      res.status(500).send(error);
      return;
    }
    res.status(201).json({
      message: 'Test Gateway data saved successfully',
    });
  });
});

router.get('/clean_all_data', (req, res) => {
  Gateway.deleteMany({}, (error) => {
    if (error) res.status(500).send(error);
    res.status(200).json({
      message: 'All Gateway data deleted successfully',
    });
  });
});

module.exports = router;
