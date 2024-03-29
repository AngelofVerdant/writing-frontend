import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/helpers';

const useDependencyDropdown = (preselectedCountyId, preselectedSubcountyId) => {
  const [counties, setCounties] = useState([]);
  const [subcounties, setSubcounties] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    const fetchCounties = async () => {
      const { data } = await axios.get(`${BASE_URL}/counties/all`);
      setCounties(data.data.counties);
    };

    fetchCounties();
  }, []);

  useEffect(() => {
    if (preselectedCountyId) {
      handleCountyChange(preselectedCountyId);
    }
  }, [preselectedCountyId]);

  useEffect(() => {
    if (preselectedSubcountyId) {
      handleSubcountyChange(preselectedSubcountyId);
    }
  }, [preselectedSubcountyId]);

  const handleCountyChange = async (countyId) => {
    const { data } = await axios.get(`${BASE_URL}/counties/subcounties/${countyId}`);
    setSubcounties(data.data.subcounties);
    setWards([]);
  };

  const handleSubcountyChange = async (constituencyId) => {
    const { data } = await axios.get(`${BASE_URL}/subcounties/wards/${constituencyId}`);
    setWards(data.data.wards);
  };

  return {
    counties,
    subcounties,
    wards,
    handleCountyChange,
    handleSubcountyChange,
  };
};

export default useDependencyDropdown;