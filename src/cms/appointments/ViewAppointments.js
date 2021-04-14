import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import moment from 'moment';
import {
  viewAppointments,
  deleteAppointment,
} from '../../services/appointmentsServives';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function ViewUers(props) {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');
  const [status, setStatus] = useState('');
  const [meetingPref, setMeetingPref] = useState('');

  useEffect(() => {
    async function getData() {
      const filter = props.location.search;
      viewAppointments(filter)
        .then((response) => {
          setUsers(response.data.appointments);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getData();
  }, [props.location.search]);

  function handleSubmit(values) {
    props.history.push(
      `/appointments?filter=${values.filter}&status=${values.status}`
    );
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
            deleteAppointment(id)
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
                      <div className="col-3">
                        <h3 className="card-title">
                          <Link
                            to="/appointment/add"
                            className="btn btn-info mr-2"
                          >
                            Add Appointment
                          </Link>
                        </h3>
                      </div>
                      <div className="col-9 search-side">
                        <Formik
                          onSubmit={handleSubmit}
                          initialValues={{
                            filter: filter || '',
                            status: status || '',
                          }}
                          enableReinitialize={true}
                        >
                          <Form className="searchForm">
                            <select
                              className="input"
                              name="status"
                              value={status}
                              onChange={(e) => setStatus(e.target.value)}
                            >
                              <option value="">All</option>
                              <option value="pending">pending</option>
                              <option value="disapproved">disapproved</option>
                              <option value="approved">approved</option>
                            </select>
                            {/*input
                              type="text"
                              name="filter"
                              id="filter"
                              placeholder="Search patient..."
                              className="input"
                              value={filter}
                              onChange={(e) => setFilter(e.target.value)}
                            />*/}
                            <button className="submit submitEsp" type="submit">
                              Search
                            </button>

                            <Link
                              className="clear"
                              to="/appointments"
                              onClick={() => {
                                window.location.href = `appointments`;
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
                          <th>Date and Time</th>
                          <th>Status</th>
                          <th>User</th>
                          <th>Description</th>
                          <th colSpan="3" className="col-span">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((detail) => (
                          <tr key={detail._id}>
                            <td>
                              {detail.date || detail.time
                                ? moment(detail.date).format('DD/MM/YYYY') +
                                  ' ' +
                                  detail.time
                                : 'dd/mm/yyyy'}
                            </td>
                            <td>{detail.status}</td>
                            <td>
                              {detail.user.firstName +
                                ' ' +
                                detail.user.lastName}
                            </td>
                            <td>{detail.description.substring(0, 50)}...</td>
                            <td>
                              <Link
                                className="btn btn-info mr-2"
                                to={`/appointment/view/${detail._id}`}
                              >
                                View
                              </Link>
                            </td>
                            <td>
                              <Link
                                className="btn btn-primary mr-2"
                                to={`/appointment/${detail._id}/edit`}
                              >
                                Edit
                              </Link>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-danger mr-2 disabled-link"
                                onClick={() => deleteData(detail._id)}
                              >
                                Delete
                              </button>
                            </td>
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
