import { useState, useEffect } from "react";
import styles from "./App.module.css";
import Description from "../Description/Description";
import Options from "../Options/Options";
import Feedback from "../Feedback/Feedback";
import Notification from "../Notification/Notification";

// class App extends Component {
//   state = {
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   };

//   onLeaveFeedback = (feedbackType) => {
//     this.setState((prevState) => ({
//       [feedbackType]: prevState[feedbackType] + 1,
//     }));
//   };

//   countTotalFeedback = () => {
//     const { good, neutral, bad } = this.state;
//     return good + neutral + bad;
//   };

//   countPositiveFeedbackPercentage = () => {
//     const total = this.countTotalFeedback();
//     const { good } = this.state;
//     return Math.round((good / total) * 100) || 0;
//   };

//   resetFeedback = () => {
//     this.setState({ good: 0, neutral: 0, bad: 0 });
//   };

//   render() {
//     const { good, neutral, bad } = this.state;
//     const totalFeedback = this.countTotalFeedback();
//     const positivePercentage = this.countPositiveFeedbackPercentage();

//     return (
//       <div className={styles.Container}>
//         <Description />
//         <Options
//           options={Object.keys(this.state)}
//           onLeaveFeedback={this.onLeaveFeedback}
//           onReset={this.resetFeedback}
//           isResetVisible={totalFeedback > 0}
//         />
//         {totalFeedback > 0 ? (
//           <Feedback
//             good={good}
//             neutral={neutral}
//             bad={bad}
//             total={totalFeedback}
//             positivePercentage={positivePercentage}
//           />
//         ) : (
//           <p className={styles.Notification}>There is no feedback yet.</p>
//         )}
//       </div>
//     );
//   }
// }

// export default App;

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  // Ініціалізація стану з localStorage
  useEffect(() => {
    const storedFeedback = localStorage.getItem("feedback");
    if (storedFeedback) {
      setFeedback(JSON.parse(storedFeedback));
    }
  }, []);

  // Зберігання стану в localStorage
  useEffect(() => {
    localStorage.setItem("feedback", JSON.stringify(feedback));
  }, [feedback]);

  const onLeaveFeedback = (type) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [type]: prevFeedback[type] + 1,
    }));
  };

  const resetFeedback = () => {
    setFeedback({ good: 0, neutral: 0, bad: 0 });
  };

  const countTotalFeedback = () => {
    return Object.values(feedback).reduce((total, value) => total + value, 0);
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return total > 0 ? Math.round((feedback.good / total) * 100) : 0;
  };

  const totalFeedback = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <div className={styles.Container}>
      <Description />
      <Options
        options={Object.keys(feedback)}
        onLeaveFeedback={onLeaveFeedback}
        onReset={resetFeedback}
        isResetVisible={totalFeedback > 0}
      />
      {totalFeedback > 0 ? (
        <Feedback
          good={feedback.good}
          neutral={feedback.neutral}
          bad={feedback.bad}
          total={totalFeedback}
          positivePercentage={positivePercentage}
        />
      ) : (
        <Notification message="There is no feedback yet." />
      )}
    </div>
  );
};

export default App;
