import React from "react";
import PropTypes from "prop-types";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FloatingButton({ onClick, className, ariaLabel, name, icon }) {
  return (
    <button
      type="button"
      className={`fixed bottom-1 right-1 rounded-full w-10 h-10 bg-primary transition hover:bg-pdark ${className} `}
      onClick={onClick}
      name={name}
      aria-label={ariaLabel}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}

FloatingButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
  name: PropTypes.string,
};

export default FloatingButton;
