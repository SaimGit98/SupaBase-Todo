'use client'

import Navbar from '@/components/Navbar';
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import FormModal from '@/components/FormModal';
import ladytodo from '@/assest/images/ladytodo.jpg';
import Image from 'next/image';
import { supabase } from '@/client';
import Swal from "sweetalert2";
import Preloader from '@/components/Preloader/Preloader';


const ClientOnlyComponent = ({ category, setCategory }) => {
    const params = useSearchParams();
    const value = params.get('value'); 

    useEffect(() => {
        if (value) {
            setCategory(value);
        } else {
            setCategory('');
        }
    }, [value]);

    return (
        <div>
            <p className='text-3xl font-bold pl-2'>{category}</p>
            <FormModal />
        </div>
    );
};

const DetailPage = () => {
    const [fetch, setFetch] = useState([]);
    const [loading, setLoading] = useState(false);
    const [taskAdded, setAddedTask] = useState(false);
    const [category, setCategory] = useState('');

   
    const getData = async () => {
        if (!category) return;

        setLoading(true);
        const { data, error } = await supabase
            .from('tasktable')
            .select('*')
            .eq('category', category);

        if (error) {
            console.error('Error:', error);
        } else {
            setFetch(data);
        }
        setLoading(false);
    };



    useEffect(() => {
        if (category) {
            getData();
            setAddedTask(false);
        }
    }, [category]);

    const deleted = async (id) => {
        console.log(id);
        try {
            const { error } = await supabase
                .from('tasktable')
                .delete()
                .eq('id', id);

            if (error) {
                throw error;
            }

            Swal.fire("Task Deleted successfully");
            getData();
        } catch (error) {
            console.error('Error deleting task:', error.message);
            alert('Failed to delete task. Please try again.');
        }
    };

    return (
        <>
            <div>
                <Navbar />
                <div className=''>
                    <div className='flex justify-start items-center mt-16'>
                        <Image src={ladytodo} alt='ladyImg' className='w-28' />
                        <Suspense fallback={<Preloader />}>
                            <ClientOnlyComponent category={category} setCategory={setCategory} />
                        </Suspense>
                    </div>

                    <div className='mt-8 rounded-lg h-screen'>
                        <h1 className='text-2xl pt-4 pl-4 text-slate-600 font-semibold'>Your Task:</h1>
                        {loading ? (
                            <Preloader />
                        ) : (
                            <div className='mt-4 bg-cyan-100 rounded-lg flex justify-center md:w-2/3 md:m-auto md:mt-5 lg:w-1/3'>
                                {fetch.length > 0 ? (
                                    <ul className='pl-2 pt-3 h-auto w-96 list-disc pb-5'>
                                        {fetch?.map((v, i) => {
                                            return (
                                                <li key={i} className='pb-4'>
                                                    <div className='flex justify-between items-center'>
                                                        <p className='text-lg font-semibold'>{v?.task}</p>
                                                        <button
                                                            className='bg-red-500 py-1 px-3 rounded-lg text-white font-semibold'
                                                            onClick={() => deleted(v.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                    <p className='text-sm'>{v?.des}</p>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                ) : (
                                    <p className='text-lg font-semibold'>No Task Added</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailPage;
