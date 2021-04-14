import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { viewEachAppointment } from '../../services/appointmentsServives';
import moment from 'moment';

export default function EditUser(props) {
  const [appointmentRecord, setAppointmentRecord] = useState({});
  const [appointment, setAppointment] = useState([]);

  useEffect(() => {
    async function getEach() {
      const id = props.match.params.id;
      viewEachAppointment(id)
        .then((response) => {
          setAppointmentRecord(response.data);
          setAppointment(response.data.adminUser);
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
                      <Link to="/appointments" className="btn btn-info mr-2">
                        View appointments
                      </Link>
                    </h3>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12">
                        <div className="row">
                          <div className="col-12 each-detail">
                            <h5>Appointment Details</h5>
                          </div>

                          <div className="col-md-6 col-12 each-p">
                            <p>
                              <span>Date</span>:{' '}
                              {appointmentRecord.date
                                ? moment(appointmentRecord.date).format(
                                    'DD/MM/YYYY'
                                  )
                                : '-'}
                            </p>
                          </div>
                          <div className="col-md-6 col-12 each-p">
                            <p>
                              <span>Time</span>:{' '}
                              {appointmentRecord.time
                                ? appointmentRecord.time
                                : '-'}
                            </p>
                          </div>
                          <div className="col-md-6 col-12 each-p">
                            <p>
                              <span>Status</span>: {appointmentRecord.status}
                            </p>
                          </div>
                          <div className="col-12 each-p">
                            <div className="row">
                              <div className="col-12">
                                <p>
                                  <span>Description</span>:
                                </p>
                              </div>
                              <div className="col-12">
                                {appointmentRecord.description
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
                      <div className="col-12">
                        <div className="row">
                          <div className="col-12 each-detail">
                            <h5>Updated List</h5>
                          </div>
                          <div className="col-12 each-p">
                            {appointment.map((adminUser) => (
                              <div key={adminUser._id} className="row">
                                <div className="col-6">
                                  <p>
                                    {adminUser.user.firstName +
                                      ' ' +
                                      adminUser.user.lastName}
                                  </p>
                                </div>
                                <div className="col-6">
                                  <p>
                                    {moment(adminUser.updatedAt).format(
                                      'DD/MM/YYYY h:mm'
                                    )}
                                  </p>
                                </div>
                              </div>
                            ))}
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
