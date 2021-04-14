import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  viewFeedbacks,
  deleteFeedback,
} from '../../services/feedbacksServives';

function Feedback(props) {
  const [feedback, setFeedback] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    getAll();
  }, []);

  async function getAll() {
    const filter = props.location.search;
    viewFeedbacks(filter)
      .then((response) => {
        setFeedback(response.data.feedbacks);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSubmit(values) {
    props.history.push(`/feedbacks?status=${values.status}`);
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
            deleteFeedback(id)
              .then((response) => {
                getAll();
              })
              .catch((error) => {
                alert('error');
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
                      <div className="col-4"></div>
                      <div className="col-8 search-side">
                        <Formik
                          onSubmit={handleSubmit}
                          initialValues={{
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

                            <button className="submit submitEsp" type="submit">
                              Search
                            </button>

                            <Link
                              className="clear"
                              to="/feedbacks"
                              onClick={() => {
                                window.location.href = `feedbacks`;
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
                          <th>Full name</th>
                          <th>Rate</th>
                          <th>Look</th>
                          <th>Usage</th>
                          <th>Status</th>
                          <th>Comment</th>
                          <th colSpan="3" className="col-span">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {feedback.map((detail) => (
                          <tr key={detail._id}>
                            <td>
                              {detail.user.firstName +
                                ' ' +
                                detail.user.lastName}
                            </td>
                            <td>{detail.rate}</td>
                            <td>{detail.look}</td>
                            <td>{detail.usage}</td>
                            <td>{detail.status}</td>
                            <td>{detail.message.substring(0, 50)} ...</td>
                            <td>
                              <Link
                                className="btn btn-info mr-2"
                                to={`/feedback/view/${detail._id}`}
                              >
                                View
                              </Link>
                            </td>
                            <td>
                              <Link
                                className="btn btn-primary mr-2"
                                to={`/feedback/${detail._id}/edit`}
                              >
                                Edit
                              </Link>
                            </td>
                            <td>
                              <button
                                type="button"
                                onClick={() => deleteData(detail._id)}
                                className="btn btn-danger mr-2 disabled-lin"
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

export default Feedback;
