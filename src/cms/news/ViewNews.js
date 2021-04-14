import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import moment from 'moment';
import { viewNews, deleteNews } from '../../services/newsServives';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function ViewUers(props) {
  const [news, setNews] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    viewNews()
      .then((response) => {
        setNews(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function deleteData(id) {
    confirmAlert({
      title: 'Delete',
      message: 'Are you sure you want to delete this.',
      buttons: [
        {
          label: 'Confirm',
          onClick: () => {
            deleteNews(id)
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
                          <Link to="/new/add" className="btn btn-info mr-2">
                            Add News
                          </Link>
                        </h3>
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
                          <th>Ttitle</th>
                          <th>Sub Title</th>
                          <th>Content</th>
                          <th colSpan="3" className="col-span">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {news.map((detail) => (
                          <tr key={detail._id}>
                            <td>
                              {moment(detail.createdAt).format(
                                'DD/MM/YYYY HH:mm'
                              )}
                            </td>
                            <td>{detail.title}</td>
                            <td>{detail.subTitle}</td>
                            <td>{detail.content.substring(0, 50)}...</td>
                            <td>
                              <Link
                                className="btn btn-info mr-2"
                                to={`/new/view/${detail._id}`}
                              >
                                View
                              </Link>
                            </td>
                            <td>
                              <Link
                                className="btn btn-primary mr-2"
                                to={`/new/${detail._id}/edit`}
                              >
                                Edit
                              </Link>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-danger mr-2 disabled-lin"
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
