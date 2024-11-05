import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "react-bootstrap";

const apiClient = axios.create({
  baseURL: "http://localhost:2880",
  //# AL momento de Montar el server cambiar baseURL a:
  // baseURL: "http://ip_del_servidor:2880"
  // ejemplo en Servidor: "http://10.10.2.76:2880"
  // Testear en Local: 'http://localhost:2880'
  timeout: 5000
});

//# token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

//# Interceptor Para Manejar Token Expirado
apiClient.interceptors.response.use(
  (response)=> response, (error)=>{
    if(error.response && error.response.status === 401){
      return toast((t) => (
        <div>
          <span className="text-danger" style={{fontWeight:'bold'}}>Tu sesión ha expirado</span>
          <br />
          <span>Por favor, inicia sesión nuevamente</span>
          <br />
          <Button href="/" size="sm" style={{marginTop:'1vh'}}>Regresar al Login</Button>
        </div>
      ));
    }
    return Promise.reject(error)
  }
)

//# ----- List Servers -----
export const listServers = async () => {
  try {
    return await apiClient.get("/server/list");
  } catch (err) {
    console.error("Error Fetching data, ", err);
    throw err;
  }
};

//# ----- Regist Server -----
export const registServer = async (data) => {
  try {
    return await apiClient.post("/server/add", data);
  } catch (err) {
    console.error("Error Registering data, ", err);
    throw err;
  }
};

//# ----- List Server By ID -----
export const listById = async (serversId) => {
  try {
    return await apiClient.get(`/server/listById/${serversId}`);
  } catch (err) {
    console.error("Error Fetching Data, ", err);
    throw err;
  }
};

//# ----- Edit Server Info -----
export const updateServer = async (serversId, data) => {
  try {
    return await apiClient.put(`/server/update/${serversId}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (err) {
    console.error("Error Updating Server, ", err);
    throw err;
  }
};

//# ----- Delete Server -----
export const deleteServer = async (servidorId) => {
  try {
    return await apiClient.delete(`/server/delete/${servidorId}`);
  } catch (err) {
    console.error("Error Deleting Server, ", err);
    throw err;
  }
};

//# ----- Generate Report -----
export const generateReport = async (data) => {
  try {
    return await apiClient.post("/server/excel", data, {
      responseType: "arraybuffer", //Mandar archivos
    });
  } catch (err) {
    console.error("Error Generating Report, ", err);
    throw err;
  }
};

//# ----- Login -----
export const loginRequest = async (user) => {
  try {
    const response = await apiClient.post("/user/login", user);
    return { data: response.data };
  } catch (err) {
    console.error("Invalid Credentials, Pleasy Try Again", err);
    throw err;
  }
};

//# ----- List Users -----
export const listUsers = async () => {
  try {
    return await apiClient.get("/user/list");
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//# ----- Update User -----
export const updateUser = async (userId, data) => {
  try {
    return await apiClient.put(`/user/edit/${userId}`, data);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//# ----- List User By ID -----
export const listUserByID = async (userId) => {
  try {
    return await apiClient.get(`/user/list/${userId}`);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//# ----- Regist User -----
export const registUser = async (data) => {
  try {
    return await apiClient.post("/user/regist", data);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//# ----- Delete User -----
export const deleteUser = async (userId) => {
  try {
    return await apiClient.delete(`/user/delete/${userId}`);
  } catch (err) {
    console.error(err);
    throw err;
  }
};


//# ----- Download Pem -----
export const downloadPEM = async (servidorId)=>{
  try {
    return await apiClient.get(`/server/download/${servidorId}`)
  }catch (err){
    console.error(err);
    throw err;
  }
}