import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { LockClosedIcon, PlayCircleIcon } from "@heroicons/react/20/solid";


const Coursecontents = ({ course }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  console.log(course.chapters);
  return (
    <div className="my-2 sec-backgraund">
      <div className="">
        <div className="w-full">
          <div className="w-full">
            <dl className="mt-2 ">
              {course?.chapters?.map((item,index) => (
                <Disclosure as="div" key={index} className="py-1">
                  {({ open }) => (
                    <div className="border rounded-md p-4">
                      <dt>
                        <Disclosure.Button className="flex w-full items-start justify-between text-left primary-text">
                          <span className="text-xl font-semibold leading-7">
                          {item?.title}
                          </span>
                          <span className="ml-6 flex h-7 items-center">
                            {open ? (
                              <ArrowUpCircleIcon
                                className="h-7 w-7 text-green-500"
                                aria-hidden="true"
                              />
                            ) : (
                              <ArrowDownCircleIcon
                                className="h-7 w-7 text-blue-500"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="div" className="mt-2 flex items-center justify-between">
                        <div className="flex items-center justify-around gap-1">
                          <PlayCircleIcon className="w-6 h-6 text-blue-500" />
                        <p className="primary-text lg:text-xl">
                          Have A nice Day Guru. Boy moy choy
                        </p>
                        </div>
                        <LockClosedIcon className="w-5 h-5 text-blue-500" />
                      </Disclosure.Panel>
                    </div>
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

export default Coursecontents;
