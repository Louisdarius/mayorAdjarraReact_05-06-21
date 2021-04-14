import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  viewUsers,
  deleteUser,
  viewUserProfile,
} from '../../services/usersServives';
import { confirmAlert } from 'react-confirm-alert';
import { Form, Formik } from 'formik';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function ViewUers(props) {
  const [users, setUsers] = useState([]);
  const [userRole, setUserRole] = useState({});
  const [filter, setFilter] = useState(props.location.URLSearchParams);

  useEffect(() => {
    async function getData() {
      const filter = props.location.search;
      viewUsers(filter)
        .then((response) => {
          setUsers(response.data.users);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getData();
    getProfile();
  }, [props.location.search]);

  async function getProfile() {
    viewUserProfile()
      .then((response) => {
        setUserRole(response.data.user.role._id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSubmit(values) {
    props.history.push(`/users?filter=${values.filter}`);
    window.location.reload();
  }

  async function deleteData(id) {
    confirmAlert({
      title: 'Delete',
      message: 'Are you sure you want to delete this.',
      buttons: [
        {
          label: 'Confirm',
          onClick: () => {
            deleteUser(id)
              .then((response) => {
                window.location.reload();
              })
              .catch((error) => {
                console.log(error);
              });
          },
        },
        {
          label: 'No',
          //onClick: () => alert('Click No'),
        },
      ],
    });
  }

  return (
    <div className="content-wrapper">
      <div>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6"></div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <div className="row">
                      <div className="col-4">
                        <Link to="/user/register" className="btn btn-info mr-2">
                          Add New User
                        </Link>
                      </div>
                      <div className="col-8 search-side">
                        <Formik
                          onSubmit={handleSubmit}
                          initialValues={{
                            filter: filter || '',
                          }}
                          enableReinitialize={true}
                        >
                          <Form className="searchForm">
                            <input
                              type="text"
                              name="filter"
                              id="filter"
                              placeholder="Search patient..."
                              className="input"
                              value={filter}
                              onChange={(e) => setFilter(e.target.value)}
                            />
                            <button className="submit" type="submit">
                              Search
                            </button>

                            <Link
                              className="clear"
                              to="/users"
                              onClick={() => {
                                window.location.href = `users`;
                              }}
                            >
                              Clear Filter
                            </Link>
                          </Form>
                        </Formik>
                      </div>
                    </div>
                  </div>

                  {/* /.card-header */}
                  <div className="card-body">
                    <table
                      id="example2"
                      className="table table-bordered table-hover"
                    >
                      <thead className="headerTable">
                        <tr>
                          <th>Full Name</th>
                          <th>Email</th>
                          <th>Gender</th>
                          <th>Tel</th>
                          <th>Role</th>
                          <th>Status</th>
                          <th colSpan="3" className="col-span">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user._id}>
                            <td>{user.firstName + ' ' + user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.gender}</td>
                            <td>{user.tel}</td>
                            <td>{user.role.name}</td>
                            <td>{user.status}</td>
                            <td>
                              <Link
                                className="btn btn-primary mr-2"
                                to={`/user/${user._id}/edit`}
                              >
                                Edit
                              </Link>
                            </td>
                            {userRole === '6027daf9b6edc45418dff4db' ? (
                              <>
                                <td>
                                  <button
                                    type="button"
                                    onClick={() => deleteData(user._id)}
                                    className="btn btn-danger mr-2 disabled-link"
                                  >
                                    Delete
                                  </button>
                                </td>
                                <td>
                                  <Link
                                    className="btn btn-info mr-2"
                                    to={`/user/userpasswordchange/${user._id}/passwordchange`}
                                  >
                                    Password
                                  </Link>
                                </td>
                              </>
                            ) : null}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
                {/* /.card */}
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
    </div>
  );
}
