const express = require("express");
const router = express.Router();
const { UserActivity } = require("../models/userActivity"); // Assuming your model file is in a folder called 'models'

router.post('/events', async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, PATCH, DELETE, POST, PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    try {
      const eventData = req.body;
      const event = new UserActivity(eventData);
      await event.save();
      console.log('Event added successfully:', eventData);
      res.status(201).send('Event added successfully');
    } catch (error) {
      console.error('Error adding event:', error);
      res.status(500).send('Error adding event');
    }
});

// GET API endpoint to find all events
router.get('/events', async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, PATCH, DELETE, POST, PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    try {
      const events = await UserActivity.find();
      res.status(200).json(events);
    } catch (error) {
      console.error('Error fetching all events:', error);
      res.status(500).send('Error fetching all events');
    }
  });
  
// GET API endpoint to find events by product
router.get('/events/product/:productId', async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, PATCH, DELETE, POST, PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    const productId = req.params.productId;
    try {
      const events = await UserActivity.find({ product: productId });
      res.status(200).json(events);
    } catch (error) {
      console.error('Error fetching events by product:', error);
      res.status(500).send('Error fetching events by product');
    }
  });
  
  // GET API endpoint to find events by customer_id
router.get('/events/customer/:customerId', async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, PATCH, DELETE, POST, PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    const customerId = req.params.customerId;
    try {
      const events = await UserActivity.find({ customer_id: customerId });
      res.status(200).json(events);
    } catch (error) {
      console.error('Error fetching events by customer_id:', error);
      res.status(500).send('Error fetching events by customer_id');
    }
  });
  

module.exports = router;
