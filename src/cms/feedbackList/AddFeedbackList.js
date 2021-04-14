import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addFeedbackLists } from '../../services/feedbackListServives';
import ViewFeedbackList from './FeedbackList';

function FeedbackList() {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  async function handleSubmit() {
    if (name === '') {
      if (name === '') {
        setNameError('name require');
      } else {
        setNameError(null);
      }
    } else {
      setNameError(null);
      addData();
    }
  }

  async function addData() {
    addFeedbackLists(name)
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
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
              <div className="col-md-6 col-12">
                <div className="card">
                  {/* /.card-header */}
                  <div className="card-body">
                    <div className="form-row">
                      <div className="col-12 form-group">
                        <label>
                          Add Feedback List<i className="required-detail">*</i>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name={name}
                          placeholder="Feedback list name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        {nameError ? (
                          <p className="errorMessage"> {nameError}</p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="card-header">
                    <h3 className="card-title">
                      <Link
                        to="#"
                        onClick={() => handleSubmit()}
                        className="btn btn-info mr-2"
                      >
                        Add New Record
                      </Link>
                    </h3>
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
                {/* /.card */}
              </div>
              <ViewFeedbackList />
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

export default FeedbackList;
