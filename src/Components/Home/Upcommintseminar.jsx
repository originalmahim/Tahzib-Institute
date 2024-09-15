import React from 'react';
import { motion } from 'framer-motion';
import { seminar, seminarBanner } from '../../assets';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Upcommintseminar = () => {
          const [t] = useTranslation("global");
          return (
          <div id="upcommingseminar" className="sec-background">
      {/* <div className="gradient1"></div> */}
      <motion.div
        whileInView={{ y: [50, 0], opacity: [0, 1] }}
        transition={{ duration: 0, delay: 0 }}
        className="upcomingSeminar bannerBg"
      >
        <div className="banner-col">
          <img src={seminarBanner} alt="" />
        </div>
        <div className="info-col">
          <small className="primary-text">Upcoming...</small>
          <h1 className="primary-text">
            {t("onlineSeminar.title1")}{" "}
            <span className="textGradient">{t("onlineSeminar.title2")}</span>{" "}
            {t("onlineSeminar.title3")}
          </h1>
          <p className="secondary-text">{t("onlineSeminar.desc")}</p>

          <Link to="/batch" className="linkBtn">
            <button>
              <img src={seminar} alt="" className="ico" />
              <p>{t("onlineSeminar.btn")}</p>
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
          );
};

export default Upcommintseminar;