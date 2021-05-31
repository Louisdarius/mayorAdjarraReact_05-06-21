import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../../components/HeroSection';
import '../../App.css';

function Home() {
  return (
    <>
      <HeroSection />
      <div className="main_container services">
        <div className="container">
          <div className="row first-top">
            <div className="col-lg-4 col-md-6">
              <div className="icon-box" data-aos="fade-up">
                <div className="icon">
                  <i className="fas fa-gavel"></i>
                </div>
                <h4 className="title">
                  <Link to="/find-experts">Find a Lawyer</Link>
                </h4>
                <p className="description">
                  We are experts in connecting you with the right lawyer for
                  your needs. We work with qualified and experienced legal
                  professionals who can deliver the solutions you need at
                  affordable price.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="icon-box" data-aos="fade-up" data-aos-delay="100">
                <div className="icon">
                  <i className="fas fa-users"></i>
                </div>
                <h4 className="title">
                  <Link to="/packages">
                    Membership Plans (icon/widget needs to change)
                  </Link>
                </h4>
                <p className="description">
                  Our membership plans offer flexible access to expert guidance
                  and legal documents, whenever and wherever you need them.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="icon-box" data-aos="fade-up" data-aos-delay="200">
                <div className="icon">
                  <i className="fas fa-download"></i>
                </div>
                <h4 className="title">
                  <Link to="/documents-bank">Download Legal Documents</Link>
                </h4>
                <p className="description">
                  Our Document Bank includes over 200 standard and specialised
                  legal documents covering both business and personal matters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="our-mission" className="about-us">
        <div className="container">
          <div className="row no-gutters">
            <div
              className="image col-xl-5 d-flex align-items-stretch justify-content-center justify-content-lg-start"
              data-aos="fade-right"
            ></div>
            <div className="col-xl-7 pl-0 pl-lg-5 pr-lg-1 d-flex align-items-stretch">
              <div className="content d-flex flex-column justify-content-center">
                <h3 data-aos="fade-up">Our Mission</h3>
                <p data-aos="fade-up">
                  Lawyerexpert is a legal data platform designed to
                  revolutionise the way we access legal services. We were
                  established in 2020 with the mission to make legal services
                  accessible to individuals and SMEs who are often overwhelmed
                  by opaque legal process and structure.
                </p>
                <div className="row">
                  <div className="col-md-12 icon-box" data-aos="fade-up">
                    <i className="fas fa-gavel"></i>
                    <h4>Find a Lawyer</h4>
                    <p>
                      This is a smart engine that enables you to connect with
                      and request quotes from specialist law firms and
                      solicitors.{' '}
                    </p>
                  </div>
                  <div
                    className="col-md-12 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <i className="fas fa-chart-line"></i>
                    <h4>Legal Plans</h4>
                    <p>
                      Our fixed price monthly membership plans provide access to
                      hundreds of legal documents on demand, whenever and
                      wherever you need them. They offer great flexibility and
                      advance protection, especially for individuals, sole
                      traders and small businesses.
                    </p>
                  </div>
                  <div
                    className="col-md-12 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <i className="fas fa-chart-line"></i>
                    <h4>Document Bank</h4>
                    <p>
                      Get the documents you need in minutes from our Document
                      Bank. We have a database of 200+ standard and specialised
                      legal documents which you can access on demand. If you
                      require additional support, we can help you find the right
                      lawyer to fulfil your objectives.{' '}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
