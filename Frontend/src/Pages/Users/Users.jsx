import React, { useEffect, useState } from "react";
import { useUsers } from "../../Shared/Hooks/UseUsers";
import {
  Button,
  Modal,
  Card,
  CardGroup,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import { updateUser, registUser, deleteUser } from "../../Services/api";
import "bootstrap/dist/css/bootstrap.min.css";

export const Users = () => {
  const { error, getUsersData, isLoading, userInfo } = useUsers();
  const [selectedUser, setselectedUser] = useState(null);
  const roles = ["ADMIN", "USER"];

  //# Modals
  const [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  //# Form for new user
  const [formData, setFormData] = useState({
    correo: "",
    contrasena: "",
    rol: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  useEffect(() => {
    getUsersData();
  }, []);

  const handleUser = (user) => {
    setselectedUser(user);
  };

  const handleRole = (event) => {
    setselectedUser({
      ...selectedUser,
      rol: event.target.value,
    });
  };

  const saveUserChanges = async (user) => {
    try {
      /* const response = await updateUser(user.userId, user);
      handleClose();
      getUsersData(); */

      const userData = {
        ...user,
        password: user.contrasena || undefined,
      };
      await updateUser(user.userId, userData);
      handleClose();
      getUsersData();
    } catch (err) {
      console.error("Error Updating user: ", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addNewUser = async () => {
    try {
      const response = await registUser(formData);
      handleCloseAdd();
      getUsersData();
      console.log(response);
    } catch (err) {
      console.error("Error Registering User: ", err);
    }
  };

  const deleteUserHandler = async (userId) => {
    try {
      const response = await deleteUser(userId);
      handleClose();
      getUsersData();
    } catch (err) {
      console.error("Error Deleting  User:", err);
    }
  };

  const handlePassword = async (event) => {
    setselectedUser({
      ...selectedUser,
      contrasena: event.target.value,
    });
  };

  return (
    <>
      <div style={{ margin: "3vh 3vh 3vh 3vh" }}>
        {isLoading ? (
          <p>Cargando Datos...</p>
        ) : error ? (
          <p>Error al Cargar Datos</p>
        ) : userInfo && userInfo.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
              gap: "2vh",
            }}
          >
            {userInfo.map((info) => (
              <Card
                key={info.userId}
                border="light"
                onClick={() => {
                  handleShow();
                  handleUser(info);
                }}
              >
                <Card.Body>
                  <span style={{ fontWeight: "bold" }}>ID:</span> {info.userId}
                  <br />
                  <span style={{ fontWeight: "bold" }}>Correo: </span>
                  {info.correo}
                  <br />
                  <span style={{ fontWeight: "bold" }}>Rol: </span>
                  {info.rol}
                </Card.Body>
              </Card>
            ))}
            <Button onClick={handleShowAdd} variant="success">
              +
            </Button>
          </div>
        ) : (
          <p>No Hay Datos</p>
        )}

        <div>
          <script>var Alert = ReactBootstrap.Alert;</script>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            style={{ backdropFilter: "blur(5px)" }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Información del Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedUser ? (
                <div>
                  <Row className="g-1">
                    <Form.Label
                      style={{ margin: "0 0 0 0", fontWeight: "bold" }}
                    >
                      ID:
                    </Form.Label>
                    <input
                      type="text"
                      name=""
                      value={selectedUser.userId}
                      disabled
                    />
                    <Form.Label
                      style={{ margin: "2vh 0 0 0", fontWeight: "bold" }}
                    >
                      CORREO:
                    </Form.Label>
                    <input
                      type="email"
                      name=""
                      value={selectedUser.correo}
                      disabled
                    />

                    <Form.Label
                      style={{ margin: "2vh 0 0 0", fontWeight: "bold" }}
                    >
                      CONTRASEÑA:
                    </Form.Label>
                    <input
                      type="password"
                      name=""
                      value={selectedUser.contrasena || ""}
                      onChange={handlePassword}
                    />

                    <Form.Label
                      style={{ margin: "2vh 0 0 0", fontWeight: "bold" }}
                    >
                      ROL:
                    </Form.Label>
                    <select
                      name=""
                      value={selectedUser.rol}
                      onChange={handleRole}
                    >
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                    {/* <span>Rol:</span>
                    <div>
                      <Form.Check label="ADMIN" type="radio" name="rol" />
                      <Form.Check label="USER" type="radio" name="rol" />
                    </div>
                    <br /> */}
                  </Row>
                  <div className="d-grid" style={{ margin: "5vh 0 0 0" }}>
                    <Button onClick={() => saveUserChanges(selectedUser)}>
                      Guardar
                    </Button>
                    <Button
                      onClick={() => {
                        deleteUserHandler(selectedUser.userId);
                      }}
                      variant="danger"
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              ) : (
                <p>No Hay Información del Usuario</p>
              )}
            </Modal.Body>
          </Modal>
        </div>

        <div>
          <script>var Alert = ReactBootstrap.Alert;</script>
          <Modal
            show={showAdd}
            onHide={handleCloseAdd}
            backdrop="static"
            keyboard={false}
            style={{ backdropFilter: "blur(5px)" }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Agregar Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className="g-1">
                <Form.Label style={{ margin: "0 0 0 0", fontWeight: "bold" }}>
                  CORREO:
                </Form.Label>
                <Form.Control
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleInputChange}
                />
                <Form.Label style={{ margin: "2vh 0 0 0", fontWeight: "bold" }}>
                  CONTRASEÑA:
                </Form.Label>
                <Form.Control
                  type="password"
                  name="contrasena"
                  value={formData.contrasena}
                  onChange={handleInputChange}
                />
                <Form.Label style={{ margin: "2vh 0 0 0", fontWeight: "bold" }}>
                  ROL:
                </Form.Label>
                <div>
                  {roles.map((role) => (
                    <Form.Check
                      key={role}
                      label={role}
                      type="radio"
                      name="rol"
                      value={role}
                      checked={formData.rol === role}
                      onChange={handleInputChange}
                    />
                  ))}
                  <br />
                </div>
                <Button onClick={addNewUser}>Guardar</Button>
              </Row>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
};
