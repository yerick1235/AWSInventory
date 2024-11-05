import cron from "node-cron";
import { getServersByDate } from "../src/Server/Server.controller.js";
import { sendMail } from "../src/Email/GenerateMail.js";
import { connection } from "../configs/DB/SQLConnection.js";

let currentTime = new Date();
let currentYear = currentTime.getFullYear();
let endingDate = 2024;

const dbConnection = connection();

//# admin Users
export const getAdmins = async (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      dbConnection.query(
        "select correo, rol from usuarios where rol = 'ADMIN' and userId != 1",
        (error, results) => {
          if (error) {
            console.error(error);
            return reject("Database Error, Try Again");
          }
          const correos = results.map((result) => result.correo);
          resolve(correos);
        }
      );
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Database Error, Try Again" });
    }
  });
};

export const fecha = () => {
  //# Date Format: Min : Hour : Day : Month *
  cron.schedule("0 10 * * *", async () => {
    console.log("Ejecutando cron ob para verificar servidores que expiran hoy");
    console.log("Fecha: ", currentTime);
    try {
      const correos = await getAdmins();
      const serverExpiringToday = await getServersByDate();
      if (serverExpiringToday.length > 0) {
        const mailOptions = {
          /* 
          # Descomentar y Agregar Credenciales Deseadas
          from: "correo", */
          to: correos,
          subject: "Servidores que Expiran Hoy",
          /* text: `Los Siguientes Servidores expiran hoy:\n\n
                        ${serverExpiringToday.map(server => `ID: ${server.servidorId},   Fecha de Cierre: ${server.cierre}`)}` */
          html: `<style>
                        table {
                        font-family: arial, sans-serif;
                        border-collapse: collapse;
                        width: 100%;
                        }
                        td, th {
                        border: 1px solid #dddddd;
                        text-align: left;
                        padding: 8px;
                        }
                        </style>
                    
                        <p>Servidores Que Expiran en 3 Días:</p>
                        <table>
                        <tr>
                        <th>AGENCIA</th>
                        <th>ID AWS</th>
                        <th>CORREO</th>
                        <th>REGIÓN</th>
                        <th>CREDENCIAL</th>
                        <th>TIPO DE SERVICIO</th>
                        <th>NOMBRE DEL SERVICIO</th>
                        <th>TIPO DE INSTANCIA</th>
                        <th>Fecha de Cierre / Año - Mes- Día</th>
                        </tr>

                        ${serverExpiringToday
                          .map(
                            (server) => `
                        <tr>
                        <td>${server.agencia}</td>
                        <td>${server.idLogin}</td>
                        <td>${server.correo}</td>
                        <td>${server.region}</td>
                        <td>${server.credencial}</td>
                        <td>${server.tipoServicio}</td>
                        <td>${server.nombreServicio}</td>
                        <td>${server.tipoInstancia}</td>
                        <td>${server.cierre}</td>
                        </tr>
                        `
                          )
                          .join("")}
                        </table>
                    `,
        };
        await sendMail(mailOptions);
      }
    } catch (error) {
      console.error("Error fetching Servers or Sending Mail: ", error);
    }
  });
};
