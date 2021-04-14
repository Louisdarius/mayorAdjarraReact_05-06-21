import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { viewEachFeedback } from '../../services/feedbacksServives';
import moment from 'moment';

export default function EditUser(props) {
  const [feedbackRecord, setFeedbackRecord] = useState({});
  const [feedbackRecordUser, setFeedbackRecordUser] = useState({});

  useEffect(() => {
    async function getEach() {
      const id = props.match.params.id;
      viewEachFeedback(id)
        .then((response) => {
          setFeedbackRecord(response.data);
          setFeedbackRecordUser(response.data.user);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getEach();
  }, [props.match.params.id]);

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
                    <h3 className="card-title">
                      <Link to="/feedbacks" className="btn btn-info mr-2">
                        View feedback
                      </Link>
                    </h3>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12">
                        <div className="row">
                          <div className="col-12 each-detail">
                            <h5>Feedback Details</h5>
                          </div>

                          <div className="col-md-6 col-12 each-p">
                            <p>
                              <span>Date</span>:{' '}
                              {feedbackRecord.createdAt
                                ? moment(feedbackRecord.createdAt).format(
                                    'DD/MM/YYYY HH:mm'
                                  )
                                : '-'}
                            </p>
                          </div>
                          <div className="col-md-6 col-12 each-p">
                            <p>
                              <span>Rate</span>: {feedbackRecord.rate}
                            </p>
                          </div>
                          <div className="col-md-6 col-12 each-p">
                            <p>
                              <span>Look</span>: {feedbackRecord.look}
                            </p>
                          </div>
                          <div className="col-md-6 col-12 each-p">
                            <p>
                              <span>Usage</span>: {feedbackRecord.usage}
                            </p>
                          </div>
                          <div className="col-md-6 col-12 each-p">
                            <p>
                              <span>Status</span>: {feedbackRecord.status}
                            </p>
                          </div>
                          <div className="col-md-6 col-12 each-p">
                            <p>
                              <span>User full name</span>:{' '}
                              {feedbackRecordUser.firstName +
                                ' ' +
                                feedbackRecordUser.lastName}
                            </p>
                          </div>
                          <div className="col-12 each-p">
                            <div className="row">
                              <div className="col-12">
                                <p>
                                  <span>Comment</span>:
                                </p>
                              </div>
                              <div className="col-12">
                                {feedbackRecord.message
                                  ?.split('\n\n')
                                  .map((paragraph) => (
                                    <p key={paragraph}>
                                      {paragraph
                                        .split('\n')
                                        .reduce((total, line) => [
                                          total,
                                          <br />,
                                          line,
                                        ])}
                                    </p>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
