import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  viewImage,
  updateUserProfileImage,
} from '../../services/usersServives';
import SidebarProfile from './SideBarProfile';

export default function UserProfile() {
  const [userLogo, setUserLogo] = useState('');
  const [userLogoDisplay, setUserLogoDisplay] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    const userLogo = e.target.files[0];
    setUserLogo(userLogo);
    console.log(userLogo);
  };
  async function editData() {
    const data = new FormData();
    data.append('userLogo', userLogo);
    updateUserProfileImage(data)
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert('error');
      });
  }

  async function getData() {
    viewImage()
      .then((response) => {
        setUserLogo(response.data.userLogo);
        setUserLogoDisplay(response.data.userLogo);
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
            <div className="row">
              <div className="col-6">
                <h1>Edit User profile</h1>
              </div>
              <div className="col-6">
                <Link
                  className="btn btn-primary mr-2"
                  to={{ pathname: `/cms/user/profile` }}
                >
                  View user profile
                </Link>
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
                  {/* /.card-header */}
                  <div className="card-body">
                    <div className="row">
                      <SidebarProfile />
                      <div className="col-md-8 col-12">
                        <div className="col-12 user-detail-record">
                          <div className="row form-row">
                            <div className="detail-title col-12">
                              <h5>User profile image</h5>
                            </div>
                            <div className="col-12">
                              <p>Image</p>
                              {userLogoDisplay ? (
                                <img
                                  src={`data:image/jpg;base64,${new Buffer.from(
                                    userLogoDisplay
                                  ).toString('base64')}`}
                                />
                              ) : (
                                'No'
                              )}
                            </div>
                            <div className="col-6 form-group">
                              <label>
                                User profile<i className="required-detail">*</i>
                              </label>
                              <input
                                className="form-control"
                                type="file"
                                name={userLogo}
                                placeholder="user profile"
                                accept=".jpg, .png, .jpeg"
                                onChange={handleChange}
                              />
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
