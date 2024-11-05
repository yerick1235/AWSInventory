import React from "react";
import { Form } from "react-bootstrap";

export const Mails = () => {
  return (
    <div style={{ margin: "3vh" }}>
      <Form.Control type="text" placeholder="Buscar..." size="sm" />

      <Form.Check
        type="checkbox"
        id="selectAllMails"
        label="Seleccionar todos"
        className="text-white"
        style={{ margin: "2vh 0 2vh 0" }}
      />

      <div>
        
      </div>
    </div>
  );
};
