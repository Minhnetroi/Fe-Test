import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/layout"
import Home from "./pages/home"
import Dashboard from "./pages/dashboard"
import Contact from "./pages/contact"
import Detail from "./pages/detail"
import "./index.css"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';



function App() {

  const router = createBrowserRouter([
    {
      path:"/",
      element: <div><Layout /></div>,
      children: [
        {
          path:"/",
          element: <Home />
        },
        {
          path:"/dashboard",
          element: <Dashboard />
        },
        {
          path:"/contact",
          element: <Contact/>
        },
        {
          path:"/detail/:id",
          element: <Detail/>
        },
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
