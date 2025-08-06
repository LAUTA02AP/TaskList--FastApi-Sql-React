import { BrowserRouter,Routes,Route} from "react-router-dom"  
{/* route/s significa qeu puede crear una o muchas paginas */}
import Homepage from "./pages/Homepage"
import TaskForm from "./pages/TaskForm"

import Navbar from "./components/Navbar";

function App() {

  return(
    <BrowserRouter>  {/* Esto debe englobar barias paginas*/}
      <div className="container mx-auto px-10">
        <Navbar/>
         <Routes>{/* Esto permite crear barias paginas*/}
      {/* cuadno vidsite la ruta inicial muestre un elemento */}
          <Route path = "/" element = {<Homepage/>}/>
          <Route path = "/tasks/:id" element = {<TaskForm/>}/>
          <Route path = "/tasks/new" element = {<TaskForm/>}/>
        </Routes>

      </div>
  
  
    </BrowserRouter>
  
  );
}
export default App
