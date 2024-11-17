'use client';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import profile from '@/assest/images/profile.png';
import React, { useEffect, useState } from 'react';
import Card from '@/components/Card';
import coding from '@/assest/images/code.png';
import education from '@/assest/images/education.png';
import excercise from '@/assest/images/excercise.png';
import job from '@/assest/images/job.png';
import niche from '@/assest/images/niche.png';
import event from '@/assest/images/event.png';

const DashboardPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [quote, setQuote] = useState('');


  useEffect(() => {
    setIsMounted(true);
  }, []);


  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('https://dummyjson.com/quotes');
        if (response.ok) {
          const data = await response.json();
          console.log(data);

          setQuote(data.quotes[0]?.quote || 'No quote available');
        } else {
          console.error('Failed to fetch quote');
        }
      } catch (error) {
        console.error('Error fetching quote:', error.message);
      }
    };

    fetchQuote();
  }, []);
 



  return (
    <div>
      <Navbar />
      <div className='mt-16'>
        <div className='flex flex-1 justify-start items-center gap-1 pl-2'>
          <Image src={profile} alt='profile image' className='w-7 md:w-11' />
          <p className='text-2xl text-slate-600 pl-2'>
            <span className='font-bold'>Muhammad Saim</span>
          </p>
        </div>
        <div className='bg-cyan-300 w-40 ml-14 rounded-xl text-center mt-1'>
          <p className='text-white'>Have a Nice Day!</p>
        </div>
        <div className='h-auto '>
          <div className='mt-16 pl-2 w-auto '>
            <h3 className='text-sm text-gray-500'>Quote of The Day:</h3>
            <p className='text-xl text-slate-600 font-semibold'>{quote}</p>
          </div>
          <div className='mt-12 pl-2 flex gap-2 '>
            <Image src={niche} alt='niche' className='w-7' />
            <h2 className='font-bold text-slate-600 text-lg'>
              Select your Task Category:
            </h2>
          </div>
          <div className='flex flex-col justify-center items-center mt-2 md:w-auto md:flex-wrap md:flex-row md:gap-8 lg:mt-10'>
            <Card src={coding} value='Coding' tagline='Plan the coding task' alt='todoImg' />
            <Card src={job} value='Job Faculty' tagline='Plan your job task' alt='todoImg' />
            <Card src={event} value='Event Plan' tagline='Plan your event' alt='todoImg' />
            <Card src={education} value='Education' tagline='Plan your Study task' alt='todoImg' />
            <Card src={excercise} value='Health and Exercise' tagline='Plan the exercise time' alt='todoImg' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
