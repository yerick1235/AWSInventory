import React, { useEffect, useState } from "react";
import "../RegistServer/RegistServer.css";
import { listById, updateServer } from "../../Services/api";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";

export const EditServer = () => {
  const { serversId } = useParams();
  const [serverInfo, setServerInfo] = useState([]);

  const info = serverInfo[0];

  const navigate = useNavigate();
  const navigateToServers = () => {
    navigate("/servers");
  };

  useEffect(() => {
    const fetchServer = async () => {
      try {
        const response = await listById(serversId);
        setServerInfo(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchServer();
  }, [serversId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServerInfo((prevInfo) => {
      const updateInfo = { 
        ...prevInfo[0], 
        [name]: value.toUpperCase(),

        //# Calcular Costo Anual
        ...(name === 'costoMensual' && {
          costoAnual: (value*12).toFixed(2)
        })
      };
      return [updateInfo];
    });
  };

  if (serverInfo.length === 0) {
    return <div>Cargando...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      for (const key in info) {
        formData.append(key, info[key]);
      }

      //# Agregar Pem Si fué Seleccionada
      const pemFile = document.querySelector('input[name="clavePEM"]').files[0];
      if (pemFile) {
        formData.append("clavePEM", pemFile);
      }

      const response = await updateServer(serversId, formData);
      console.log(response);
      navigateToServers();
    } catch (err) {
      console.error("Error updating Server, ", err);
    }
  };

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          position: "relative",
          width: "100%",
          gap: "5vh",
          padding: "3vh",
        }}
      >
        <Card style={{ padding: "2vh" }}>
          <h5 style={{fontWeight:'bold'}}>INFORMACIÓN GENERAL</h5>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: "5vh",
              rowGap: "2vh",
            }}
          >
            <Form.Group>
              <Form.Label style={{fontWeight:'bold'}}>AGENCIA</Form.Label>
              <Form.Control
                type="text"
                placeholder="Agencia"
                name="agencia"
                value={info.agencia}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{fontWeight:'bold'}}>ADMINISTRADOR</Form.Label>
              <Form.Control
                type="text"
                placeholder="Administrador"
                name="administrador"
                value={info.administrador}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{fontWeight:'bold'}}>ID AWS</Form.Label>
              <Form.Control
                type="text"
                placeholder="ID AWS"
                name="idLogin"
                value={info.idLogin}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{fontWeight:'bold'}}>PROVEEDOR</Form.Label>
              <Form.Control
                type="text"
                placeholder="Proveedor"
                name="proveedor"
                value={info.proveedor}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{fontWeight:'bold'}}>CORREO</Form.Label>
              <Form.Control
                type="text"
                placeholder="Correo"
                name="correo"
                value={info.correo}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{fontWeight:'bold'}}>CLIENTE</Form.Label>
              <Form.Control
                type="text"
                placeholder="Cliente"
                name="cliente"
                value={info.cliente}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{fontWeight:'bold'}}>REGIÓN</Form.Label>
              <Form.Control
                type="text"
                placeholder="Región"
                name="region"
                value={info.region}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{fontWeight:'bold'}}>BACKUP</Form.Label>
              <Form.Control
                type="text"
                placeholder="Backup"
                name="backup"
                value={info.serverBackup}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
        </Card>

        <Card style={{ padding: "2vh" }}>
          <h5 style={{fontWeight:'bold'}}>CONFIGURACIÓN TÉCNICA</h5>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: "5vh",
              rowGap: "2vh",
            }}
          >
            <Form.Group>
              <Form.Label style={{fontWeight:'bold'}}>TIPO DE SERVICIO</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tipo de Servicio"
                name="tipoServicio"
                value={info.tipoServicio}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{fontWeight:'bold'}}>SISTEMA OPERATIVO</Form.Label>
              <Form.Control
                type="text"
                placeholder="Sistema Operativo"
                name="sistemaOperativo"
                value={info.sistemaOperativo}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{fontWeight:'bold'}}>NOMBRE DEL SERVICIO</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del Servicio"
                name="nombreServicio"
                value={info.nombreServicio}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{fontWeight:'bold'}}>CLAVE PEM: {info.clavePEM}</Form.Label>
              <Form.Control
                type="file"
                name="clavePEM"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{fontWeight:'bold'}}>TIPO DE INSTANCIA</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tipo de Instancia"
                name="tipoInstancia"
                value={info.tipoInstancia}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{fontWeight:'bold'}}>VPC</Form.Label>
              <Form.Control
                type="text"
                placeholder="VPC"
                name="vpc"
                value={info.vpc}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{fontWeight:'bold'}}>IP PÚBLICA</Form.Label>
              <Form.Control
                type="text"
                placeholder="IP Pública"
                name="ipPublica"
                value={info.ipPublica}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{fontWeight:'bold'}}>SECURITY GROUP</Form.Label>
              <Form.Control
                type="text"
                placeholder="Security Group"
                name="securityGroup"
                value={info.securityGroup}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
        </Card>

        <Card style={{ padding: "2vh" }}>
          <h5 style={{fontWeight:'bold'}}>OPERACIÓN Y MANTENIMIENTO</h5>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: "5vh",
              rowGap: "2vh",
            }}
          >
            <Form.Group>
              <Form.Label style={{fontWeight:'bold'}}>UNIDAD</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unidad"
                name="unidad"
                value={info.unidad}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{fontWeight:'bold'}}>CREDENCIAL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Credencial"
                name="credencial"
                value={info.credencial}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{fontWeight:'bold'}}>HERRAMIENTA</Form.Label>
              <Form.Control
                type="text"
                placeholder="Herramienta"
                name="herramienta"
                value={info.herramienta}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{fontWeight:'bold'}}>FECHA DE CIERRE</Form.Label>
              <Form.Control
                type="date"
                name="cierre"
                value={info.cierre}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
          <Form.Group style={{ marginTop: "2vh" }}>
            <Form.Label style={{fontWeight:'bold'}}>OTROS</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Opcional"
              name="otros"
              value={info.otros}
              onChange={handleChange}
            />
          </Form.Group>
        </Card>

        <Card style={{ padding: "2vh" }}>
          <h5 style={{fontWeight:'bold'}}>DETALLES FINANCIEROS</h5>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: "5vh",
              rowGap: "2vh",
            }}
          >
            <Form.Group>
              <Form.Label style={{fontWeight:'bold'}}>COSTO MENSUAL (USD)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Costo Mensual"
                name="costoMensual"
                value={info.costoMensual}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{fontWeight:'bold'}}>COSTO ANUAL (USD)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Costo Anual"
                name="costoAnual"
                disabled
                value={info.costoAnual}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{fontWeight:'bold'}}>MÉTODO DE PAGO</Form.Label>
              <Form.Control
                type="text"
                placeholder="Método de pago"
                name="metodoPago"
                value={info.metodoPago}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{fontWeight:'bold'}}>OBSERVACIONES</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Opcional"
                name="observaciones"
                value={info.observaciones}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
        </Card>
      </div>
      <div style={{ display: "flex", justifyContent:'center', gap: "40vh", margin:'3vh'}}>
        <Button onClick={navigateToServers} variant="danger">CANCELAR</Button>
        <Button onClick={handleSubmit} variant="success">GUARDAR CAMBIOS</Button>
      </div>
    </>
  );
};
