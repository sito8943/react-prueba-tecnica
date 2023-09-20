import { useMemo, useState, useEffect, useCallback } from "react";
import loadable from "@loadable/component";

// font awesome
import { faAdd } from "@fortawesome/free-solid-svg-icons";

// services
import {
  list as userList,
  add as addUser,
  remove as removeUser,
} from "../../services/users";

// contexts
import { useNotification } from "../../contexts/NotificationProvider";

// components
import Loading from "../../components/Loading/Loading";

// lazies
const User = loadable(() => import("../../components/User/User"));
const ConfirmationModal = loadable(() =>
  import("../../components/ConfirmationModal/ConfirmationModal")
);
const AddModal = loadable(() => import("../../components/AddModal/AddModal"));
const FloatingButton = loadable(() =>
  import("../../components/FloatingButton/FloatingButton")
);

// styles
import "./styles.css";

function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [countOfInserts, setCountOfInserts] = useState(0);
  const [countOfDeletes, setCountOfDeletes] = useState(0);

  const { setNotificationState } = useNotification();

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await userList();
      setUsers(response);
    } catch (err) {
      console.error(err);
      setNotificationState({
        type: "set",
        ntype: "error",
        message: String(err),
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onEditUser = useCallback(async () => {
    // TODO
  }, [users]);

  const onDeleteUser = useCallback(
    async (id) => {
      setLoading(true);
      try {
        await removeUser(id);
        setCountOfDeletes((countOfDeletes) => countOfDeletes + 1);
        setNotificationState({
          type: "set",
          ntype: "success",
          message: "Eliminado correctamente",
        });
        const newUsers = [...users];
        newUsers.splice(
          newUsers.findIndex((user) => user.id === id),
          1
        );
        setUsers(newUsers);
      } catch (err) {
        console.error(err);
        setNotificationState({
          type: "set",
          ntype: "error",
          message: String(err),
        });
      }
      setLoading(false);
    },
    [users]
  );

  const printData = useMemo(() => {
    return users.map((user) => (
      <li key={user.id}>
        <User {...user} onEdit={onEditUser} onDelete={onDeleteUser} />
      </li>
    ));
  }, [users, onEditUser, onDeleteUser]);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const onAddUser = async (data) => {
    setLoading(true);
    try {
      const response = await addUser(data);
      setUsers([...users, response]);
      setCountOfInserts((countOfInserts) => countOfInserts + 1);
      // setUsers();
      setNotificationState({
        type: "set",
        ntype: "success",
        message: "Guardado correctamente",
      });
    } catch (err) {
      console.error(err);
      setNotificationState({
        type: "set",
        ntype: "error",
        message: String(err),
      });
    }
    setLoading(false);
  };

  return (
    <main className="relative">
      <ConfirmationModal
        onAccept={() => {}}
        visible={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
      />
      <AddModal
        onSubmit={onAddUser}
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
      {loading ? (
        <Loading className="absolute top-0 left-0 w-full h-screen bg-white z-50" />
      ) : null}
      {!error.length ? (
        <section className="home">
          <h1>Lista de usuarios</h1>
          <div className="flex flex-col">
            <p className="text-sm">Cantidad de inserciones {countOfInserts}</p>
            <p className="text-sm">
              Cantidad de eliminaciones {countOfDeletes}
            </p>
            <p className="font-bold">
              Total de operaciones: {countOfDeletes + countOfInserts}
            </p>
          </div>
          <ul className="flex flex-wrap items-start justify-start gap-2 w-full">
            {printData}
          </ul>
        </section>
      ) : null}
      <FloatingButton
        onClick={() => setShowAddModal(true)}
        name="add-user"
        icon={faAdd}
        className="text-white cursor-default"
        ariaLabel="click to add user"
      />
    </main>
  );
}

export default Home;
