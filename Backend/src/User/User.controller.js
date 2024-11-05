import { connection } from "../../configs/DB/SQLConnection.js";
import { generateJWT } from "../Utils/jwt.js";
import { checkPassword, encrypt } from "../Utils/validator.js";

const dbConnection = connection();

export const test = (req, res) => {
  return res.send({ message: "FUNCTION TEST | USER" });
};

export const registUser = async (req, res) => {
  try {
    const { correo, contrasena, rol } = req.body;
    const encryptedPassword = await encrypt(contrasena);
    dbConnection.query(
      "call sp_regist(?,?,?)",
      [correo, encryptedPassword, rol],
      (error) => {
        if (error) {
          console.error(error);
          return res.status(500).send({ message: "DB Error, Try Again" });
        }

        return res.send({ message: "User Registered Successffully" });
      }
    );
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "DB Error, Try Again" });
  }
};

export const createAdmin = async () => {
  try {
    dbConnection.query(
      "select * from Usuarios U where userId = ? and rol = ? and correo = ?",
      [1, "ADMIN", "awsinventory@odd.digital"],
      async (err, rows) => {
        if (err) return console.error(err);
        if (rows.length > 0) {
          console.log("AWS ADMIN Already Exist");
          return;
        }
        /* 
        # Descomentar y Poner Credenciales Deseadas
          let data = {
          email: "superusuario@gmail.com",
          password: "12345",
          role: "ADMIN",
        }; */
        data.password = await encrypt(data.password);
        dbConnection.query("call sp_regist(?,?,?)", [
          data.email,
          data.password,
          data.role,
        ]);
        return console.log("AWS ADMIN Created");
      }
    );
  } catch (err) {
    return console.error(err);
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    dbConnection.query(
      "select * from Usuarios U where correo = ?",
      [email],
      async (err, rows) => {
        if (err) return console.error(err);

        const user = rows[0];

        console.log(user);

        if (user && (await checkPassword(password, user.contrasena))) {
          const loggedUser = {
            uid: user.userId,
            email: user.correo,
            role: user.rol,
          };
          const token = await generateJWT(loggedUser);
          return res.send({
            message: `Welcome ${user.correo}`,
            loggedUser,
            token,
          });
        } else {
          return res.status(500).send({ message: "Invalid Credentials" });
        }
      }
    );
  } catch (err) {
    console.error(err);
    return res.send({ message: "Login Failed, Please Try Again" });
  }
};

export const listUsers = async (req, res) => {
  try {
    dbConnection.query("call sp_listUsers()", (error, [results]) => {
      if (error) {
        console.error(error);
        return res.status(500).send({ message: "Database Error, Try Again" });
      }
      res.json(results);
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Database Error, Try Again" });
  }
};

export const updateUser = async (req, res) => {
  const { rol, password } = req.body;
  const { userId } = req.params;

  if (userId == 1) {
    return res
      .status(500)
      .send({ message: "You cannot update the admin user" });
  }

  let encryptedPassword;

  try {
    if (password) {
      encryptedPassword = await encrypt(password);
      console.log("Encriptado: ", encryptedPassword);

      dbConnection.query(
        "call sp_updateUser(?,?,?)",
        [userId, rol, encryptedPassword],
        (error) => {
          if (error) {
            console.error(error);
            return res
              .status(500)
              .send({ message: "Database Error, Try Again" });
          }
          return res.send({ message: "User has been Updated" });
        }
      );
    } else {
      dbConnection.query(
        "select contrasena from usuarios where userId = ?",
        [userId],
        (error, results) => {
          if (error) {
            return res
              .status(500)
              .send({ message: "Database Error, Try Again" });
          }
          if (results.length === 0) {
            return res.status(404).send({ message: "User not found" });
          }
          console.log("Results: ", results);

          encryptedPassword = results[0].contrasena;

          dbConnection.query(
            "call sp_updateUser(?,?,?)",
            [userId, rol, encryptedPassword],
            (error) => {
              if (error) {
                console.error(error);
                return res
                  .status(500)
                  .send({ message: "Database Error, Try Again" });
              }
              return res.send({ message: "User has been Updated" });
            }
          );
        }
      );
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Database Error, Try Again" });
  }
};

export const listById = async (req, res) => {
  const { userId } = req.params;
  try {
    dbConnection.query("call sp_listById(?)", [userId], (error, [results]) => {
      if (error) {
        console.error(error);
        return res.status(500).send({ message: "Database Error, Try Again" });
      }
      res.json(results);
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Database Error, Try Again" });
  }
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  if (userId == 1) {
    return res
      .status(406)
      .send({ message: " You cannot delete the admin user" });
  }
  try {
    dbConnection.query("call sp_deleteUser(?)", [userId], (error) => {
      if (error) {
        console.error(error);
        return res.status(500).send({ message: "Database Error, Try Again" });
      }
      return res.send({ message: "User has been deleted" });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Database Error, Try Again" });
  }
};
