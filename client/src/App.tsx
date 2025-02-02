import './App.css'
import {RouterProvider} from "react-router-dom";
import {AppRouter} from "@/config/router.tsx";

function App() {
    return (
        <>
            <RouterProvider router={AppRouter}/>
        </>
    )
}

export default App
