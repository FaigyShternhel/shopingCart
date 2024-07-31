import "./App.css";
import { HomePage } from "./Components/Pages/index";
import { Provider } from "react-redux";
import { store } from "../src/Redux/store";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginForm } from "./Components/Login";
import SignupForm from "./Components/Signup/Signup";

function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/signup" element={<SignupForm/>} />
            <Route path="/homePage" element={<HomePage />} />
            <Route path="/" element={<LoginForm />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;