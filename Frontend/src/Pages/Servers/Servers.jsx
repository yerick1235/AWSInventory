import React, { useEffect, useState } from "react";
import { useServers } from "../../Shared/Hooks/UseServers";
import "./Servers.css";
import { useNavigate } from "react-router-dom";
import { deleteServer, downloadPEM } from "../../Services/api";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import {
  Table,
  Button,
  Form,
  InputGroup,
  Accordion,
  DropdownButton,
  Dropdown,
  Modal,
} from "react-bootstrap";
import "bootstrap/js/src/collapse.js";
import imagenVector from "../../Assets/Trituradora.svg";
import axios from "axios";

export const Servers = () => {
  const { error, getServersData, isLoading, serversInfo } = useServers();
  const [userRole, setUserRole] = useState(null);
  const [search, setSearch] = useState("");
  const [expandedRows, setExpandedRows] = useState([]);
  const [activeKey, setActiveKey] = useState(null);

  //# ----- Modal Eliminar Registro -----
  const [showDelete, setShowDelete] = useState(false);
  const [serverIdDelete, setServerIdDelete] = useState(null);
  const [confirmationText, setConfirmationText] = useState("");
  const handleClose = () => {
    setShowDelete(false);
    setConfirmationText("");
    setActiveKey(null);
  };
  const handleShow = (servidorId) => {
    if (userRole === "ADMIN") {
      setServerIdDelete(servidorId);
      setShowDelete(true);
    } else {
      return toast.error("Usuario Inválido", { duration: 1300 });
    }
  };

  //# ----- Cambio de Divisas -----
  const [exchangeRate, setExchangeRate] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://api.exchangerate-api.com/v4/latest/USD"
      );
      setExchangeRate(response.data.rates.GTQ);
    };
    fetchData();
  }, []);

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const navigate = useNavigate();
  const navigateToEdit = (servidorId) => {
    if (userRole === "ADMIN") {
      navigate(`/edit/${servidorId}`);
    } else {
      return toast.error("Usuario Inválido", { duration: 1300 });
    }
  };

  const navigateToLogin = () => {
    navigate("/");
  };
  
  const navigateToRegist = () => {
    if (userRole === "ADMIN") {
      navigate("/regist");
    } else {
      return toast.error("Usuario Inválido", { duration: 1300 });
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value.toUpperCase());
  };

  //# Filtrar servers segun busqueda
  const filteredServers = serversInfo
    ? serversInfo.filter((info) =>
        Object.values(info).some((value) =>
          String(value).toUpperCase().includes(search)
        )
      )
    : [];

  const isExpired = (token) => {
    if (!token) true;
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (err) {
      console.error("Error Decoding token: ", err);
      return true;
    }
  };

  useEffect(() => {
    getServersData();
    //const role = localStorage.getItem('token')
    const token = localStorage.getItem("token");
    const claims = atob(token.split(".")[1]);
    const role = JSON.parse(claims).role;
    if (role) {
      setUserRole(role);
    }
  }, []);

  const deleteServerHandler = async () => {
    try {
      console.log(serverIdDelete);
      await deleteServer(serverIdDelete);
      toast.success("Servidor eliminado con éxito");
      getServersData();
      handleClose();
    } catch (err) {
      console.error("Error deleting Server, ", err);
    }
  };

  //# Manejar la Expansión del Acordeon
  const handleAccordion = (servidorId) => {
    setActiveKey(activeKey === servidorId ? null : servidorId);
  };

  const handleDownload = async (servidorId, clavePEM) => {
    try {
      if (userRole === "ADMIN") {
        const response = await downloadPEM(servidorId);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${clavePEM}`);
        document.body.appendChild(link);
        link.click();
      } else {
        return toast.error("Usuario Inválido", { duration: 1300 });
      }
    } catch (error) {
      console.error("Error Generating  Report, ", error);
    }
  };

  return (
    <div>
      {/*//# Modal Eliminación Registro */}
      <Modal show={showDelete} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex" }}>
            <img src={imagenVector} style={{ height: "20vh" }} />
            <div>
              <p>
                ¿Estás Seguro de que quieres{" "}
                {<span style={{ color: "red" }}>ELIMINAR</span>} este registro?
              </p>
              <p>
                Perderás La información de este Servidor y esta acción{" "}
                {<span style={{ color: "red" }}>NO SE PUEDE DESHACER</span>}
              </p>
            </div>
          </div>
          <br />
          <Form.Label>Para Eliminar Escriba: "Estoy Seguro"</Form.Label>
          <Form.Control
            type="text"
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
          />
          <div style={{ position: "relative", margin: "2vh 0 0 0" }}>
            <a
              style={{ cursor: "pointer", textDecorationLine: "none" }}
              onClick={handleClose}
              className="card-link"
            >
              Cancelar
            </a>
            <Button
              style={{ position: "absolute", right: "0" }}
              variant="danger"
              onClick={() => {
                if (confirmationText === "Estoy Seguro") {
                  deleteServerHandler();
                  setConfirmationText("");
                } else {
                  toast.error("Por favor complete los Campos para Continuar");
                }
              }}
            >
              Eliminar
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <div style={{ display: "flex", margin: "3vh 0vh 0 3vh" }}>
        <Form.Control
          type="text"
          size="sm"
          placeholder="Buscar..."
          style={{
            width: "30vh",
          }}
          value={search}
          onChange={handleSearch}
        />

        <Button
          onClick={navigateToRegist}
          size="sm"
          style={{ position: "absolute", right: "3vh" }}
        >
          + Add Server
        </Button>
      </div>

      <div
        style={{
          margin: "3vh 3vh 0 3vh",
          border: "1px solid #e3e3e3",
          borderRadius: "9px 9px 0 0",
        }}
      >
        <table
          style={{
            width: "100%",
            backgroundColor: "#e8ecef",
            tableLayout: "fixed",
            textAlign: "center",
            height: "5vh",
            borderRadius: "7px 7px 0 0",
            color: "#334046",
          }}
        >
          <thead>
            <tr>
              <th>AGENCIA</th>
              <th>ID AWS</th>
              <th>CORREO</th>
              <th>REGIÓN</th>
              <th>CREDENCIAL</th>
              <th>TIPO DE SERVICIO</th>
              <th>NOMBRE DEL SERVICIO</th>
              <th>TIPO DE INSTANCIA</th>
              <th style={{ width: "8vh" }}></th>
            </tr>
          </thead>
        </table>
      </div>

      {isLoading ? (
        <p>Cargando Datos...</p>
      ) : error ? (
        <p>Error al cargar datos</p>
      ) : serversInfo && serversInfo.length > 0 ? (
        <div
          style={{
            margin: "0 3vh 0 3vh",
            backgroundColor: "white",
            borderRadius: "0 0 8px 8px",
            overflowY: "auto",
            maxHeight: "66vh",
            border: "1px solid #e3e3e3",
          }}
        >
          <div
            style={{
              display: "grid",
            }}
          >
            {filteredServers.map((info) => (
              <Accordion
                key={info.servidorId}
                activeKey={
                  activeKey === info.servidorId ? info.servidorId : null
                }
                style={{ width: "100%" }}
              >
                <Accordion.Item eventKey={info.servidorId}>
                  <Accordion.Header
                    onClick={() => handleAccordion(info.servidorId)}
                  >
                    <table
                      style={{
                        width: "100%",
                        tableLayout: "fixed",
                        textAlign: "center",
                      }}
                    >
                      <thead>
                        <tr>
                          <th>{info.agencia}</th>
                          <th>{info.idLogin}</th>
                          <th>{info.correo}</th>
                          <th>{info.region}</th>
                          <th>{info.credencial}</th>
                          <th>{info.tipoServicio}</th>
                          <th>{info.nombreServicio}</th>
                          <th>{info.tipoInstancia}</th>
                        </tr>
                      </thead>
                    </table>
                  </Accordion.Header>
                  <Accordion.Body
                    style={{
                      backgroundColor: "#cfe2ff",
                      height: "auto",
                      paddingBottom: "3vh",
                      borderRadius: "0 0 8px 8px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "white",
                        width: "100%",
                        padding: "1vh 0 2vh 2vh",
                        borderRadius: "10px",
                        display: "flex",
                        position: "relative",
                      }}
                    >
                      {/* INFORMACIÓN GENERAL DEL SERVICIO */}
                      <div>
                        <h5>Información General del Servicio</h5>
                        <span style={{ fontSize: "small", fontWeight: "bold" }}>
                          UNIDAD
                        </span>
                        <Form.Control
                          size="sm"
                          type="text"
                          readOnly
                          disabled
                          value={info.unidad}
                        />
                        <span style={{ fontSize: "small", fontWeight: "bold" }}>
                          CLIENTE
                        </span>
                        <Form.Control
                          size="sm"
                          type="text"
                          readOnly
                          disabled
                          value={info.cliente}
                        />
                        <span style={{ fontSize: "small", fontWeight: "bold" }}>
                          ADMINISTRADOR
                        </span>
                        <Form.Control
                          size="sm"
                          type="text"
                          readOnly
                          disabled
                          value={info.administrador}
                        />
                        <span style={{ fontSize: "small", fontWeight: "bold" }}>
                          HERRAMIENTA
                        </span>
                        <Form.Control
                          size="sm"
                          type="text"
                          readOnly
                          disabled
                          value={info.herramienta}
                        />
                        <span style={{ fontSize: "small", fontWeight: "bold" }}>
                          PROVEEDOR
                        </span>
                        <Form.Control
                          size="sm"
                          type="text"
                          readOnly
                          disabled
                          value={info.proveedor}
                        />
                      </div>

                      {/* DETALLES DEL SERVICIO */}
                      <div style={{ marginLeft: "5vh" }}>
                        <h5>Detalles del Servicio</h5>
                        <span style={{ fontSize: "small", fontWeight: "bold" }}>
                          IP PÚBLICA
                        </span>
                        <Form.Control
                          size="sm"
                          type="text"
                          readOnly
                          disabled
                          value={info.ipPublica}
                        />
                        <span style={{ fontSize: "small", fontWeight: "bold" }}>
                          VPC
                        </span>
                        <Form.Control
                          size="sm"
                          type="text"
                          readOnly
                          disabled
                          value={info.vpc}
                        />
                        <span style={{ fontSize: "small", fontWeight: "bold" }}>
                          SECURITY GROUP
                        </span>
                        <Form.Control
                          size="sm"
                          type="text"
                          readOnly
                          disabled
                          value={info.securityGroup}
                        />
                        <span style={{ fontSize: "small", fontWeight: "bold" }}>
                          SISTEMA OPERATIVO
                        </span>
                        <Form.Control
                          size="sm"
                          type="text"
                          readOnly
                          disabled
                          value={info.sistemaOperativo}
                        />
                      </div>

                      {/* CREDENCIALES Y MÉTODOS DE PAGO */}
                      <div style={{ marginLeft: "5vh" }}>
                        <h5>Credenciales y Métodos de Pago</h5>
                        <span style={{ fontSize: "small", fontWeight: "bold" }}>
                          CREDENIAL
                        </span>
                        <Form.Control
                          size="sm"
                          type="text"
                          readOnly
                          disabled
                          value={info.credencial}
                        />
                        <span style={{ fontSize: "small", fontWeight: "bold" }}>
                          CLAVE PEM
                        </span>
                        <InputGroup size="sm">
                          <Form.Control
                            size="sm"
                            type="text"
                            readOnly
                            disabled
                            value={info.clavePEM}
                          />
                          <Button
                            onClick={() => {
                              if (info.clavePEM === "No Registrada") {
                                return toast.error("Clave PEM No Registrada", {
                                  duration: 1300,
                                });
                              } else {
                                handleDownload(info.servidorId, info.clavePEM);
                              }
                            }}
                          >
                            Descargar
                          </Button>
                        </InputGroup>
                        <span style={{ fontSize: "small", fontWeight: "bold" }}>
                          MÉTODO DE PAGO
                        </span>
                        <Form.Control
                          size="sm"
                          type="text"
                          readOnly
                          disabled
                          value={info.metodoPago}
                        />
                        <span style={{ fontSize: "small", fontWeight: "bold" }}>
                          COSTO MENSUAL
                        </span>
                        <InputGroup size="sm">
                          <div style={{ width: "fit-content" }}>
                            <Form.Select
                              size="sm"
                              value={selectedCurrency}
                              onChange={handleCurrencyChange}
                            >
                              <option value="USD">USD</option>
                              <option value="GTQ">GTQ</option>
                            </Form.Select>
                          </div>
                          <Form.Control
                            size="sm"
                            type="number"
                            readOnly
                            disabled
                            value={
                              selectedCurrency === "USD"
                                ? parseFloat(info.costoMensual).toFixed(2)
                                : (
                                    parseFloat(info.costoMensual) * exchangeRate
                                  ).toFixed(2)
                            }
                          />
                        </InputGroup>
                        <span style={{ fontSize: "small", fontWeight: "bold" }}>
                          COSTO ANUAL
                        </span>
                        <InputGroup size="sm">
                          <div style={{ width: "fit-content" }}>
                            <Form.Select
                              size="sm"
                              value={selectedCurrency}
                              onChange={handleCurrencyChange}
                            >
                              <option value="USD">USD</option>
                              <option value="GTQ">GTQ</option>
                            </Form.Select>
                          </div>
                          <Form.Control
                            size="sm"
                            type="text"
                            readOnly
                            disabled
                            value={
                              selectedCurrency === "USD"
                                ? parseFloat(info.costoAnual).toFixed(2)
                                : (
                                    parseFloat(info.costoAnual) * exchangeRate
                                  ).toFixed(2)
                            }
                          />
                        </InputGroup>
                      </div>
                      {/* BACKUP Y OBSERVACIONES */}
                      <div style={{ marginLeft: "5vh" }}>
                        <h5>Backup y Observaciones</h5>
                        <span style={{ fontSize: "small", fontWeight: "bold" }}>
                          BACKUP
                        </span>
                        <Form.Control
                          size="sm"
                          type="text"
                          readOnly
                          disabled
                          value={info.serverBackup}
                        />
                        <span style={{ fontSize: "small", fontWeight: "bold" }}>
                          OBSERVACIONES (FINANCIERAS)
                        </span>
                        <Form.Control
                          size="sm"
                          type="text"
                          readOnly
                          disabled
                          value={info.observaciones}
                        />
                        <span style={{ fontSize: "small", fontWeight: "bold" }}>
                          FECHA DE CIERRE
                        </span>
                        <Form.Control
                          size="sm"
                          type="text"
                          readOnly
                          disabled
                          value={info.cierre}
                        />
                        <span style={{ fontSize: "small", fontWeight: "bold" }}>
                          OTROS
                        </span>
                        <Form.Control
                          size="sm"
                          type="text"
                          readOnly
                          disabled
                          value={info.otros}
                        />
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          right: "0",
                          bottom: "0",
                          margin: "0 2vh 2vh 0",
                        }}
                      >
                        <Button
                          variant="success"
                          onClick={() => navigateToEdit(info.servidorId)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleShow(info.servidorId)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))}
          </div>
        </div>
      ) : (
        <p>No hay datos</p>
      )}
    </div>
  );
};
