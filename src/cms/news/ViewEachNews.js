import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { viewEachNews } from '../../services/newsServives';
import moment from 'moment';

export default function EditUser(props) {
  const [newsRecord, setNewsRecord] = useState({});

  useEffect(() => {
    async function getEach() {
      const id = props.match.params.id;
      viewEachNews(id)
        .then((response) => {
          setNewsRecord(response.data);
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
                      <Link to="/news" className="btn btn-info mr-2">
                        View news
                      </Link>
                    </h3>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12">
                        <div className="row">
                          <div className="col-12 each-detail">
                            <h5>News Details</h5>
                          </div>

                          <div className="col-md-6 col-12 each-p">
                            <p>
                              <span>Date</span>:{' '}
                              {moment(newsRecord.createdAt).format(
                                'DD/MM/YYYY HH:mm'
                              )}
                            </p>
                          </div>
                          <div className="col-md-6 col-12 each-p">
                            <p>
                              <span>Title</span>: {newsRecord.title}
                            </p>
                          </div>
                          <div className="col-md-6 col-12 each-p">
                            <p>
                              <span>Sub title</span>: {newsRecord.subTitle}
                            </p>
                          </div>
                          <div className="col-12 each-p">
                            <div className="row">
                              <div className="col-12">
                                <p>
                                  <span>Content</span>:
                                </p>
                              </div>
                              <div className="col-12">
                                {newsRecord.content
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
