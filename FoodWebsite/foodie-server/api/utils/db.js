// const mongoose = require('mongoose');

//  const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.DB_MONGO);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };
// module.exports = connectDB


const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://kapilrajreddy:BPDyaHWSntxluugz@kapil.xwsbaz4.mongodb.net/?retryWrites=true&w=majority&appName=kapil";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function connectDB() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
module.exports = connectDB;
