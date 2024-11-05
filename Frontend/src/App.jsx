import { routes } from './routes.jsx'
import { useLocation, useRoutes } from 'react-router-dom'
import { Workspace } from './Components/Workspace/Workspace.jsx'
import { NavbarComponent } from './Components/Navbar/NavBar.jsx'

export const App = () => {
  const element = useRoutes(routes)
  const location = useLocation()
  const registeredRoutes = ['/servers', '/regist', '/reports', '/users','/mails']
  //const isLoginPage = location.pathname ==='/' || '*'

  const isEditPageWithId = location.pathname.startsWith('/edit/') && location.pathname !== '/edit'
  const isLoginPage = !registeredRoutes.includes(location.pathname) && !isEditPageWithId

  if (isLoginPage) {
    return (
      <div style={{ display: 'flex' }}>
        <div>
          {element}
        </div>
      </div>
    )
  } else {
    return (
      <div style={{ display: 'flex' }}>
        <NavbarComponent/>
        <Workspace>
          <div>
            {element}
          </div>
        </Workspace>
      </div>
    )
  }
}


export default App
