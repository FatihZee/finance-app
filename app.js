require('dotenv').config();
const express = require('express');
const cors = require('cors');
const setupSwagger = require("./config/swagger");
const userRoutes = require('./routes/userRoutes');
const authRoutes = require("./routes/authRoutes");
const transactionCategoryRoutes = require('./routes/transactionCategoryRoutes');

const app = express();

app.use(cors()); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use("/auth", authRoutes);
app.use('/categories', transactionCategoryRoutes);

setupSwagger(app);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
