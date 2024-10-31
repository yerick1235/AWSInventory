import React, { useEffect, useState } from "react";
import { useServers } from "../../Shared/Hooks/UseServers";
import { generateReport } from "../../Services/api";
import {
  Button,
  Modal,
  ToggleButtonGroup,
  ToggleButton,
  Table,
  Form,
} from "react-bootstrap";
import "./Reports.css";

export const Reports = () => {
  const { error, getServersData, isLoading, serversInfo } = useServers();
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [checked, setChecked] = useState(false);
  const [allServersSelected, setAllServersSelected] = useState(false);

  const [selectedHeader, setSelectedHeader] = useState([]);
  const [allHeadersSelected, setAllHeadersSelected] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleClose = () => setShowFilter(false);
  const handleShow = () => setShowFilter(true);

  const handleChange = () => {
    setChecked(!checked);
  };

  //# Filtrar Servidores
  const filteredServer = serversInfo
    ? serversInfo.filter((info) =>
        Object.values(info).some((value) =>
          String(value).toLocaleLowerCase().includes(search)
        )
      )
    : [];

  useEffect(() => {
    getServersData();
  }, []);

  const handleSelect = (info) => {
    setSelected((prevSelected) => {
      if (
        prevSelected.some((server) => server.servidorId === info.servidorId)
      ) {
        return prevSelected.filter(
          (server) => server.servidorId !== info.servidorId
        );
      } else {
        return [...prevSelected, info];
      }
    });
  };

  //# Get Servers
  const getSelectedServers = (headers) => {
    return selected.map((server) => {
      const filteredServer = {};
      headers.forEach((header) => {
        if (server.hasOwnProperty(header)) {
          filteredServer[header] = server[header];
        } else {
          console.log(
            `El header ${header} no coincide con ninguna propiedad del servidor`
          );
        }
      });
      console.log("headers: ", headers);
      console.log("servers: ", filteredServer);
      return filteredServer;
    });
  };

  //# Select All Servers
  const handleSelectServers = () => {
    if (allServersSelected) {
      setSelected([]);
    } else {
      setSelected(filteredServer);
    }
    setAllServersSelected(!allServersSelected);
  };

  //# ToggleButtos for Headers
  const handleToggleHeader = (val) => {
    setSelectedHeader(val);
  };

  //# Send Server Headers
  const handleReport = async () => {
    const servers = getSelectedServers(selectedHeader);
    try {
      const response = await generateReport({
        header: selectedHeader,
        servers,
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "ReporteServidor.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Error Generating  Report, ", err);
    }
  };

  const toggleAllHeaders = () => {
    if (allHeadersSelected) {
      setSelectedHeader([]);
    } else {
      const allHeaders = [
        "agencia",
        "idLogin",
        "correo",
        "region",
        "credencial",
        "tipoServicio",
        "nombreServicio",
        "tipoInstancia",
        "sistemaOperativo",
        "ipPublica",
        "vpc",
        "securityGroup",
        "clavePEM",
        "cliente",
        "costoMensual",
        "costoAnual",
        "unidad",
        "metodoPago",
        "herramienta",
        "administrador",
        "proveedor",
        "serverBackup",
        "cierre",
      ];
      setSelectedHeader(allHeaders);
    }
    setAllHeadersSelected(!allHeadersSelected);
  };

  return (
    <div style={{ margin: "2vh" }}>
      <input
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={handleSearch}
      />

      <Form>
        <Form.Check
          type="checkbox"
          id="todosServer"
          label="SELECCIONAR TODOS"
          checked={allServersSelected}
          onChange={handleSelectServers}
          className="text-white"
          style={{ margin: "2vh 0 2vh 0" }}
        />
      </Form>

      <div>
        <div
          style={{
            backgroundColor: "white",
            overflowY: "scroll",
            maxHeight: "55vh",
            width: "100hv",
          }}
        >
          {isLoading ? (
            <p>Cargando Datos...</p>
          ) : error ? (
            <p>Error al Cargar Datos</p>
          ) : serversInfo && serversInfo.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th style={{width:'1px'}}>#</th>
                  <th>AGENCIA</th>
                  <th>ID AWS</th>
                  <th>CORREO</th>
                  <th>REGIÓN</th>
                  <th>CREDENCIAL</th>
                  <th>TIPO DE SERVICIO</th>
                  <th>NOMBRE DEL SERVICIO</th>
                  <th>TIPO DE INSTANCIA</th>
                </tr>
              </thead>
              <tbody>
                {filteredServer.map((info) => (
                  <tr
                    key={info.servidorId}
                    onClick={(event) => {
                      if (event.target.type !== "checkbox") {
                        handleSelect(info);
                      }
                    }}
                  >
                    <td style={{width:'1px'}}>
                      <input
                        type="checkbox"
                        checked={selected.some(
                          (server) => server.servidorId === info.servidorId
                        )}
                        onChange={() => handleSelect(info)}
                      />
                    </td>
                    <td>{info.agencia}</td>
                    <td>{info.idLogin}</td>
                    <td>{info.correo}</td>
                    <td>{info.region}</td>
                    <td>{info.credencial}</td>
                    <td>{info.tipoServicio}</td>
                    <td>{info.nombreServicio}</td>
                    <td>{info.tipoInstancia}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No Hay Datos</p>
          )}
        </div>
      </div>
      <br />
      <Button onClick={handleShow}>GENERAR REPORTE</Button>
      <div>
        <script>var Alert = ReactBootstrap.Alert;</script>
        <Modal
          show={showFilter}
          onHide={handleClose}
          style={{ backdropFilter: "blur(5px)" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>CAMPOS:</Modal.Title>
          </Modal.Header>
          <Form>
            <Form.Check
              type="checkbox"
              id="todos"
              label="TODOS"
              checked={allHeadersSelected}
              onChange={toggleAllHeaders}
              style={{ margin: "2vh 0 0 3vh" }}
            />
          </Form>
          <Modal.Body>
            <ToggleButtonGroup
              type="checkbox"
              value={selectedHeader}
              onChange={handleToggleHeader}
              className="mb-3"
              style={{ flexWrap: "wrap", display: "flex", gap: "5px" }}
            >
              <ToggleButton
                style={{
                  borderRadius: "20px",
                  borderColor: "transparent",
                  backgroundColor: selectedHeader.includes("agencia")
                    ? "#0d6efd"
                    : "#a3afc9",
                }}
                id="agencia"
                value={"agencia"}
              >
                AGENCIA
              </ToggleButton>
              <ToggleButton
                style={{
                  borderRadius: "20px",
                  borderColor: "transparent",
                  backgroundColor: selectedHeader.includes("idLogin")
                    ? "#0d6efd"
                    : "#a3afc9",
                }}
                id="idLogin"
                value={"idLogin"}
              >
                ID AWS
              </ToggleButton>
              <ToggleButton
                style={{
                  borderRadius: "20px",
                  borderColor: "transparent",
                  backgroundColor: selectedHeader.includes("correo")
                    ? "#0d6efd"
                    : "#a3afc9",
                }}
                id="correo"
                value={"correo"}
              >
                CORREO
              </ToggleButton>
              <ToggleButton
                style={{
                  borderRadius: "20px",
                  borderColor: "transparent",
                  backgroundColor: selectedHeader.includes("region")
                    ? "#0d6efd"
                    : "#a3afc9",
                }}
                id="region"
                value={"region"}
              >
                REGIÓN
              </ToggleButton>
              <ToggleButton
                style={{
                  borderRadius: "20px",
                  borderColor: "transparent",
                  backgroundColor: selectedHeader.includes("credencial")
                    ? "#0d6efd"
                    : "#a3afc9",
                }}
                id="credencial"
                value={"credencial"}
              >
                CREDENCIAL
              </ToggleButton>
              <ToggleButton
                style={{
                  borderRadius: "20px",
                  borderColor: "transparent",
                  backgroundColor: selectedHeader.includes("tipoServicio")
                    ? "#0d6efd"
                    : "#a3afc9",
                }}
                id="tipoServicio"
                value={"tipoServicio"}
              >
                TIPO DE SERVICIO
              </ToggleButton>
              <ToggleButton
                style={{
                  borderRadius: "20px",
                  borderColor: "transparent",
                  backgroundColor: selectedHeader.includes("nombreServicio")
                    ? "#0d6efd"
                    : "#a3afc9",
                }}
                id="nombreServicio"
                value={"nombreServicio"}
              >
                NOMBRE DEL SERVICIO
              </ToggleButton>
              <ToggleButton
                style={{
                  borderRadius: "20px",
                  borderColor: "transparent",
                  backgroundColor: selectedHeader.includes("tipoInstancia")
                    ? "#0d6efd"
                    : "#a3afc9",
                }}
                id="tipoInstancia"
                value={"tipoInstancia"}
              >
                TIPO DE INSTANCIA
              </ToggleButton>
              <ToggleButton
                style={{
                  borderRadius: "20px",
                  borderColor: "transparent",
                  backgroundColor: selectedHeader.includes("sistemaOperativo")
                    ? "#0d6efd"
                    : "#a3afc9",
                }}
                id="sistemaOperativo"
                value={"sistemaOperativo"}
              >
                SISTEMA OPERATIVO
              </ToggleButton>
              <ToggleButton
                style={{
                  borderRadius: "20px",
                  borderColor: "transparent",
                  backgroundColor: selectedHeader.includes("ipPublica")
                    ? "#0d6efd"
                    : "#a3afc9",
                }}
                id="ipPublica"
                value={"ipPublica"}
              >
                IP PÚBLICA
              </ToggleButton>
              <ToggleButton
                style={{
                  borderRadius: "20px",
                  borderColor: "transparent",
                  backgroundColor: selectedHeader.includes("vpc")
                    ? "#0d6efd"
                    : "#a3afc9",
                }}
                id="vpc"
                value={"vpc"}
              >
                VPC
              </ToggleButton>
              <ToggleButton
                style={{
                  borderRadius: "20px",
                  borderColor: "transparent",
                  backgroundColor: selectedHeader.includes("securityGroup")
                    ? "#0d6efd"
                    : "#a3afc9",
                }}
                id="securityGroup"
                value={"securityGroup"}
              >
                SECURITY GROUP
              </ToggleButton>
              <ToggleButton
                style={{
                  borderRadius: "20px",
                  borderColor: "transparent",
                  backgroundColor: selectedHeader.includes("clavePEM")
                    ? "#0d6efd"
                    : "#a3afc9",
                }}
                id="clavePEM"
                value={"clavePEM"}
              >
                PEM
              </ToggleButton>
              <ToggleButton
                style={{
                  borderRadius: "20px",
                  borderColor: "transparent",
                  backgroundColor: selectedHeader.includes("cliente")
                    ? "#0d6efd"
                    : "#a3afc9",
                }}
                id="cliente"
                value={"cliente"}
              >
                CLIENTE
              </ToggleButton>
              <ToggleButton
                style={{
                  borderRadius: "20px",
                  borderColor: "transparent",
                  backgroundColor: selectedHeader.includes("costoMensual")
                    ? "#0d6efd"
                    : "#a3afc9",
                }}
                id="costoMensual"
                value={"costoMensual"}
              >
                COSTO MENSUAL
              </ToggleButton>
              <ToggleButton
                style={{
                  borderRadius: "20px",
                  borderColor: "transparent",
                  backgroundColor: selectedHeader.includes("costoAnual")
                    ? "#0d6efd"
                    : "#a3afc9",
                }}
                id="costoAnual"
                value={"costoAnual"}
              >
                COSTO ANUAL
              </ToggleButton>
              <ToggleButton
                style={{
                  borderRadius: "20px",
                  borderColor: "transparent",
                  backgroundColor: selectedHeader.includes("unidad")
                    ? "#0d6efd"
                    : "#a3afc9",
                }}
                id="unidad"
                value={"unidad"}
              >
                UNIDAD
              </ToggleButton>
              <ToggleButton
                style={{
                  borderRadius: "20px",
                  borderColor: "transparent",
                  backgroundColor: selectedHeader.includes("metodoPago")
                    ? "#0d6efd"
                    : "#a3afc9",
                }}
                id="metodoPago"
                value={"metodoPago"}
              >
                MÉTODO DE PAGO
              </ToggleButton>
              <ToggleButton
                style={{
                  borderRadius: "20px",
                  borderColor: "transparent",
                  backgroundColor: selectedHeader.includes("herramienta")
                    ? "#0d6efd"
                    : "#a3afc9",
                }}
                id="herramienta"
                value={"herramienta"}
              >
                HERRAMIENTA
              </ToggleButton>
              <ToggleButton
                style={{
                  borderRadius: "20px",
                  borderColor: "transparent",
                  backgroundColor: selectedHeader.includes("administrador")
                    ? "#0d6efd"
                    : "#a3afc9",
                }}
                id="administrador"
                value={"administrador"}
              >
                ADMINISTRADOR
              </ToggleButton>
              <ToggleButton
                style={{
                  borderRadius: "20px",
                  borderColor: "transparent",
                  backgroundColor: selectedHeader.includes("proveedor")
                    ? "#0d6efd"
                    : "#a3afc9",
                }}
                id="proveedor"
                value={"proveedor"}
              >
                PROVEEDOR
              </ToggleButton>
              <ToggleButton
                style={{
                  borderRadius: "20px",
                  borderColor: "transparent",
                  backgroundColor: selectedHeader.includes("serverBackup")
                    ? "#0d6efd"
                    : "#a3afc9",
                }}
                id="serverBackup"
                value={"serverBackup"}
              >
                BACKUP
              </ToggleButton>
              <ToggleButton
                style={{
                  borderRadius: "20px",
                  borderColor: "transparent",
                  backgroundColor: selectedHeader.includes("cierre")
                    ? "#0d6efd"
                    : "#a3afc9",
                }}
                id="cierre"
                value={"cierre"}
              >
                FECHA DE CIERRE
              </ToggleButton>
            </ToggleButtonGroup>
            <Button variant="success" onClick={handleReport}>Descargar Reporte</Button>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};
