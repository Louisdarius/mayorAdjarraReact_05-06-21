import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { viewUserProfile } from '../services/usersServives';

export default function SideBar() {
  const [userRole, setUserRole] = useState({});

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    viewUserProfile()
      .then((response) => {
        setUserRole(response.data.user.role._id);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      {/* Main Sidebar Container */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <Link to="/dashboard" className="brand-link">
          <img
            src="dist/img/AdminLTELogo.png"
            className="brand-image img-circle elevation-3"
            style={{ opacity: '0.8' }}
            alt=""
          />
          <span className="brand-text font-weight-light">SenamiTech</span>
        </Link>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}

          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item active">
                <NavLink to="/dashboard" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>Dashboard</p>
                </NavLink>
              </li>
              <li className="nav-item bashvoard-nav">
                <NavLink to="/user/profile" className="nav-link">
                  <i className="nav-icon fas fa-user" />
                  <p>Profile</p>
                </NavLink>
              </li>
              <li className="nav-item bashvoard-nav">
                <NavLink to="/users" className="nav-link">
                  <i className="nav-icon fas fa-users" />
                  <p>Users</p>
                </NavLink>
              </li>
              {userRole === '6027daf9b6edc45418dff4db' ? (
                <>
                  <li className="nav-item bashvoard-nav">
                    <NavLink to="/roles" className="nav-link">
                      <i className="nav-icon fab fa-r-project" />
                      <p>Roles</p>
                    </NavLink>
                  </li>
                  <li className="nav-item bashvoard-nav">
                    <NavLink to="/feedbacks" className="nav-link">
                      <i className="nav-icon far fa-comment-dots" />
                      <p>Feedback Record</p>
                    </NavLink>
                  </li>
                  <li className="nav-item bashvoard-nav">
                    <NavLink to="/feedbacklists" className="nav-link">
                      <i className="nav-icon fas fa-list-ul" />
                      <p>Feedback list</p>
                    </NavLink>
                  </li>
                  <li className="nav-item bashvoard-nav">
                    <NavLink to="/preferences" className="nav-link">
                      <i className="nav-icon fas fa-th-list" />
                      <p>Preferences</p>
                    </NavLink>
                  </li>
                </>
              ) : null}

              <li className="nav-item bashvoard-nav">
                <NavLink to="/news" className="nav-link">
                  <i className="nav-icon far fa-newspaper" />
                  <p>News</p>
                </NavLink>
              </li>

              <li className="nav-item bashvoard-nav">
                <NavLink to="/appointments" className="nav-link">
                  <i className="nav-icon fas fa-calendar-check" />
                  <p>Appointments</p>
                </NavLink>
              </li>

              <li className="nav-item bashvoard-nav">
                <Link to="/" className="nav-link">
                  <i className="nav-icon fas fa-atlas" />
                  <p>Website</p>
                </Link>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
      {/* Content Wrapper. Contains page content */}
    </div>
  );
}
