// components/FeedbackSections.js
const FeedbackSection = ({ feedback }) => {
    return (
      <div>
        {feedback.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    );
  };

  export default FeedbackSection;
