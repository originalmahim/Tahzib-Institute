import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const OurTeam = () => {
  const teamDiv = useRef();
  const [t, i18n] = useTranslation("global");

  const handleActive = (e) => {
    const childrens = Array.from(
      teamDiv.current.querySelectorAll(".team-member")
    );

    let class_name = e.target.className;

    if (!class_name.includes("mem-active")) {
      childrens.map((c) => {
        if (c.className.includes("mem-active")) {
          c.className = "team-member";
        }
        return null;
      });

      e.target.className = "team-member mem-active";
    }
  };

  return (
    <div id="ourTeam" className="sec-background ">
      <motion.h1
        whileInView={{ opacity: [0, 1], y: [-50, 0] }}
        transition={{ duration: 0, delay: 0 }}
        className="primary-text"
      >
        {t("team.title1")}{" "}
        <span className="textGradient">{t("team.title2")}</span>,{" "}
        {t("team.title3")}{" "}
        <span className="textGradient">{t("team.title4")}</span>
      </motion.h1>
      <motion.p
        whileInView={{ opacity: [0, 1], y: [-50, 0] }}
        transition={{ duration: 0, delay: 0 }}
        className="secondary-text"
      >
        {t("team.desc")}
      </motion.p>

      <div className="team" ref={teamDiv}>
        <motion.div
          whileInView={{ opacity: [0, 1], x: [-10, 0] }}
          transition={{ duration: 0, delay: 0 }}
          className={`team-member`}
          onClick={handleActive}
        >
          <motion.div
            whileInView={{ y: [20, 0], opacity: [0, 1] }}
            transition={{ duration: 0.1, delay: 0.2 }}
            className="details team-bg"
          >
            <h2 className="primary-text">MD. Mehedi Hasan</h2>
            <small className="star">CSE - Lovely Professional University</small>
            <p className="secondary-text">CEO & Founder</p>
          </motion.div>
        </motion.div>

        <motion.div
          whileInView={{ opacity: [0, 1], x: [-10, 0] }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className={`team-member mem-active`}
          onClick={handleActive}
        >
          <motion.div
            whileInView={{ y: [20, 0], opacity: [0, 1] }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="details team-bg"
          >
            <h2 className="primary-text">Tareq Aziz Mahim</h2>
            <small className="star">CSE - Green University Bangladesh</small>
            <p className="secondary-text">Co-Founder and Web Developer</p>
          </motion.div>
        </motion.div>


        <motion.div
          whileInView={{ opacity: [0, 1], x: [-10, 0] }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className={`team-member`}
          onClick={handleActive}
        >
          <motion.div
            whileInView={{ y: [20, 0], opacity: [0, 1] }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="details team-bg"
          >
            <h2 className="primary-text">Shykat Raha</h2>
            <small className="star">CSE - Lovely Professional University</small>
            <p className="secondary-text">Co-Founder and Web Developer</p>
          </motion.div>
        </motion.div>

        <motion.div
          whileInView={{ opacity: [0, 1], x: [-10, 0] }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className={`team-member`}
          onClick={handleActive}
        >
          <motion.div
            whileInView={{ y: [20, 0], opacity: [0, 1] }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="details team-bg"
          >
            <h2 className="primary-text">Mahabuba Hasan Mati</h2>
            <small className="star">EEE - BAUET</small>
            <p className="secondary-text">Chief Marketing Officer</p>
          </motion.div>
        </motion.div>

        <motion.div
          whileInView={{ opacity: [0, 1], x: [-10, 0] }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className={`team-member`}
          onClick={handleActive}
        >
          <motion.div
            whileInView={{ y: [20, 0], opacity: [0, 1] }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="details team-bg"
          >
            <h2 className="primary-text">Mehra Khatun Ananna</h2>
            <small className="star">
              Sociology - Rabindra University, Bangladesh.
            </small>
            <p className="secondary-text">Admin Assistant Intern</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default OurTeam;
