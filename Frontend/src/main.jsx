import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider, Route, createBrowserRouter} from 'react-router-dom'
import Formm from './components/Formm.jsx'
import Content from './components/Content.jsx'
import CodeForces from './components/CodeForces.jsx'
import Codechef from './components/Codechef.jsx'
import Leetcode from './components/Leetcode.jsx'


const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  children: [{
    path: '/',
    element: <Formm />
  },
  {
    path: 'cp',
    element: <Content />,
    children: [{
      path : 'codeforces',
      element: <CodeForces />
    },
    {
      path: 'codechef',
      element: <Codechef />
    },
    {
      path: 'leetcode',
      element: <Leetcode />
    }
  ]
  }],
  
}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    {/* <div> */}
    <RouterProvider router={router}/>
    {/* </div> */}
   </React.StrictMode>,
)
