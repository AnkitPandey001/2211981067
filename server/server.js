const express = require("express");
const app = express();
const analyticsRoutes = require("./routes/analytics");
const apiRoutes = require('./routes/api')
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173'
  }));

app.use(express.json());
app.use("/api", apiRoutes);
app.use("/analytics", analyticsRoutes);

app.listen(5000,()=>{
    console.log("server started");
})

