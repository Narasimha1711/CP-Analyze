import { useState, use } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Form from './components/Formm'
// import { submit } from './components/Formm'
import { Outlet } from 'react-router-dom'
import Context, { contextData } from './components/Context';

function App() {
  const [count, setCount] = useState(0);
  const [isLogin, setisLogin] = useState(false);
  const [formData, setFormData] = useState();
  

  return (
    <>

    <Context>
      <Outlet />
      </Context>


      {/* <Form action={submit}/> */}
    </>
  )
}

export default App
