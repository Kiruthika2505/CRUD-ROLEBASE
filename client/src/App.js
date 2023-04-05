import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import { Dashboard } from './Components/Admin_dash';
import { Employer_dash } from './Components/Employer_dash';
import { User_dash } from './Components/User_dash';
import { Update } from './Components/update';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signin/>}/>
      <Route path="/Signup" element={<Signup />}/>
      <Route path="/Update/:id" element={<Update/>}/>
      <Route path="/Admin_dash" element={<Dashboard/>}/>
      <Route path="/Employer_dash" element={<Employer_dash/>}/>
      <Route path="/User_dash" element={<User_dash/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
