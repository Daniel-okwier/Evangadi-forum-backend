import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axiosBase from "../../components/axios";
import AnswerDetail from "./AnswerDetail";
import "./Answer.css";

const Answer = () => {
  const [form, setForm] = useState({});
  const [answer, setAnswer] = useState([]);
  const [question, setQuestions] = useState([]);
  const { questionid } = useParams();

  const token = localStorage.getItem("token");
  const axios = axiosBase();

  //handle change value
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `answers/postanswer/${questionid}`,
        form,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      alert(data.msg);
      e.target.reset();
    } catch (error) {
      console.log(error.response);
    }
  };

  //loadanswers
  const loadanswers = async () => {
    try {
      const { data } = await axios.get(`/answers/allanswer/${questionid}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setAnswer(data.answer);
      // console.log(data);
      // console.log({ questionid });
    } catch (error) {
      console.log(error.response);
    }
  };

  //loadQuestions
  const loadQuetions = async () => {
    try {
      const { data } = await axios.get(`questions/question/${questionid}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setQuestions(data);
      // console.log(data)
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    loadanswers();
    loadQuetions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);
  return (
    <div className="container">
      <br />
      <br />
      <br />
      <br />
      <div className="titl">
        <h2 className="title">Questions</h2>

        <div className="question_titles">
          {question ? question.title : "newTitle"}
        </div>

        <div className="question_disc">
          {question ? question.description : "newdiscription"}
        </div>

        <h2 className="community_title">Answer From The Community</h2>
        <div>
          {answer.map((answe, i) => (
            <AnswerDetail answers={answe} key={i} />
          ))}
        </div>
      </div>
      <div className="container">
        <form method="post" onSubmit={handleSubmit}>
          <div>
            <textarea
              style={{
                marginTop: "15px",
                height: "150px",
                width: "100%",
                borderRadius: "10px",
                padding: "10px 15px",
              }}
              maxLength="200"
              type="text"
              name="answer"
              placeholder="Your Answer . . . "
              onChange={handleChange}
            />
          </div>
          <div className="btn btn_answer">
            <button type="submit">Post Answer</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Answer;
