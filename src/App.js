import React, { useEffect } from 'react';
import './App.css';
import './pages/main.css';
import Aos from 'aos';
import 'aos/dist/aos.css';

import Home from './pages/home/Home';
import SignIn from './pages/users/SignIn';
//import SignUp from './pages/users/SignUp';

import Dashboard from './cms/dashboard/Dashboard';
import ChangePassword from './cms/users/ChangePassword';
import UserPasswordChange from './cms/users/UserPasswordChange';
import ViewUsers from './cms/users/ViewUsers';
import AddUers from './cms/users/AddUsers';
import EditUser from './cms/users/EditUser';
import EditUserProfile from './cms/users/EditUserProfile';
import ProfileImage from './cms/users/EditUserProfilePicture';

import EditRole from './cms/roles/EditRole';
import AddRole from './cms/roles/AddRole';
import EditFeedbackList from './cms/feedbackList/EditFeedbackList';
import AddFeedbackList from './cms/feedbackList/AddFeedbackList';
import Feedback from './cms/feedback/Feedback';
import EditFeedback from './cms/feedback/EditFeedback';
import ViewEachFeedback from './cms/feedback/ViewEachFeedback';

import EditPreference from './cms/preferences/EditPreference';
import AddPreference from './cms/preferences/AddPreference';

import AddAppointment from './cms/appointments/AddAppointment';
import EditAppointment from './cms/appointments/EditAppointment';
import ViewAppointments from './cms/appointments/ViewAppointments';
import ViewEachAppointment from './cms/appointments/ViewEachAppointment';

import AddNews from './cms/news/AddNews';
import EditNews from './cms/news/EditNews';
import ViewNews from './cms/news/ViewNews';
import ViewEachNews from './cms/news/ViewEachNews';

import AppRoute from './components/AppRoute';
import FrontendLayout from './components/FrontendLayout';
import DashboardLayout from './components/DashboardLayout';
import PageNotFound from './components/PageNotFound';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  let value = localStorage.getItem('user');

  useEffect(() => {
    Aos.init({});
  }, []);

  return (
    <>
      <Router>
        <Switch>
          <AppRoute exact path="/" layout={FrontendLayout} component={Home} />
          {/* <Route path="/sign-in" component={SignIn} /> */}
          <AppRoute
            path="/sign-in"
            layout={FrontendLayout}
            component={SignIn}
          />
          {value &&
            (JSON.parse(value).role._id == '6027daf9b6edc45418dff4db' ||
              JSON.parse(value).role._id == '6027df2ab306664888a7f86d') && (
              <Switch>
                <AppRoute
                  path="/dashboard"
                  layout={DashboardLayout}
                  component={Dashboard}
                />
                <AppRoute
                  path="/roles"
                  layout={DashboardLayout}
                  component={AddRole}
                />
                <AppRoute
                  path="/role/:id/edit"
                  layout={DashboardLayout}
                  component={EditRole}
                />
                <AppRoute
                  path="/feedbacklists"
                  layout={DashboardLayout}
                  component={AddFeedbackList}
                />
                <AppRoute
                  path="/feedbacklist/:id/edit"
                  layout={DashboardLayout}
                  component={EditFeedbackList}
                />
                <AppRoute
                  path="/feedbacks"
                  layout={DashboardLayout}
                  component={Feedback}
                />
                <AppRoute
                  path="/feedback/:id/edit"
                  layout={DashboardLayout}
                  component={EditFeedback}
                />
                <AppRoute
                  path="/feedback/view/:id"
                  layout={DashboardLayout}
                  component={ViewEachFeedback}
                />
                <AppRoute
                  path="/new/add"
                  layout={DashboardLayout}
                  component={AddNews}
                />
                <AppRoute
                  path="/news"
                  layout={DashboardLayout}
                  component={ViewNews}
                />
                <AppRoute
                  path="/new/:id/edit"
                  layout={DashboardLayout}
                  component={EditNews}
                />
                <AppRoute
                  path="/new/view/:id"
                  layout={DashboardLayout}
                  component={ViewEachNews}
                />
                <AppRoute
                  path="/preferences"
                  layout={DashboardLayout}
                  component={AddPreference}
                />
                <AppRoute
                  path="/preference/:id/edit"
                  layout={DashboardLayout}
                  component={EditPreference}
                />
                <AppRoute
                  path="/users"
                  layout={DashboardLayout}
                  component={ViewUsers}
                />
                <AppRoute
                  path="/user/register"
                  layout={DashboardLayout}
                  component={AddUers}
                />
                <AppRoute
                  path="/user/:id/edit"
                  layout={DashboardLayout}
                  component={EditUser}
                />
                <AppRoute
                  path="/user/profile"
                  layout={DashboardLayout}
                  component={EditUserProfile}
                />
                <AppRoute
                  path="/user/image"
                  layout={DashboardLayout}
                  component={ProfileImage}
                />
                <AppRoute
                  path="/user/changepassword"
                  layout={DashboardLayout}
                  component={ChangePassword}
                />
                <AppRoute
                  path="/user/userpasswordchange/:id/passwordchange"
                  layout={DashboardLayout}
                  component={UserPasswordChange}
                />
                <AppRoute
                  path="/appointments"
                  layout={DashboardLayout}
                  component={ViewAppointments}
                />
                <AppRoute
                  path="/appointment/add"
                  layout={DashboardLayout}
                  component={AddAppointment}
                />
                <AppRoute
                  path="/appointment/view/:id"
                  layout={DashboardLayout}
                  component={ViewEachAppointment}
                />
                <AppRoute
                  path="/appointment/:id/edit"
                  layout={DashboardLayout}
                  component={EditAppointment}
                />
              </Switch>
            )}
          <AppRoute layout={FrontendLayout} component={PageNotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
