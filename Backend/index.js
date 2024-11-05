import { initServer } from "./configs/app.js";
import { connection } from "./configs/DB/SQLConnection.js";
import { sendMail } from "./src/Email/GenerateMail.js";
import { createAdmin } from "./src/User/User.controller.js";
import { fecha, getAdmins } from "./Time/Time.js";

fecha()

initServer()
connection()
createAdmin()