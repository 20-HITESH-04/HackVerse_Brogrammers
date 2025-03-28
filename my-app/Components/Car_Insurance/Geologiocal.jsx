import React, { useState, useEffect } from 'react';

const GetGeolocation = () => {
  const [error, setError] = useState(null);
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [policyNumber, setPolicyNumber] = useState('');
  const [claimAddress, setClaimAddress] = useState('');
  const [claimDateTime, setClaimDateTime] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Improved Validation Functions
  const validatePolicyNumber = (number) => {
    const policyRegex = /^[A-Za-z0-9]{6,20}$/;
    return policyRegex.test(number);
  };

  const validateClaimAddress = (address) => {
    return address.trim().length >= 3;
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const info = {
            deviceLatitude: position.coords.latitude,
            deviceLongitude: position.coords.longitude,
            deviceDateTime: new Date().toISOString(),
          };
          setDeviceInfo(info);
        },
        (err) => {
          setError('Geolocation access denied. Please enable location services.');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      setError('Geolocation not supported by this browser');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('');
    setError(null);

    // Comprehensive Validation
    if (!validatePolicyNumber(policyNumber)) {
      setError('Policy number must be 6-20 alphanumeric characters');
      return;
    }

    if (!validateClaimAddress(claimAddress)) {
      setError('Please provide a valid claim address');
      return;
    }

    if (!claimDateTime) {
      setError('Please select a claim date and time');
      return;
    }

    if (!deviceInfo) {
      setError('Device location information is required');
      return;
    }

    const payload = {
      policyNumber,
      claimAddress,
      claimDateTime: new Date(claimDateTime).toISOString(),
      ...deviceInfo,
    };

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/location/verify-policy-claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Submission failed');
      }

      const result = await response.json();
      
      setSubmitStatus('Claim Successfully Received');
      console.log(result);
      
      // Reset form fields
      setPolicyNumber('');
      setClaimAddress('');
      setClaimDateTime('');
    } catch (error) {
      setSubmitStatus('');
      setError(error.message || 'Error submitting claim');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Policy Claim Submission
        </h1>
        
        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="policyNumber" className="block text-gray-700 font-bold mb-2">
              Policy Number
            </label>
            <input
              type="text"
              id="policyNumber"
              value={policyNumber}
              onChange={(e) => setPolicyNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter policy number"
              required
              pattern="[A-Za-z0-9]{6,20}"
              title="Policy number must be 6-20 alphanumeric characters"
            />
          </div>
          <div>
            <label htmlFor="claimAddress" className="block text-gray-700 font-bold mb-2">
              Claim Location
            </label>
            <input
              type="text"
              id="claimAddress"
              value={claimAddress}
              onChange={(e) => setClaimAddress(e.target.value)}
              placeholder="Mumbai, India"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              minLength={3}
            />
          </div>
          <div>
            <label htmlFor="claimDateTime" className="block text-gray-700 font-bold mb-2">
              Claim Date and Time
            </label>
            <input
              type="datetime-local"
              id="claimDateTime"
              value={claimDateTime}
              onChange={(e) => setClaimDateTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 disabled:opacity-50"
          >
            {isLoading ? 'Submitting...' : 'Submit Claim'}
          </button>
        </form>
        
        {submitStatus && (
          <div className="mt-4 text-center">
            <p className="text-green-600 font-bold">{submitStatus}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetGeolocation;