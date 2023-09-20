import { useState } from "react";
import PropTypes from "prop-types";

// components
import Modal from "../Modal/Modal";
import InputControl from "../InputControl/InputControl";

// styles
import styles from "./styles.module.css";

const genders = ["female", "male"];
const statuses = ["active", "inactive"];

function AddModal({ onSubmit, visible, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState(genders[0]);
  const [status, setStatus] = useState(statuses[0]);

  const onLocalSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email, gender, status });
    onClose();
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <div className="appear flex items-center justify-center h-full w-full">
        <form onSubmit={onLocalSubmit} className={styles.addModalForm}>
          <h2>Insertar nuevo usuario</h2>
          <InputControl
            id="name"
            value={name}
            label="Nombre de usuario"
            onChange={(e) => setName(e.target.value)}
            type="text"
            required
          />
          <InputControl
            id="email"
            value={email}
            label="Correo electrónico"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputControl
            id="gender"
            value={gender}
            label="Género"
            type="select"
            options={genders}
            onChange={(e) => setGender(e.target.value)}
          />
          <InputControl
            id="status"
            value={status}
            label="Estado"
            type="select"
            options={statuses}
            onChange={(e) => setStatus(e.target.value)}
          />
          <div className="flex w-full items-start justify-end">
            <button
              type="submit"
              name="save"
              className="secondary submit button"
              aria-label="click to save the added user"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

AddModal.propTypes = {
  onSubmit: PropTypes.func,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};

export default AddModal;
