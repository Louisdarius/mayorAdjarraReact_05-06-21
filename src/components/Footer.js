import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  const date = new Date();
  return (
    <div id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-12 footer-contact">
              <h3>LawyereXpert</h3>
              <p>
                <i className="fas fa-envelope"></i>{' '}
                <span>info@lawyerexpert.co.uk</span>
              </p>
            </div>

            <div className="col-md-2 col-6 footer-links">
              <h4>USEFUL LINKS</h4>
              <ul>
                <li>
                  <i className="fas fa-angle-right"></i>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <i className="fas fa-angle-right"></i>{' '}
                  <Link to="/aboutus">About us</Link>
                </li>
                <li>
                  <i className="fas fa-angle-right"></i>{' '}
                  <Link to="/">Services</Link>
                </li>
                <li>
                  <i className="fas fa-angle-right"></i>{' '}
                  <Link to="/contact">Contact us</Link>
                </li>
                <li>
                  <i className="fas fa-angle-right"></i>{' '}
                  <Link to="/terms-service">Terms and service</Link>
                </li>
                <li>
                  <i className="fas fa-angle-right"></i>{' '}
                  <Link to="/privacy-policy">Privac policy</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-6 footer-links">
              <h4>OUR SERVICES</h4>
              <ul>
                <li>
                  <i className="fas fa-angle-right"></i>{' '}
                  <Link to="/find-experts">Find a Lawyer</Link>
                </li>
                <li>
                  <i className="fas fa-angle-right"></i>{' '}
                  <Link to="/documents-bank">Document Bank</Link>
                </li>
                <li>
                  <i className="fas fa-angle-right"></i>{' '}
                  <Link to="/packages">Legal Plan</Link>
                </li>
                <h4 className="for-lawyer">FOR LAYWERS</h4>
                <li>
                  <i className="fas fa-angle-right"></i>{' '}
                  <Link to="/sign-up">Join for free</Link>
                </li>
                <li>
                  <i className="fas fa-angle-right"></i>{' '}
                  <Link to="/legal-marketing">Legal Marketing</Link>
                </li>
                <li>
                  <i className="fas fa-angle-right"></i>{' '}
                  <Link to="/legal-technology">Legal Technology</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-4 col-12 footer-links footer-newsletter">
              <h4>JOIN OUR NEWSLETTER</h4>
              <p>
                We will keep you up to date with the latest insights and trends
                in legal technology innovation.
              </p>
              <form action="" method="post">
                <input type="email" name="email" />
                <input type="submit" value="Subscribe" />
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-base">
        <div className="container d-md-flex py-4">
          <div className="mr-md-auto text-center text-md-left">
            <div className="copyright">
              Copyright &copy; {date.getFullYear()}{' '}
              <strong>
                <span> LawyereXpert</span>
              </strong>
            </div>
          </div>
          <div className="social-links text-center text-md-right pt-3 pt-md-0">
            <a href="senamitech.com/" className="twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="senamitech.com/" className="facebook">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="senamitech.com/" className="instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="senamitech.com/" className="linkedin">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
