const mongoose = require('mongoose');

beforeAll(async () => {
    // put your client connection code here, example with mongoose:
    await mongoose.connect(process.env['MONGO_URI']).then(() => {
      console.log('Connected to the in-memory database', process.env['MONGO_URI']);
    });
  });
  
  afterAll(async () => {
    // put your client disconnection code here, example with mongoose:
    await mongoose.disconnect();
  });