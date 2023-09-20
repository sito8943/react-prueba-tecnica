import { useMemo } from "react";
import PropTypes from "prop-types";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

// styles
import "./styles.css";

function User({ id, name, gender, email, status, onEdit, onDelete }) {
  const showStatus = useMemo(() => {
    switch (status) {
      case "inactive":
        return <div className="dot bg-error" />;
      default: // active
        return <div className="dot bg-success" />;
    }
  }, [status]);

  return (
    <article
      name="edit-user"
      aria-label="click to edit"
      onClick={() => onEdit(id)}
      className={`user ${gender} `}
    >
      <button
        name="delete-user"
        onClick={() => onDelete(id)}
        aria-label="click to delete this user"
        className="absolute top-1 right-1 rounded-full w-8 h-8 cursor-default text-error hover:bg-primary"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <div className="flex items-center gap-3">
        {showStatus}
        <div>
          <p className="font-bold">{name}</p>
          <p className="text-sm">{email}</p>
        </div>
      </div>
    </article>
  );
}

User.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  gender: PropTypes.string,
  email: PropTypes.string,
  status: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default User;
