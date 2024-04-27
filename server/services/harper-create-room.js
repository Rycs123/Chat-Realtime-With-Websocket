// server/services/mongodb-save-room.js

const { MongoClient } = require("mongodb");

async function harperCreateRoom(roomName, password) {
  const mongoUrl = process.env.MONGODB_URL;
  if (!mongoUrl) throw new Error("MongoDB URL not provided");

  const client = new MongoClient(mongoUrl);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(); // Get the default database

    const roomsCollection = db.collection("rooms");

    // Insert the room document
    const result = await roomsCollection.insertOne({
      roomName,
      password,
      created_at: new Date(),
    });

    console.log("Room created:", result.insertedId);

    return result.insertedId;
  } catch (error) {
    console.error("Error creating room in MongoDB:", error);
    throw error;
  } finally {
    await client.close();
    console.log("Disconnected from MongoDB");
  }
}

module.exports = harperCreateRoom;