import React from "react";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { checked } from "../../assets";

const Faqs = () => {
  const [t] = useTranslation("global");

  return (
    <div class="min-h-[70vh]  text-center py-8 flex flex-col   bg-sec-background">
      {/* Left Column */}
      <motion.div
        whileInView={{ x: [-50, 0], opacity: [0, 1] }}
        transition={{ duration: 0.1 }}
        class="w-full  h-full"
      >
        {/* <img src={rocket} alt="" class="w-10 mb-8" /> */}
        <h1 class="text-2xl md:text-4xl font-bold">
          {t("faq.title1")} <span class="textGradient"> {t("faq.title2")}</span> {t("faq.title3")}
        </h1>
        <p class="text-secondary mt-4">
          {t("faq.desc")}
        </p>
      </motion.div>

      {/* Answer Column */}
      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.2, delay: 0.1 }}
        class="w-full mt-10 h-full border border-blue-500 rounded-md p-6"
      >
        {/* FAQ Rows */}


        <div class="mb-8">
          <h3 class="text-lg font-semibold flex items-center gap-2 text-gradientText2">
            <img src={checked} alt="" class="w-4" />
            Are there any free courses available?
          </h3>
          <p class="pl-6 text-secondary">Yes, we offer a variety of free courses across multiple subjects to help you get started.</p>
        </div>

        <div class="mb-8">
          <h3 class="text-lg font-semibold flex items-center gap-2 text-gradientText2">
            <img src={checked} alt="" class="w-4" />
            Can I access the courses on mobile devices?
          </h3>
          <p class="pl-6 text-secondary">Yes, all our courses are optimized for mobile devices and can be accessed on the go.</p>
        </div>

        <div class="mb-8">
          <h3 class="text-lg font-semibold flex items-center gap-2 text-gradientText2">
            <img src={checked} alt="" class="w-4" />
            How do I get support if I have issues with my account?
          </h3>
          <p class="pl-6 text-secondary">You can contact our support team via email or through the support section on our website.</p>
        </div>

        <div class="mb-8">
          <h3 class="text-lg font-semibold flex items-center gap-2 text-gradientText2">
            <img src={checked} alt="" class="w-4" />
            Can I get a refund if I'm not satisfied with a course?
          </h3>
          <p class="pl-6 text-secondary">Yes, we offer a 30-day money-back guarantee if you're not satisfied with your course.</p>
        </div>

        <div class="mb-8">
          <h3 class="text-lg font-semibold flex items-center gap-2 text-gradientText2">
            <img src={checked} alt="" class="w-4" />
            Do I need any prior experience to join the courses?
          </h3>
          <p class="pl-6 text-secondary">No, our courses are designed for all levels, and beginners are welcome!</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Faqs;

