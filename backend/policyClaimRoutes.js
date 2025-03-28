// policyClaimRoutes.js
const express = require('express');
const PolicyClaimService = require('./policyClaimSevice');

function createPolicyClaimRoutes(opencageApiKey) {
  const router = express.Router();
  const policyClaimService = new PolicyClaimService(opencageApiKey);

  router.post('/verify-policy-claim', async (req, res) => {
    try {
      const result = await policyClaimService.verifyPolicyClaim(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ 
        status: 'ERROR', 
        message: error.message 
      });
    }
  });

  return router;
}

module.exports = createPolicyClaimRoutes;