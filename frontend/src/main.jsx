import React from 'react'
import {createRoot} from 'react-dom/client'
import './style.css'
import App from './App'

const container = document.getElementById('root')

const root = createRoot(container)

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <App/>,
//         children: [
//             {
//                 index: true,
//                 element: <Home/>,
//             },
//         ]
//     }
// ])

root.render(
    <React.StrictMode>
        <App/>
        {/*<RouterProvider router={router}/>*/}
    </React.StrictMode>
)
