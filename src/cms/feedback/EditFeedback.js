import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  updateFeedbacks,
  viewEachFeedback,
} from '../../services/feedbacksServives';

export default function EditFeedback(props) {
  const [status, setStatus] = useState('');

  useEffect(() => {
    async function getEach() {
      const id = props.match.params.id;
      viewEachFeedback(id)
        .then((response) => {
          setStatus(response.data.status);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getEach();
  }, [props.match.params.id]);

  async function editData() {
    const id = props.match.params.id;
    updateFeedbacks(status, id)
      .then((response) => {
        props.history.push('/feedbacks');
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
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">
                      <Link to="/feedbacks" className="btn btn-info mr-2">
                        View feedbacks
                      </Link>
                    </h3>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <div className="form-row">
                      <div className="col-md-6 col-12 form-group">
                        <label>
                          Status<i className="required-detail">*</i>
                        </label>
                        <select
                          className="form-control"
                          name={status}
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="pending">pending</option>
                          <option value="approved">approved</option>
                          <option value="disapproved">disapproved</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="card-header">
                    <h3 className="card-title">
                      <Link
                        to="#"
                        onClick={() => editData()}
                        className="btn btn-info mr-2"
                      >
                        Update Record
                      </Link>
                    </h3>
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
