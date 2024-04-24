const {
    MongoMemoryServer
} = require('mongodb-memory-server');
const mongoose = require('mongoose');


module.exports = async function () {

    // Create a new instance of the MongoMemoryServer
    const instance = global.__MONGO_INSTANCE__;

    // If there is no instance, create a new one
    if (!instance) {
        global.__MONGO_INSTANCE__ = await MongoMemoryServer.create();
    }

    // Stop the instance as the very last step
    await instance.stop();
}