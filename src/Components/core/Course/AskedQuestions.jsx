//  AskedQuestions
import React from "react";
import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "ফাইলগুলির মেয়াদ কতদিন থাকবে ?",
    answer:
      "ফাইলগুলির মেয়াদ আজীবন থাকবে। আপনি ডাইনলোড করে নিজের কাছেই রেখে দিতে পারবেন। এছাড়া মেইল এক্সেস তো থাকছেই। ",
  },
 
  {
    question: " ফাইলগুলোর এক্সেস কিভাবে পাবো ?",
    answer:
      "আমাদের সিস্টেম টা এতোটাই সহজ,যে কখনো ই-বুক ক্রয় করেনি তার জন্যেও কোন সমস্যা হবে না। মাত্র ১ ক্লিকে আমাদেরকে পেমেন্ট করার ১ মিনিটের মধ্যেই আপনাকে Google Drive File এক্সেস দিয়ে দেওয়া হবে। ",
  }, 
  {
    question: "পেমেন্ট কীভাবে করবো ?",
    answer:
      "ফাইলগুলি কেনার জন্য Bkash / Nagad এ 01407975656 (পার্সনাল নাম্বার) - এই নাম্বারে সেন্ড মানি করুন",
  },
  {
    question: "ফাইলগুলি দেখার জন্য কী প্রয়োজন হবে ?",
    answer:
      "Internet connection (WIFI or Mobile Internet), Smartphone or PC",
  },
  
  {
    question: "আপনাদের সাথে কীভাবে যোগাযোগ করবো ?",
    answer:
      "যেকোন জিজ্ঞাসা ও অর্ডারজনিত সমস্যায় নক করুন আমাদের ফেসবুক পেজে। আমরা আছি সকাল ১০ টা থেকে রাত ৮ টা পর্যন্ত আপনার সেবায়।",
  },
  
  {
    question: "রিফান্ড পাবো কীভাবে ?",
    answer:
      "ফাইলগুলি কেনার পর ০৬ ঘণ্টার মধ্যে নক করুন আমাদের ফেসবুক পেজে নক করে রিফান্ড চাওয়ার কারণ সহ অ্যাপ্লাই করুন । রিফান্ডের কারণের উপর ভিত্তি করে ৭ থেকে ১০ কার্যদিবসের মধ্যে রিফান্ড করা হবে । ",
  },
   
  
  
  
  
  // More questions...
];

const AskedQuestions = () => {
  return (
    <div id="faq" className="mt-4 sec-background">
      <h1 className="lg:text-3xl text-2xl font-bold text-center primary-text">
      সচরাচর প্রশ্নগুলোর উত্তর
      </h1>
      <div className="border mt-4 border-blue-500 rounded-md">
        <div className="px-4 ">
          <div className="mx-auto max-w-4xl primary-text">
            <dl className="my-2  divide-y divide-blue-500">
              {faqs.map((faq) => (
                <Disclosure as="div" key={faq.question} className="pt-6">
                  {({ open }) => (
                    <>
                      <dt>
                        <Disclosure.Button className="flex w-full items-start justify-between text-left text-white">
                          <span className="text-xl font-semibold leading-7">
                            {faq.question}
                          </span>
                          <span className="ml-6 flex h-7 items-center">
                            {open ? (
                              <MinusSmallIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusSmallIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className="mt-2 pr-12">
                        <p className="text-base leading-7 text-yellow-600">
                          {faq.answer}
                        </p>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskedQuestions;