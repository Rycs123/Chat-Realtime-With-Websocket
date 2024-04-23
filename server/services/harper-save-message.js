// server/services/mongodb-save-message.js

const { MongoClient } = require("mongodb");

async function harperSaveMessage(message, username, room) {
  const mongoUrl = process.env.MONGODB_URL;
  if (!mongoUrl) throw new Error("MongoDB URL not provided");

  const client = new MongoClient(mongoUrl);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(); // Get the default database

    const messagesCollection = db.collection("messages");

    // Insert the message document
    const result = await messagesCollection.insertOne({
      message,
      username,
      room,
      timestamp: new Date(),
    });

    console.log("Message inserted:", result.insertedId);

    return result.insertedId;
  } catch (error) {
    console.error("Error saving message to MongoDB:", error);
    throw error;
  } finally {
    await client.close();
    console.log("Disconnected from MongoDB");
  }
}

module.exports = harperSaveMessage;
