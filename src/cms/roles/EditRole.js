import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ViewRole from './Role';
import { viewEachRole, updateRoles } from '../../services/rolesServives';

function Role(props) {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  useEffect(() => {
    async function getEach() {
      const id = props.match.params.id;
      viewEachRole(id)
        .then((response) => {
          setName(response.data.name);
        })
        .catch((error) => {});
    }
    getEach();
  }, [props.match.params.id]);

  async function handleSubmit() {
    if (name === '') {
      if (name === '') {
        setNameError('name require');
      } else {
        setNameError(null);
      }
    } else {
      setNameError(null);
      editData();
    }
  }

  async function editData() {
    const id = props.match.params.id;
    updateRoles(name, id)
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
                          Edit Role<i className="required-detail">*</i>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name={name}
                          placeholder="Role name"
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
                        Update Record
                      </Link>
                    </h3>
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
                {/* /.card */}
              </div>
              <ViewRole />
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

export default Role;
