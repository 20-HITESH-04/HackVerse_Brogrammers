// policyClaimService.js
const axios = require('axios');
const csv = require('csv-writer').createObjectCsvWriter;
const path = require('path');

class PolicyClaimService {
  constructor(opencageApiKey) {
    this.opencageApiKey = opencageApiKey;
  }

  // Geocoding service to convert address to coordinates
  async getGeolocation(address) {
    try {
      const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
        params: {
          q: address,
          key: this.opencageApiKey,
          limit: 1
        }
      });

      const location = response.data.results[0];
      return {
        lat: location.geometry.lat,
        lng: location.geometry.lng,
        city: location.components.city || location.components.town,
        country: location.components.country
      };
    } catch (error) {
      console.error('Geolocation Error:', error);
      return null;
    }
  }

  // Reverse geocoding to get address from coordinates
  async getReverseGeolocation(lat, lng) {
    try {
      const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
        params: {
          q: `${lat},${lng}`,
          key: this.opencageApiKey,
          limit: 1
        }
      });

      const location = response.data.results[0];
      return location.formatted;
    } catch (error) {
      console.error('Reverse Geolocation Error:', error);
      return '${lat}, ${lng}';
    }
  }

  // Calculate distance between two geo points
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const deg2rad = (deg) => deg * (Math.PI/180);
    
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  // Save claim details to CSV
  async saveToCSV(record) {
    const csvWriter = csv({
      path: path.join(__dirname, 'policy_claims.csv'),
      header: [
        {id: 'policyNumber', title: 'POLICY NUMBER'},
        {id: 'claimAddress', title: 'CLAIM ADDRESS'},
        {id: 'claimLatitude', title: 'CLAIM LATITUDE'},
        {id: 'claimLongitude', title: 'CLAIM LONGITUDE'},
        {id: 'claimDateTime', title: 'CLAIM DATETIME'},
        {id: 'deviceAddress', title: 'DEVICE ADDRESS'},
        {id: 'deviceLatitude', title: 'DEVICE LATITUDE'},
        {id: 'deviceLongitude', title: 'DEVICE LONGITUDE'},
        {id: 'deviceDateTime', title: 'DEVICE DATETIME'},
        {id: 'distance', title: 'DISTANCE (KM)'},
        {id: 'timeDifference', title: 'TIME DIFFERENCE (HOURS)'},
        {id: 'isSuspicious', title: 'SUSPICIOUS'}
      ],
      append: true
    });

    await csvWriter.writeRecords([record]);
  }

  // Verify policy claim
  async verifyPolicyClaim(policyData) {
    try {
      const claimLocation = await this.getGeolocation(policyData.claimAddress);
if (!claimLocation) {
    throw new Error('Failed to fetch claim location.');
}
      
      // Get device location from coordinates
      const deviceAddress = await this.getReverseGeolocation(
        policyData.deviceLatitude, 
        policyData.deviceLongitude
      );

      // Calculate distance
      const distance = this.calculateDistance(
        claimLocation.lat, claimLocation.lng, 
        parseFloat(policyData.deviceLatitude), 
        parseFloat(policyData.deviceLongitude)
      );

      // Calculate time difference
      const claimTime = new Date(policyData.claimDateTime);
      const deviceTime = new Date(policyData.deviceDateTime);
      const timeDifference = Math.abs(claimTime - deviceTime) / (1000 * 60 * 60); // hours

      // Determine suspiciousness based on distance and time
      const isSuspicious = (
        distance > (timeDifference * 500) // Assuming max speed of 500 km/h
      );

      // Prepare record for CSV
      const record = {
        policyNumber: policyData.policyNumber,
        claimAddress: policyData.claimAddress,
        claimLatitude: claimLocation.lat,
        claimLongitude: claimLocation.lng,
        claimDateTime: policyData.claimDateTime,
        deviceAddress: deviceAddress,
        deviceLatitude: policyData.deviceLatitude,
        deviceLongitude: policyData.deviceLongitude,
        deviceDateTime: policyData.deviceDateTime,
        distance: distance.toFixed(2),
        timeDifference: timeDifference.toFixed(2),
        isSuspicious: isSuspicious
      };

      // Save to CSV
      await this.saveToCSV(record);

      return {
        status: 'RECEIVED',
        details: record
      };
    } catch (error) {
      console.error('Verification Error:', error);
      throw error;
    }
  }
}

module.exports = PolicyClaimService;