import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addAppointments } from '../../services/appointmentsServives';

export default function Addappointment(props) {
  const [description, setDescription] = useState('');
  const [meetingPref, setMeetingPref] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [meetingPrefError, setMeetingPrefError] = useState('');

  async function handleSubmit() {
    if (description === '') {
      if (description === '') {
        setDescriptionError('description require');
      } else {
        setDescriptionError(null);
      }
      if (meetingPref === '') {
        setMeetingPrefError('meeting pref require');
      } else {
        setMeetingPrefError(null);
      }
    } else {
      setDescriptionError(null);
      setMeetingPrefError(null);
      addData();
    }
  }

  async function addData() {
    addAppointments(description)
      .then((response) => {
        props.history.push('/appointments');
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
              <div className="col-sm-6">
                <h1>Add appointment</h1>
              </div>
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
                      <Link to="/appointments" className="btn btn-info mr-2">
                        View appointments
                      </Link>
                    </h3>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <div className="form-row">
                      <div className="col-md-7 col-12 form-group">
                        <label>
                          Description<i className="required-detail">*</i>
                        </label>
                        <textarea
                          rows="5"
                          className="form-control"
                          type="text"
                          name={description}
                          placeholder="Description"
                          onChange={(e) => setDescription(e.target.value)}
                        />

                        {descriptionError ? (
                          <p className="errorMessage"> {descriptionError}</p>
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
