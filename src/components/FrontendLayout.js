import React from 'react';

import FrontEndNavbar from './Navbar';
import FrontEndFooter from './Footer';
import ScrollToTop from './ScrollToTop.';

function FrontendLayout(props) {
  return (
    <>
      <ScrollToTop />
      <FrontEndNavbar />
      {props.children}
      <FrontEndFooter />
    </>
  );
}

export default FrontendLayout;
