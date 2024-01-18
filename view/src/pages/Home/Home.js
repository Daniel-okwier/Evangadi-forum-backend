import { useContext, useEffect, useState } from "react";
import PageviewRoundedIcon from "@mui/icons-material/PageviewRounded";
import axiosBase from "../../components/axios";
import { AppState } from "../../App";
import QuestionDetail from "../Questions/QuestionDetail";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const { user } = useContext(AppState);
  const [question, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [Filter, setFilter] = useState([]);
  const navigate = useNavigate();

  // console.log(Filter)
  // console.log(questions);
  // console.log(userData);
  const token = localStorage.getItem("token");
  const axios = axiosBase();
  const handleclick = () => {
    navigate("/askquestion");
  };

  useEffect(() => {
    laosQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.username]);

  //all questions load here
  const laosQuestions = async () => {
    try {
      const data = await axios.get("/questions/all-questions", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setQuestions(data?.data?.allQuestion);
    } catch (error) {
      console.log(error.response);
    }
  };

  // laosQuestions()
  useEffect(() => {
    setFilter(
      question.filter((q) =>
        q.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, question]);
  return (
    <section className="container home-abrsh">
      <div className="heros">
        <div className=" row">
          <div className="col-sm-6 col-md-6">
            <button className="blue_button" onClick={handleclick}>
              AskQuestions
            </button>
          </div>

          <div className="col-sm-6  col-md-6">
            <h2>
              WellCome :<span className="user">{user.username}</span>
            </h2>
          </div>
        </div>
      </div>

      <div>
        <div className="search_bar">
          <input
            type="text"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="search...."
          />
          <PageviewRoundedIcon className="search_icon" />
        </div>
      </div>

      <div>
        <div>
          {Filter.map((quest, i) => (
            <QuestionDetail question={quest} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
