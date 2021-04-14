import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  updateAppointments,
  viewEachAppointment,
} from '../../services/appointmentsServives';

export default function EditUser(props) {
  const [date, setDate] = useState('');
  const [dateError, setDateError] = useState('');
  const [time, setTime] = useState('');
  const [meetingPref, setMeetingPref] = useState('');
  const [timeError, setTimeError] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    async function getEach() {
      const id = props.match.params.id;
      viewEachAppointment(id)
        .then((response) => {
          setDate(
            response.data.date
              ? moment(response.data.date).format('DD/MM/YYYY')
              : ''
          );
          setTime(response.data.time);
          setMeetingPref(response.data.meetingPref);
          setStatus(response.data.status);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getEach();
  }, [props.match.params.id]);

  async function handleSubmit() {
    if (
      date === '' ||
      time === '' ||
      time === undefined ||
      !/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(time) ||
      !/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(
        date
      )
    ) {
      if (date === '') {
        setDateError('date require');
      } else if (
        !/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(
          date
        )
      ) {
        setDateError('Wrong date format');
      } else {
        setDateError(null);
      }
      if (time === '' || time === undefined) {
        setTimeError('time require');
      } else if (!/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(time)) {
        setTimeError('Wrong time');
      } else {
        setTimeError(null);
      }
    } else {
      setDateError();
      setTimeError();
      editData();
    }
  }

  async function editData() {
    const id = props.match.params.id;
    updateAppointments(date, time, status, id)
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
                      <Link to="/appointments" className="btn btn-info mr-2">
                        View appointments
                      </Link>
                    </h3>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <div className="form-row">
                      <div className="col-md-6 col-12 form-group">
                        <label>
                          Date<i className="required-detail">* </i>eg.
                          DD/MM/YYYY
                        </label>

                        <input
                          className="form-control"
                          type="text"
                          name={date}
                          placeholder="DD/MM/YYYY"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                        {dateError ? (
                          <p className="errorMessage"> {dateError}</p>
                        ) : null}
                      </div>
                      <div className="col-md-6 col-12 form-group">
                        <label>
                          Time<i className="required-detail">*</i> eg. 15:30
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name={time}
                          placeholder="15:30"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                        />
                        {timeError ? (
                          <p className="errorMessage"> {timeError}</p>
                        ) : null}
                      </div>
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
                        onClick={() => handleSubmit()}
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
