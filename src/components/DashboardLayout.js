import React from 'react';

import ScrollToTop from './ScrollToTop.';
import DashboardHeader from '../cms/Header';
import DashboardSideBar from '../cms/SideBar';

function DashboardLayout(props) {
  return (
    <>
      <ScrollToTop />
      <DashboardHeader />
      <DashboardSideBar />
      {props.children}
    </>
  );
}

export default DashboardLayout;
