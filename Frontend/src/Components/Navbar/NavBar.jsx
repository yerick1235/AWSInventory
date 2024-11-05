import React, { useEffect, useState } from "react";
import { Navbar, Container, Button, Nav } from "react-bootstrap";
import LOGO from "../../Assets/LOGO.png";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../Navbar/NavBar.css";

export const NavbarComponent = () => {
  const [userRole, setUserRole] = useState(null);

  const navigate = useNavigate();
  const navigateToServers = () => {
    navigate("/servers");
  };
  const navigateToReports = () => {
    navigate("/reports");
  };
  const navigateToUsers = () => {
    if (userRole === "ADMIN") {
      navigate("/users");
    } else {
      toast.error("Usuario Inválido", { duration: 1300 });
    }
  };
  const navigateToMails = ()=>{
    navigate("/mails");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return console.log("Usuario no Logeado");
    }
    try {
      const claims = atob(token.split(".")[1]);
      const role = JSON.parse(claims).role;
      if (role) {
        setUserRole(role);
      }
    } catch (error) {
      console.error("Error al obtener Token", error);
    }
  }, []);

  return (
    <Navbar style={{ width: "100%", position:'fixed', top:'0', zIndex:'1'}} className="bg-dark" variant="dark">
      <img
        style={{ position: "absolute", width: "11vh" }}
        src="https://portal.wol.group/firmas/odd/esfera.gif"
      />
      <Navbar.Brand style={{ marginLeft: "12vh", display: "flex" }}>
        <img style={{ width: "15vh" }} src={LOGO} />
      </Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link onClick={navigateToServers}>SERVIDORES</Nav.Link>
        <Nav.Link onClick={navigateToReports}>REPORTES</Nav.Link>
        <Nav.Link onClick={navigateToUsers}>USUARIOS</Nav.Link>
        <Nav.Link onClick={navigateToMails}>CORREOS</Nav.Link>
      </Nav>
    </Navbar>
  );
};
