import app from './app.js';
// import { connectDB } from "./db/connectDb.js";

const port = process.env.PORT || 8000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
