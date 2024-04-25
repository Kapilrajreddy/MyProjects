// const express = require("express");
// const app = express();
// const cors = require("cors");
// const { ObjectId } = require("mongodb");

// //middleware
// app.use(cors());
// app.use(express.json());

// const port = process.env.PORT || 6001;
// require("dotenv").config();

// //kapilrajreddy
// //cRjXAJBcpW4Zfm9h

// //mongo db connection

// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@demo-foodie-cluster.ow5mrxb.mongodb.net/?retryWrites=true&w=majority&appName=demo-foodie-cluster`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();

//     // database & collections
//     const menuCollections = client.db("demo-foodie-client").collection("menus");
//     const cartCollections = client
//       .db("demo-foodie-client")
//       .collection("cartItems");

//     // all menu item operations
//     app.get("/menu", async (req, res) => {
//       const result = await menuCollections.find().toArray();
//       res.send(result);
//     });

//     //all carts operations

//     // posting cart to db
//     app.post("/carts", async (req, res) => {
//       const cartItem = req.body;
//       const result = await cartCollections.insertOne(cartItem);
//       res.send(result);
//     });

//     // get carts using email
//     app.get("/carts", async (req, res) => {
//       const email = req.query.email;
//       const filter = { email: email };
//       const result = await cartCollections.find(filter).toArray();
//       res.send(result);
//     });

//     //get specific carts
//     app.get("/carts/:id", async (req, res) => {
//       const id = req.params.id;
//       console.log(id);
//       const filter = { _id: new ObjectId(id) };
//       console.log(filter);
//       const result = await cartCollections.findOne(filter);
//       console.log(result, "kapil");
//       res.send(result);
//     });

//     // delete items from cart
//     app.delete("/carts/:id", async (req, res) => {
//       const id = req.params.id;
//       const filter = { _id: new ObjectId(id) };
//       const result = await cartCollections.deleteOne(filter);

//       res.send(result);
//     });

//     // update carts quantity
//     app.put("/carts/:id", async (req, res) => {
//       const id = req.params.id;
//       const { quantity } = req.body;
//       const filter = { _id: new ObjectId(id) };
//       const options = { upsert: true };

//       const updateDoc = {
//         $set: {
//           quantity: parseInt(quantity, 10),
//         },
//       };
//       const result = await cartCollections.updateOne(
//         filter,
//         updateDoc,
//         options
//       );
//     });

//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

//quSDcnio9jVl3K12
//kapilrajreddy

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 6001;
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// middleware
app.use(cors());
app.use(express.json());

// mongodb configuration using mongoose

mongoose
  .connect(
    `mongodb+srv://kapilrajreddy:BPDyaHWSntxluugz@kapil.xwsbaz4.mongodb.net/foodweb?retryWrites=true&w=majority&appName=kapil`
  )
  .then(console.log("MongoDB Connected Successfully!"))
  .catch((error) => console.log("Error connecting to MongoDB", error));

// jwt authentication
app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1hr",
  });
  res.send({ token });
});

//   import routes here
const menuRoutes = require("./api/routes/menuRoutes");
const cartRoutes = require("./api/routes/cartRoutes");
const userRoutes = require("./api/routes/userRoutes");
app.use("/menu", menuRoutes);
app.use("/carts", cartRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello Foodi Client Server!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});