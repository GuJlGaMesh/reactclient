import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUsers,
  getCreatedUser,
  getUpdatedUser,
  getDeletedUser,
  getMetricsValue,
  getHistogram,
} from "./app/api";

// Styles
import "./app.scss";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import DataTable from "./components/DataTable";
import CreateUser from "./components/CreateUser";
import UpdateUser from "./components/UpdateUser";
import DeleteUser from "./components/DeleteUser";
import Modal from "./components/Modal";
import Loader from "./components/Loader";
import RollingRetention from "./components/RollingRetention";
import Pagination from "./components/Pagination";
import MySwal from "./index";

function App() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const metric = useSelector(state => state.metric);
  const histogram = useSelector(state => state.histogram);
  const [metricVisibility, setVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUser, setCurrentUser] = useState({
    id: null,
    lastActivityDate:new Date(),
    registrationDate:new Date(),
    userId: ""
  });
  const [activeModal, setActiveModal] = useState({ name: "", active: false });
  const [savedUsers, setSavedUsers] = useState(users);
  const [calculatedMetric, setCalculatedMetric] = useState(metric);
  const [histogramData, setHistogram] = useState(histogram);

  const usersLastIndex = currentPage * pageSize;
  const usersFirstIndex = usersLastIndex - pageSize;
  const currentUsers = users.slice(usersFirstIndex, usersLastIndex);

// const setVisibility = visible =>
// {
//   this.metricVisibility = visible;
// }

  // Setting up Modal
  const setModal = modal => {
    setActiveModal({ name: modal, active: true });
  };
  const paginate = page => {
    setCurrentPage(page);
  };
  const getHistogramData =async () =>
  {
    await getHistogram().then(({ data }) => {
      setHistogram(data);
      dispatch({ type: "SET_HISTOGRAM", data: data });
    });
  }

  const getMetric =async () =>
  {
    await getMetricsValue().then(res =>
      {
       setCalculatedMetric(res.data)
      })
  }

  // Create User
  const createUser = async user => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getCreatedUser(user).then(res => {
        const result = res.data;
        MySwal.fire({
          icon: "success",
          title: "User created successfully."
        }).then(() => {
          dispatch({ type: "CREATE_USER", data: result });
          setSavedUsers([...users, result]);
          setCurrentPage(1);
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to create user."
      });
    } finally {
      setLoading(false);
    }
  };

  // Update User
  const updateRow = metricData => {
    setModal("Update User");

    setCurrentUser({
      id: metricData.id,
      lastActivityDate: metricData.lastActivityDate,
      registrationDate: metricData.registrationDate,
      userId: metricData.userId
    });
  };

  const updateUser = async (id, updatedUser) => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getUpdatedUser(id, updatedUser).then(res => {
        const result = res.data;
        MySwal.fire({
          icon: "success",
          title: "User updated successfully."
        });
        // .then(() => {
        //   dispatch({
        //     type: "SET_USERS",
        //     data: users.map(user =>
        //       user.id === id ? Object.assign(user, result) : user
        //     )
        //   });
          setCurrentPage(1);
        })
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to update user. May be not unique userId."
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete User
  const deleteRow = user => {
    setModal("Delete User");

    setCurrentUser({
      id: user.id,
      avatar: user.avatar,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    });
  };

  const deleteUser = async id => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getDeletedUser(id).then(() => {
        MySwal.fire({
          icon: "success",
          title: "User deleted successfully."
        }).then(() => {
          dispatch({
            type: "SET_USERS",
            data: users.filter(user => user.id !== id)
          });
          setSavedUsers(savedUsers.filter(user => user.id !== id));
          setCurrentPage(1);
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to delete user."
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch Users
  const fetchUsers = async () => {
    setLoading(true);

    try {
      await getUsers().then(({ data }) => {
        setSavedUsers(data);
        dispatch({ type: "SET_USERS", data: data });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to fetch users."
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchUsers();
    getMetric();
    getHistogramData();
  }, []);

  return (
    <div className="app">
      <Header />
      <main className="content">
        <div className="container">
          {loading ? (
            <Loader />
          ) : (
            <div className="content-wrapper">
              <div className="toolbar">
                <button
                  className="primary-btn"
                  onClick={() => setModal("Create User")}
                >
                  Create New User
                </button>
              </div>
              // plain html with styles
              <DataTable
                users={currentUsers}
                updateRow={updateRow}
                deleteRow={deleteRow}
              />
               <Pagination
                totalResults={users.length}
                currentPage={currentPage}
                pageSize={pageSize}
                paginate={paginate}
              />
            </div>
          )}
          <button className="primary-btn" onClick={() => setVisibility(!metricVisibility)}>
          Calculate
          </button>
          <RollingRetention visible={metricVisibility} metric={calculatedMetric} histogramData = {histogramData} />
        </div>
      </main>
      {activeModal.active && (
        <Modal activeModal={activeModal}>
          {activeModal.name === "Create User" && (
            <CreateUser
              createUser={createUser}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "Update User" && (
            <UpdateUser
              currentUser={currentUser}
              updateUser={updateUser}
              setActiveModal={setActiveModal}
              afterUpdate={fetchUsers}
            />
          )}
          {activeModal.name === "Delete User" && (
            <DeleteUser
              currentUser={currentUser}
              deleteUser={deleteUser}
              setActiveModal={setActiveModal}
            />
          )}
        </Modal>
      )}
      <Footer />
    </div>
  );
}

export default App;
