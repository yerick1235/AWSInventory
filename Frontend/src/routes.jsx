import { ProtectedRoute } from "./Components/Protected/ProtectedRoute";
import { EditServer } from "./Pages/EditServer/EditServer";
import { Login } from "./Pages/Login/Login";
import { RegistServer } from "./Pages/RegistServer/RegistServer";
import { Reports } from "./Pages/Reports/Reports";
import { Servers } from "./Pages/Servers/Servers";
import { Users } from "./Pages/Users/Users";
import { Mails } from "./Pages/Mails/Mails";

export const routes = [
  { path: "", element: <Login /> },
  { path: "*", element: <Login /> },
  {
    path: "servers",
    element: (
      <ProtectedRoute element={<Servers />} allowedRoles={["ADMIN", "USER"]} />
    ),
  },
  {
    path: "regist",
    element: (
      <ProtectedRoute element={<RegistServer />} allowedRoles={["ADMIN"]} />
    ),
  },
  {
    path: "edit/:serversId",
    element: (
      <ProtectedRoute element={<EditServer />} allowedRoles={["ADMIN"]} />
    ),
  },
  {
    path: "reports",
    element: (
      <ProtectedRoute element={<Reports />} allowedRoles={["ADMIN", "USER"]} />
    ),
  },
  {
    path: "users",
    element: <ProtectedRoute element={<Users />} allowedRoles={["ADMIN"]} />,
  },
  {
    path: "mails",
    element: <ProtectedRoute element={<Mails />} allowedRoles={["ADMIN"]} />,
  }
];
