import PropTypes from "prop-types";
import styles from "./Options.module.css";

const Options = ({ options, onLeaveFeedback, onReset, isResetVisible }) => {
  return (
    <div className={styles.options}>
      <div className={styles.buttons}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={styles.button}
            onClick={() => onLeaveFeedback(option)}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>
      {isResetVisible && (
        <button type="button" className={styles.resetButton} onClick={onReset}>
          Reset
        </button>
      )}
    </div>
  );
};

Options.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onLeaveFeedback: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  isResetVisible: PropTypes.bool.isRequired,
};

export default Options;
