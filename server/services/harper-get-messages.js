// server/services/mongodb-get-messages.js

const { MongoClient } = require("mongodb");

async function harperGetMessages(room) {
  const mongoUrl = process.env.MONGODB_URL;
  if (!mongoUrl) throw new Error("MongoDB URL not provided");

  const client = new MongoClient(mongoUrl);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(); // Get the default database

    const messagesCollection = db.collection("messages");

    // Find messages for the specified room
    const messages = await messagesCollection.find({ room }).toArray();

    console.log("Messages fetched:", messages);

    return messages;
  } catch (error) {
    console.error("Error fetching messages from MongoDB:", error);
    throw error;
  } finally {
    await client.close();
    console.log("Disconnected from MongoDB");
  }
}

module.exports = harperGetMessages;
