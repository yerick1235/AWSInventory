import { error } from "console";
import { connection } from "../../configs/DB/SQLConnection.js";
import exceljs from "exceljs";
import path from "path";
import { fileURLToPath } from "url";

const dbConnection = connection();

const workbook = new exceljs.Workbook();
const worksheet = workbook.addWorksheet("Servers");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const test = (req, res) => {
  return res.send({ message: "FUNCTION TEST | Servers" });
};

export const addServer = async (req, res) => {
  const {
    unidad,
    herramienta,
    administrador,
    proveedor,
    correo,
    metodoPago,
    idLogin,
    credencial,
    tipoServicio,
    nombreServicio,
    region,
    tipoInstancia,
    ipPublica,
    vpc,
    securityGroup,
    sistemaOperativo,
    costoMensual,
    costoAnual,
    observaciones,
    otros,
    serverBackup,
    cliente,
    agencia,
    cierre,
  } = req.body;

  //# Validate if a file was uploaded
  const clavePEM = req.file ? req.file.originalname : "No Registrada";
  console.log("PEM: ", clavePEM);

  //# Validate if a Date was selected
  const fechaCierre = cierre ? cierre : "";
  console.log(fechaCierre);

  try {
    dbConnection.query(
      "call sp_agregarServidor(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        unidad,
        herramienta,
        administrador,
        proveedor,
        correo,
        metodoPago,
        idLogin,
        credencial,
        tipoServicio,
        nombreServicio,
        region,
        tipoInstancia,
        ipPublica,
        vpc,
        securityGroup,
        sistemaOperativo,
        clavePEM,
        costoMensual,
        costoAnual,
        observaciones,
        otros,
        serverBackup,
        cliente,
        agencia,
        fechaCierre,
      ],
      (error) => {
        if (error) {
          console.error(error);
          return res.status(500).send({ message: "DB Error, Try Again" });
        }
        return res.send({ message: "Server Registered Successfully" });
      }
    );
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "DB Error, Try Again" });
  }
};

export const listServers = async (req, res) => {
  try {
    dbConnection.query("call sp_listarServidores()", (error, [results]) => {
      if (error) {
        console.error(error);
        return res.status(500).send({ message: "Database Error, Try Again" });
      }
      return res.json(results);
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Database Error, Try Again" });
  }
};

export const listById = async (req, res) => {
  const { servidorId } = req.params;
  try {
    dbConnection.query(
      "call sp_listarPorId(?)",
      [servidorId],
      (error, [results]) => {
        if (error) {
          console.error(error);
          return res.status(500).send({ message: "Database Error, Try Again" });
        }
        res.json(results);
      }
    );
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Database Error, Try Again" });
  }
};

export const getServersByDate = async () => {
  const today = new Date();
  const daysLater = new Date(today);
  daysLater.setDate(today.getDate() + 3); //# 3 days later (this can be changed for 5 days, weeks or more)
  const formatDate = daysLater.toISOString().split("T")[0];
  console.log("TODAY: ", today);

  return new Promise((resolve, reject) => {
    dbConnection.query(
      "call sp_listServerDate(?)",
      [formatDate],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]);
      }
    );
  });
};

export const updateServers = async (req, res) => {
  const {
    unidad,
    herramienta,
    administrador,
    proveedor,
    correo,
    metodoPago,
    idLogin,
    credencial,
    tipoServicio,
    nombreServicio,
    region,
    tipoInstancia,
    ipPublica,
    vpc,
    securityGroup,
    sistemaOperativo,
    costoMensual,
    costoAnual,
    observaciones,
    otros,
    serverBackup,
    cliente,
    agencia,
    cierre,
  } = req.body;

  const { servidorId } = req.params;
  let clavePEM;
  if (req.file) {
    clavePEM = req.file.originalname;
  } else {
    try {
      const [rows] = await dbConnection
        .promise()
        .query("select clavePEM from servidores where servidorId = ?", [
          servidorId,
        ]);
      clavePEM = rows.length > 0 ? rows[0].clavePEM : null;
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: "Database Error, Try Again" });
    }
  }

  try {
    dbConnection.query(
      "call sp_actualizarServidor(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        servidorId,
        unidad,
        herramienta,
        administrador,
        proveedor,
        correo,
        metodoPago,
        idLogin,
        credencial,
        tipoServicio,
        nombreServicio,
        region,
        tipoInstancia,
        ipPublica,
        vpc,
        securityGroup,
        sistemaOperativo,
        clavePEM,
        costoMensual,
        costoAnual,
        observaciones,
        otros,
        serverBackup,
        cliente,
        agencia,
        cierre,
      ],
      (error) => {
        if (error) {
          console.error(error);
          return res.status(500).send({ message: "Database Error, Try Again" });
        }
        return res.send({ message: "Server has been Updated" });
      }
    );
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Database Error, Try Again" });
  }
};

export const deleteServer = async (req, res) => {
  const { servidorId } = req.params;
  try {
    dbConnection.query("call sp_eliminarServidor(?)", [servidorId], (error) => {
      if (error) {
        console.error(error);
        return res.status(500).send({ message: "Database Error, Try Again" });
      }
      return res.send({ message: "Server Deleted Successfully" });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Database Error, Try Again" });
  }
};

export const downloadFile = async (req, res) => {
  const { servidorId } = req.params;

  try {
    dbConnection.query(
      "select clavePEM from servidores where servidorId = ?",
      [servidorId],
      (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).send({ message: "Database Error, Try Again" });
        }
        if (!results || results.length === 0) {
          return res.status(404).send({ message: "PEM file not found" });
        }

        console.log('results: ', results.clavePEM);
        

        const pemFileName = results.clavePEM;

        console.log('pemFile: ', pemFileName);
        

        if (!pemFileName || pemFileName === "No Registrada") {
          return res.status(404).send({ message: "PEM file not found" });
        }
        const filePath = path.join(__dirname, "../PEMKeys", pemFileName);

        //# Send file as Download
        res.download(filePath, pemFileName, (error) => {
          if (error) {
            console.error(error);
            return res
              .status(500)
              .send({ message: "Error downloading PEM file, Try Again" });
          }
        });
      }
    );
  } catch (error) {
    console.error(err);
    return res.status(500).send({ message: "Error processing the request" });
  }
};
