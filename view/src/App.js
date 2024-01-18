import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState, createContext } from "react";
import axios from "./components/axiosConfig";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Footer from "./pages/Footer/Footer";
import Header from "./pages/Header";
import Home from "./pages/Home/Home";
import NewQuestion from "./pages/Questions/NewQuestion";
import Answer from "./pages/Answers/Answer";
export const AppState = createContext();
function App() {
  const [user, setUser] = useState([]);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const checkUser = async () => {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUser(data);
      // console.log(data);
    } catch (error) {
      navigate("/");
      return error.response;
    }
  };

  useEffect(() => {
    checkUser();
  }, [token]);
  return (
    <AppState.Provider value={{ user, setUser }}>
      <Routes>
        <Route
          path="/askquestion"
          element={
            <>
              <Header />
              <NewQuestion />
              <Footer />
            </>
          }
        />

        <Route
          path="/Answer/:questionid"
          element={
            <>
              <Header />
              <Answer />
              <Footer />
            </>
          }
        />
        <Route
          path="/home"
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />
        <Route path="/ab" element={<About />} />
        <Route
          path="/"
          element={
            <>
              <Header />
              <SignUp />
              <Footer />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Header />
              <SignIn />
              <Footer />
            </>
          }
        />
      </Routes>
    </AppState.Provider>
  );
}

export default App;
