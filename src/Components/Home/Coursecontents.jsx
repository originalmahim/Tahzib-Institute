import { LockClosedIcon, PlayCircleIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';

const Coursecontents = ({ course }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <div>
      {course?.chapters?.map((item, index) => (
        <div key={index} className={`flex border rounded-md my-3 p-4 text-xl items-center justify-between hover:bg-slate-500 ${activeIndex===index&&'bg-transparent'}`}>
          <h1 className='primary-text hover:text-green-500'> {index + 1} . {item?.title}</h1>
          {activeIndex===index? <PlayCircleIcon className='h-6 w-6 text-green-500'/> : <LockClosedIcon className='h-6 w-6 text-blue-500'/> }
          
        </div>
      ))}
    </div>
  );
};

export default Coursecontents;
