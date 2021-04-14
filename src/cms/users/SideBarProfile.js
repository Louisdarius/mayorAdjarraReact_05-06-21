import React from 'react';
import { NavLink } from 'react-router-dom';

export default function UserProfile() {
  return (
    <div className="col-md-4 col-12 profile-side-bar">
      <ul>
        <li>
          <NavLink
            activeClassName="selected"
            to={{ pathname: '/user/profile' }}
          >
            User details
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="selected"
            to={{ pathname: '/user/changepassword' }}
          >
            Change password
          </NavLink>
        </li>
        {/* <li>
          <NavLink activeClassName="selected" to={{ pathname: '/user/image' }}>
            Profile image
          </NavLink>
        </li>*/}
      </ul>
    </div>
  );
}
