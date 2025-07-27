import { JOB_API_END_POINT } from '@/constant/constant';
import { setAllJobs } from '@/redux/jobSlice';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios'; // ✅ Don't forget this import!

const useGetAllJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get`, {
          withCredentials: true,
        });
        dispatch(setAllJobs(res.data.jobs));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllJobs();
  }, []);
};

export default useGetAllJobs;
