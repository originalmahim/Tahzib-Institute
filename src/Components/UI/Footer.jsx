import React from "react";
import { envelop, logo, map, payment, phone } from "../../assets";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTelegram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Footer = ({ darkTheme }) => {
  const [t] = useTranslation("global");
  return (
    <div id="footer" className={!darkTheme ? "dark" : "light"}>
      <div className="content footer-bg">
        <div className="top">
          <div className="logo-area">
            <img src={logo} alt="" />
            <small className="primary-text">
              {t('footer.title')}
            </small>

            <div className="socials">
              <Link to="https://www.facebook.com/TahzibInstitute">
                <FaFacebookF className="ico primary-text" />
              </Link>
              <Link to="https://www.instagram.com/tahzibinstitute/">
                <FaInstagram className="ico primary-text" />
              </Link>
              <Link to="https://x.com/tahzibinstitute">
                <FaTwitter className="ico primary-text" />
              </Link>
              <Link to="https://www.youtube.com/@tahzibinstitute">
                <FaYoutube className="ico primary-text" />
              </Link>
              <Link to="https://t.me/TahzibOfficial">
                <FaTelegram className="ico primary-text" />
              </Link>
            </div>
          </div>
          <div className="company">
            <p className="title">{t('footer.heading1')}</p>

            <Link to="/about-us" className="footer-link secondary-text">
            {t('footer.heading1option.option1')}
            </Link>
            <Link to="/refund" className="footer-link secondary-text">
            {t('footer.heading1option.option2')}
            </Link>
            <Link to="/privacy" className="footer-link secondary-text">
            {t('footer.heading1option.option3')}
            </Link>
            <Link to="/terms" className="footer-link secondary-text">
            {t('footer.heading1option.option4')}
            </Link>
          </div>
          <div className="others">
            <p className="title">{t('footer.heading2')}</p>

            <Link to="/upcoming-batch" className="footer-link secondary-text">
            {t('footer.heading2option.option1')}
            </Link>
            {/* <Link
              to="/free-live-classes"
              className="footer-link secondary-text"
            >
              {t('footer.heading2option.option2')}
            </Link> */}
            <Link to="/live-workshop" className="footer-link secondary-text">
            {t('footer.heading2option.option3')}
            </Link>
            <Link to="/all-courses" className="footer-link secondary-text">
            {t('footer.heading2option.option4')}
            </Link>
            <Link to="/blogs" className="footer-link secondary-text">
            {t('footer.heading2option.option5')}
            </Link>
          </div>
          <div className="social-media">
            <p className="title">{t('footer.heading3')}</p>

            <span className="secondary-text">
              <img src={phone} alt="" />
              +880 1730-986832
            </span>
            <span className="secondary-text">
              <img src={envelop} alt="" />
              tahzibinstitute@gmail.com
            </span>
            <span className="secondary-text">
              <img src={map} alt="" />
              50 Ethelbert Gardens, Ilford, Essex, England.
            </span>
          </div>
        </div>

        {/* <div className="middle"></div> */}

        <div className="bottom nav-bg">
          <small className="secondary-text">
          {t('footer.copy')}
          </small>
        </div>
      </div>
    </div>
  );
};

export default Footer;
