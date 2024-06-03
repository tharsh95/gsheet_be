import express from "express";
import { PORT } from "./config.js";
import cors from "cors";
import connectToDB from "./db.js";
import bodyParser from "body-parser";
import UserRoute from "./routes/UserRoute.js";
import GoogleRoutes from "./routes/GoogleRoutes.js";
import cookieParser from "cookie-parser";
import { authorization } from "./middleware/auth.js";

const app = express();
// app.use(cors({
//     origin:'http://localhost:5173'
// }));
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());



app.use("/auth", UserRoute);
app.use("/google", authorization,GoogleRoutes)
app.get('/get',authorization,(req,res)=>{
    res.json({message:"HW"})
})

app.listen(PORT, () => {
  connectToDB();
  console.log(`Server running on PORT ${PORT}`);
});
