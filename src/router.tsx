import { createBrowserRouter } from 'react-router'
import AppShell from './components/shell/AppShell'
import CataloguePage from './routes/CataloguePage'
import CategoryPage from './routes/CategoryPage'
import TemplatePage from './routes/TemplatePage'

// Toutes les routes partagent le layout AppShell (rendu via <Outlet />).
export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <CataloguePage /> },
      { path: 'category/:catId', element: <CategoryPage /> },
      { path: 'template/:catId/:tplId', element: <TemplatePage /> },
    ],
  },
])
