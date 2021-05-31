import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  viewPreferences,
  deletePreference,
} from '../../services/preferencesServives';

function Preference() {
  const [preference, setPreference] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  async function getAll() {
    viewPreferences()
      .then((response) => {
        setPreference(response.data);
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
            deletePreference(id)
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
    <div className="col-md-6 col-12">
      <div className="card">
        {/* /.card-header */}
        <div className="card-body">
          <table id="example2" className="table table-bordered table-hover">
            <thead className="headerTable">
              <tr>
                <th>Name</th>
                <th colSpan="2" className="col-span">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {preference.map((detail) => (
                <tr key={detail._id}>
                  <td>{detail.name}</td>
                  <td className="col-span">
                    <Link
                      className="btn btn-primary mr-2"
                      to={{ pathname: `/preference/${detail._id}/edit` }}
                      onClick={() => {
                        window.location.href = `/preference/${detail._id}/edit`;
                      }}
                    >
                      Edit
                    </Link>{' '}
                  </td>
                  <td className="col-span">
                    <button
                      type="button"
                      onClick={() => deleteData(detail._id)}
                      className="btn btn-danger mr-2 disabled-link"
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
  );
}

export default Preference;
