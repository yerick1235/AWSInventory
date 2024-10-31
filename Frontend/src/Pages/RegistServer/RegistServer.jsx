import { useState } from "react";
import { registServer } from "../../Services/api";
import "./RegistServer.css";
import { useNavigate } from "react-router-dom";
import { Form, Card, Button } from "react-bootstrap";

export const RegistServer = () => {
  const [formData, setFormData] = useState({
    unidad: "",
    herramienta: "",
    administrador: "",
    proveedor: "",
    correo: "",
    metodoPago: "",
    idLogin: "",
    credencial: "",
    tipoServicio: "",
    nombreServicio: "",
    region: "",
    tipoInstancia: "",
    ipPublica: "",
    vpc: "",
    securityGroup: "",
    sistemaOperativo: "",
    costoMensual: "",
    costoAnual: "",
    observaciones: "",
    otros: "",
    serverBackup: "",
    cliente: "",
    agencia: "",
    cierre: "",
  });

  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleStep = (newStep) => {
    setStep(newStep);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.toUpperCase(),

      //# Calcular costo Anual y cambiarlo en Tiempo Real
      ...(name === "costoMensual" && {
        costoAnual: value * 12,
      }),
    });
  };

  const handleSubmit = async (e) => {
    console.log(file);

    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (file) {
      data.append("clavePEM", file);
    }

    try {
      const response = await registServer(data);
      console.log("Server Registered", formData.cierre);
      navigateToServers();
    } catch (error) {
      console.error("Error Registering Server", error);
    }
  };

  const navigate = useNavigate();
  const navigateToServers = () => {
    navigate("/servers");
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Card style={{ height: "fit-content", margin: "3vh" }}>
          <Card.Header>
            <h5>REGISTRAR SERVIDOR</h5>
          </Card.Header>
          <Card.Body>
            {step === 1 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto auto",
                  alignItems: "center",
                  columnGap: "1rem",
                }}
              >
                <img src="https://img.icons8.com/?size=40&id=9905&format=png&color=0dcaf0" />
                <h6
                  onClick={() => handleStep(1)}
                  style={{ marginTop: "1vh" }}
                  className="text-info"
                >
                  INFORMACIÓN GENERAL
                </h6>
                <img src="https://img.icons8.com/?size=40&id=118835&format=png&color=00000080" />
                <br />
                <img src="https://img.icons8.com/?size=40&id=9909&format=png&color=00000080" />
                <h6
                  onClick={() => handleStep(2)}
                  style={{ marginTop: "1vh" }}
                  className="text-black-50"
                >
                  CONFIGURACIÓN TÉCNICA
                </h6>
                <img src="https://img.icons8.com/?size=40&id=118835&format=png&color=00000080" />
                <br />
                <img src="https://img.icons8.com/?size=40&id=9901&format=png&color=00000080" />
                <h6
                  onClick={() => handleStep(3)}
                  style={{ marginTop: "1vh" }}
                  className="text-black-50"
                >
                  OPERACIÓN Y MANTENIMIENTO
                </h6>
                <img src="https://img.icons8.com/?size=40&id=118835&format=png&color=00000080" />
                <br />
                <img src="https://img.icons8.com/?size=40&id=9908&format=png&color=00000080" />
                <h6
                  onClick={() => handleStep(4)}
                  style={{ marginTop: "1vh" }}
                  className="text-black-50"
                >
                  DETALLES FINANCIEROS
                </h6>
              </div>
            )}

            {step === 2 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto auto",
                  alignItems: "center",
                  columnGap: "1rem",
                }}
              >
                <img src="https://img.icons8.com/?size=40&id=9905&format=png&color=198754" />
                <h6
                  onClick={() => handleStep(1)}
                  style={{ marginTop: "1vh" }}
                  className="text-success"
                >
                  INFORMACIÓN GENERAL
                </h6>
                <img src="https://img.icons8.com/?size=40&id=118835&format=png&color=198754" />
                <br />
                <img src="https://img.icons8.com/?size=40&id=9909&format=png&color=0dcaf0" />
                <h6
                  onClick={() => handleStep(2)}
                  style={{ marginTop: "1vh" }}
                  className="text-info"
                >
                  CONFIGURACIÓN TÉCNICA
                </h6>
                <img src="https://img.icons8.com/?size=40&id=118835&format=png&color=00000080" />
                <br />
                <img src="https://img.icons8.com/?size=40&id=9901&format=png&color=00000080" />
                <h6
                  onClick={() => handleStep(3)}
                  style={{ marginTop: "1vh" }}
                  className="text-black-50"
                >
                  OPERACIÓN Y MANTENIMIENTO
                </h6>
                <img src="https://img.icons8.com/?size=40&id=118835&format=png&color=00000080" />
                <br />
                <img src="https://img.icons8.com/?size=40&id=9908&format=png&color=00000080" />
                <h6
                  onClick={() => handleStep(4)}
                  style={{ marginTop: "1vh" }}
                  className="text-black-50"
                >
                  DETALLES FINANCIEROS
                </h6>
              </div>
            )}

            {step === 3 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto auto",
                  alignItems: "center",
                  columnGap: "1rem",
                }}
              >
                <img src="https://img.icons8.com/?size=40&id=9905&format=png&color=198754" />
                <h6
                  onClick={() => handleStep(1)}
                  style={{ marginTop: "1vh" }}
                  className="text-success"
                >
                  INFORMACIÓN GENERAL
                </h6>
                <img src="https://img.icons8.com/?size=40&id=118835&format=png&color=198754" />
                <br />
                <img src="https://img.icons8.com/?size=40&id=9909&format=png&color=198754" />
                <h6
                  onClick={() => handleStep(2)}
                  style={{ marginTop: "1vh" }}
                  className="text-success"
                >
                  CONFIGURACIÓN TÉCNICA
                </h6>
                <img src="https://img.icons8.com/?size=40&id=118835&format=png&color=198754" />
                <br />
                <img src="https://img.icons8.com/?size=40&id=9901&format=png&color=0dcaf0" />
                <h6
                  onClick={() => handleStep(3)}
                  style={{ marginTop: "1vh" }}
                  className="text-info"
                >
                  OPERACIÓN Y MANTENIMIENTO
                </h6>
                <img src="https://img.icons8.com/?size=40&id=118835&format=png&color=00000080" />
                <br />
                <img src="https://img.icons8.com/?size=40&id=9908&format=png&color=00000080" />
                <h6
                  onClick={() => handleStep(4)}
                  style={{ marginTop: "1vh" }}
                  className="text-black-50"
                >
                  DETALLES FINANCIEROS
                </h6>
              </div>
            )}

            {step === 4 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto auto",
                  alignItems: "center",
                  columnGap: "1rem",
                }}
              >
                <img src="https://img.icons8.com/?size=40&id=9905&format=png&color=198754" />
                <h6
                  onClick={() => handleStep(1)}
                  style={{ marginTop: "1vh" }}
                  className="text-success"
                >
                  INFORMACIÓN GENERAL
                </h6>
                <img src="https://img.icons8.com/?size=40&id=118835&format=png&color=198754" />
                <br />
                <img src="https://img.icons8.com/?size=40&id=9909&format=png&color=198754" />
                <h6
                  onClick={() => handleStep(2)}
                  style={{ marginTop: "1vh" }}
                  className="text-success"
                >
                  CONFIGURACIÓN TÉCNICA
                </h6>
                <img src="https://img.icons8.com/?size=40&id=118835&format=png&color=198754" />
                <br />
                <img src="https://img.icons8.com/?size=40&id=9901&format=png&color=198754" />
                <h6
                  onClick={() => handleStep(3)}
                  style={{ marginTop: "1vh" }}
                  className="text-success"
                >
                  OPERACIÓN Y MANTENIMIENTO
                </h6>
                <img src="https://img.icons8.com/?size=40&id=118835&format=png&color=198754" />
                <br />
                <img src="https://img.icons8.com/?size=40&id=9908&format=png&color=0dcaf0" />
                <h6
                  onClick={() => handleStep(4)}
                  style={{ marginTop: "1vh" }}
                  className="text-info"
                >
                  DETALLES FINANCIEROS
                </h6>
              </div>
            )}
          </Card.Body>
        </Card>

          <Card style={{ margin: "3vh" }}>
            {step === 1 && (
              <div>
                <Card.Header>
                  <h5>INFORMACIÓN GENERAL</h5>
                </Card.Header>
                <Card.Body>
                  <div style={{ display: "flex", gap: "10vh" }}>
                    <Form>
                      <Form.Group controlId="infoGeneral">
                        <Form.Label style={{ fontWeight: "bold" }}>
                          AGENCIA
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Agencia"
                          name="agencia"
                          value={formData.agencia}
                          onChange={handleChange}
                        />
                        <br />

                        <Form.Label style={{ fontWeight: "bold" }}>
                          ID AWS
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="ID AWS"
                          name="idLogin"
                          value={formData.idLogin}
                          onChange={handleChange}
                        />
                        <br />

                        <Form.Label style={{ fontWeight: "bold" }}>
                          CORREO
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Correo"
                          name="correo"
                          value={formData.correo}
                          onChange={handleChange}
                        />
                        <br />

                        <Form.Label style={{ fontWeight: "bold" }}>
                          REGIÓN
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Región"
                          name="region"
                          value={formData.region}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Form>

                    <Form>
                      <Form.Group controlId="infoGeneral">
                        <Form.Label style={{ fontWeight: "bold" }}>
                          ADMINISTRADOR
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Administrador"
                          name="administrador"
                          value={formData.administrador}
                          onChange={handleChange}
                        />
                        <br />

                        <Form.Label style={{ fontWeight: "bold" }}>
                          PROVEEDOR
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Proveedor"
                          name="proveedor"
                          value={formData.proveedor}
                          onChange={handleChange}
                        />
                        <br />

                        <Form.Label style={{ fontWeight: "bold" }}>
                          CLIENTE
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Cliente"
                          name="cliente"
                          value={formData.cliente}
                          onChange={handleChange}
                        />
                        <br />

                        <Form.Label style={{ fontWeight: "bold" }}>
                          BACKUP
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Server Backup"
                          name="serverBackup"
                          value={formData.serverBackup}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Form>
                  </div>
                </Card.Body>
              </div>
            )}

            {step === 2 && (
              <div>
                <Card.Header>
                  <h5>CONFIGURACIÓN TÉCNICA</h5>
                </Card.Header>
                <Card.Body>
                  <div style={{ display: "flex", gap: "10vh" }}>
                    <Form>
                      <Form.Group>
                        <Form.Label style={{ fontWeight: "bold" }}>
                          TIPO DE SERVICIO
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Tipo de Servicio"
                          name="tipoServicio"
                          value={formData.tipoServicio}
                          onChange={handleChange}
                        />
                        <br />

                        <Form.Label style={{ fontWeight: "bold" }}>
                          NOMBRE DEL SERVICIO
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Nombre del Servicio"
                          name="nombreServicio"
                          value={formData.nombreServicio}
                          onChange={handleChange}
                        />
                        <br />

                        <Form.Label style={{ fontWeight: "bold" }}>
                          TIPO DE INSTANCIA
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Tipo de Instancia"
                          name="tipoInstancia"
                          value={formData.tipoInstancia}
                          onChange={handleChange}
                        />
                        <br />

                        <Form.Label style={{ fontWeight: "bold" }}>
                          IP PÚBLICA
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="IP Pública"
                          name="ipPublica"
                          value={formData.ipPublica}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Form>

                    <Form>
                      <Form.Group>
                        <Form.Label style={{ fontWeight: "bold" }}>
                          SISTEMA OPERATIVO
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Sistema Operativo"
                          name="sistemaOperativo"
                          value={formData.sistemaOperativo}
                          onChange={handleChange}
                        />
                        <br />

                        <Form.Label style={{ fontWeight: "bold" }}>
                          CLAVE PEM
                        </Form.Label>
                        <Form.Control
                          type="file"
                          name="clavePEM"
                          onChange={handleFileChange}
                        />
                        <br />

                        <Form.Label style={{ fontWeight: "bold" }}>
                          VPC
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="vpc"
                          name="vpc"
                          value={formData.vpc}
                          onChange={handleChange}
                        />
                        <br />

                        <Form.Label style={{ fontWeight: "bold" }}>
                          SECURITY GROUP
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Security Group"
                          name="securityGroup"
                          value={formData.securityGroup}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Form>
                  </div>
                </Card.Body>
              </div>
            )}

            {step === 3 && (
              <div>
                <Card.Header>
                  <h5>OPERACIÓN Y MANTENIMIENTO</h5>
                </Card.Header>
                <Card.Body>
                  <div style={{ display: "flex", gap: "10vh" }}>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ fontWeight: "bold" }}>
                          UNIDAD
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Unidad"
                          name="unidad"
                          value={formData.unidad}
                          onChange={handleChange}
                        />
                        <br />

                        <Form.Label style={{ fontWeight: "bold" }}>
                          HERRAMIENTA
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Herramienta"
                          name="herramienta"
                          value={formData.herramienta}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Form>

                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ fontWeight: "bold" }}>
                          CREDENCIAL
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Credencial"
                          name="credencial"
                          value={formData.credencial}
                          onChange={handleChange}
                        />
                        <br />

                        <Form.Label style={{ fontWeight: "bold" }}>
                          FECHA DE CIERRE
                        </Form.Label>
                        <Form.Control
                          type="date"
                          name="cierre"
                          value={formData.cierre}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Form>
                  </div>
                  <Form.Label style={{ fontWeight: "bold" }}>OTROS</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Opcional"
                    name="otros"
                    value={formData.otros}
                    onChange={handleChange}
                  />
                </Card.Body>
              </div>
            )}

            {step === 4 && (
              <div>
                <Card.Header>
                  <h5>DETALLES FINANCIEROS</h5>
                </Card.Header>
                <Card.Body>
                  <div style={{ display: "flex", gap: "10vh" }}>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ fontWeight: "bold" }}>
                          COSTO MENSUAL (USD)
                        </Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Costo Mensual"
                          name="costoMensual"
                          value={formData.costoMensual}
                          onChange={handleChange}
                        />
                        <br />

                        <Form.Label style={{ fontWeight: "bold" }}>
                          OBSERVACIONES
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          placeholder="Opcional"
                          name="observaciones"
                          value={formData.observaciones}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Form>

                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ fontWeight: "bold" }}>
                          COSTO ANUAL (USD)
                        </Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Costo Anual"
                          name="costoAnual"
                          value={formData.costoAnual}
                          onChange={handleChange}
                          disabled
                        />
                        <br />

                        <Form.Label style={{ fontWeight: "bold" }}>
                          MÉTODO DE PAGO
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Método de Pago"
                          name="metodoPago"
                          value={formData.metodoPago}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Form>
                  </div>
                </Card.Body>
              </div>
            )}

            <Button
              variant="danger"
              style={{
                width: "fit-content",
                margin: "2vh",
                position: "relative",
              }}
              onClick={navigateToServers}
            >
              CANCELAR
            </Button>
            <div
              style={{
                position: "absolute",
                right: "0",
                bottom: "0",
                margin: "2vh",
              }}
            >
              {step > 1 && (
                <Button
                  variant="secondary"
                  onClick={handleBack}
                  style={{ margin: "0 2vh 0 0" }}
                >
                  Atras
                </Button>
              )}
              {step < 4 && <Button onClick={handleNext}>Siguiente</Button>}
              {step === 4 && (
                <Button variant="success" onClick={handleSubmit}>
                  GUARDAR
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
  );
};
