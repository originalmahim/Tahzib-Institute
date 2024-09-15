import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Disclosure } from "@headlessui/react";
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { PlayCircleIcon } from "@heroicons/react/20/solid";

const CourseStart = ({ darkTheme, courses }) => {
  const { id } = useParams();
  const course = courses.find((course) => course.id === id);
  const [allOpen, setAllOpen] = useState(false);
  const [vedioTitle, setVedioTitle] = useState('');
  const [vedioDescription , setVedioDescription] = useState('');
  const [vedioUrl, setVedioUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAllOpen(true);
  }, []);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      if (course?.chapters?.length > 0) {
        const firstChapter = course.chapters[0];
        if (firstChapter?.content?.length > 0) {
          setVedioTitle(firstChapter.content[0]?.title);
          setVedioDescription(firstChapter.content[0]?.description?.text || '');
          setVedioUrl(firstChapter.content[0]?.vediolink);
        }
        setLoading(false);
      }
    }); 
  }, [course]);

  return (
    <div className={!darkTheme ? "dark" : "light"}>
      <div className="sec-background lg:h-[90vh] h-auto">
        <div className="h-[60px]"></div>
        <div className="flex max-w-7xl px-4 lg:px-0 mx-auto flex-col lg:flex-row lg:justify-around lg:items-center">
          <motion.div
            whileInView={{ x: [-50, 0], opacity: [0, 1] }}
            transition={{ duration: 0.1 }}
            className="w-full lg:w-[57%] flex flex-col items-center lg:items-start"
          >
            <div className="w-full">
              {loading ? (
                <Skeleton className="lg:mt-36 mt-16" baseColor="#202020" highlightColor="#444" height={36} width="100%" />
              ) : (
                <motion.h1
                  whileInView={{ opacity: [0, 1], x: [-50, 0] }}
                  transition={{ duration: 0.1 }}
                  className="lg:text-4xl text-3xl primary-text font-bold mt-16 mb-2"
                >
                  <span className="textGradient">{vedioTitle}</span>
                </motion.h1>
              )}
              <div className="rounded-md">
                {loading ? (
                  <Skeleton  baseColor="#202020" highlightColor="#444" height={360} width="100%" />
                ) : (
                  <iframe
                    src={`https://player.cloudinary.com/embed/?public_id=${vedioUrl}&cloud_name=dfq61lhkc&player[autoplay]=true&player[controls]=true&player[showJumpControls]=true&player[showLogo]=false&player[fluid]=true&player[controlBar][volumePanel]=false`}
                    className="rounded-md lg:w-[730px] w-full lg:h-[420px] h-[250px]"
                    allow="autoplay; fullscreen; encrypted-media;"
                    allowfullscreen
                    frameborder="0"
                  ></iframe>
                )}
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <button className="btn gap-1 flex items-center justify-center bg-blue-400 p-2 text-white">
                    <ArrowLeftIcon className="w-4 h-4 text-3xl text-white" />
                    Previous
                  </button>
                </div>
                <div>
                  <button className="btn gap-1 flex items-center justify-center bg-blue-400 p-2 text-white">
                    Next
                    <ArrowRightIcon className="w-4 h-4 text-3xl text-white" />
                  </button>
                </div>
              </div>
              <div className="my-4">
                {loading ? (
                  <Skeleton baseColor="#202020" highlightColor="#444" height={24} count={2} />
                ) : (
                  <p className="primary-text text-lg">
                    {vedioDescription}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
          <motion.div
            id="Leftcol"
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="ans-col w-full hidden lg:grid md:grid h-auto lg:w-[40%]"
          >
            <h2 className="text-2xl mt-2 primary-text">কোর্সের পরিপূর্ণ কারিকুলাম</h2>
            <div className="ans-col my-3 h-[40vh]">
              <div className="my-2 sec-background">
                <div>
                  <div className="w-full">
                    <div className="w-full">
                      <dl className="mt-2">
                        {loading ? (
                          <Skeleton baseColor="#202020" highlightColor="#444" height={60} count={8} />
                        ) : (
                          course?.chapters?.map((chapter, chapterIndex) => (
                            <Disclosure as="div" key={chapterIndex} className="py-1" defaultOpen={allOpen}>
                              {({ open }) => (
                                <div className="border rounded-md p-4">
                                  <dt>
                                    <Disclosure.Button className="flex w-full items-start justify-between text-left primary-text">
                                      <span className="text-xl font-semibold leading-7">
                                        {chapter?.title}
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
                                  <Disclosure.Panel as="div" className="mt-2">
                                    {chapter?.content?.map((contentItem, contentIndex) => (
                                      <button
                                        key={contentIndex}
                                        className="flex items-center justify-between my-2"
                                        onClick={() => {
                                          setVedioTitle(contentItem?.title);
                                          setVedioDescription(contentItem?.description?.text);
                                          setVedioUrl(contentItem?.vediolink);
                                        }}
                                      >
                                        <div className="flex gap-1">
                                          <PlayCircleIcon
                                            className={`w-6 h-6 text-blue-500 ${
                                              vedioTitle === contentItem?.title ? 'text-green-500' : ''
                                            }`}
                                          />
                                          <p
                                            className={`primary-text lg:text-xl text-left ${
                                              vedioTitle === contentItem?.title ? 'text-green-500' : 'hover:text-green-400'
                                            }`}
                                          >
                                            {contentItem?.title}
                                          </p>
                                        </div>
                                      </button>
                                    ))}
                                  </Disclosure.Panel>
                                </div>
                              )}
                            </Disclosure>
                          ))
                        )}
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CourseStart;
