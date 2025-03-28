"use client";

import React from "react";

const CarDamageAnalysisResults = ({ analysisData }) => {
  if (!analysisData || !analysisData.analysis) return null; // Ensure valid data

  const { carBrand, carModel, detectedParts, repairEstimate, severity, images, total_repair_cost } = analysisData.analysis; // Fix here

  return (
    <div className="mt-6 p-6 bg-white shadow-lg rounded-lg border border-gray-300">
      <h2 className="text-xl font-bold mb-4 text-center text-blue-700">Car Damage Analysis Report</h2>

      {/* Car Details */}
      <div className="mb-4 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold">Car Details</h3>
        <p><strong>Brand:</strong> {carBrand || "N/A"}</p>
        <p><strong>Model:</strong> {carModel || "N/A"}</p>
      </div>

      {/* Damage Assessment */}
      <div className="mb-4 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold">Damage Assessment</h3>
        <p><strong>Severity:</strong> <span className={`font-bold ${severity === "severe" ? "text-red-600" : "text-yellow-600"}`}>{severity}</span></p>

        {detectedParts && Object.keys(detectedParts).length > 0 ? (
          <ul className="list-disc list-inside mt-2">
            {Object.entries(detectedParts).map(([part, count], index) => (
              <li key={index} className="mt-1 text-red-600">
                {part} - <strong>{count} detected</strong>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-green-600">✅ No major damages detected!</p>
        )}
      </div>

      {/* Repair Cost Breakdown */}
      {repairEstimate && repairEstimate.parts_breakdown && (
        <div className="mb-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold">Repair Cost Breakdown</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-200">
                <th className="border border-gray-400 p-2">Part</th>
                <th className="border border-gray-400 p-2">Count</th>
                <th className="border border-gray-400 p-2">Price per Part</th>
                <th className="border border-gray-400 p-2">Total Cost</th>
                <th className="border border-gray-400 p-2">Critical</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(repairEstimate.parts_breakdown).map(([part, details], index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-400 p-2">{part}</td>
                  <td className="border border-gray-400 p-2">{details.count}</td>
                  <td className="border border-gray-400 p-2">₹{details.price_per_part}</td>
                  <td className="border border-gray-400 p-2 font-semibold">₹{details.total_part_cost}</td>
                  <td className={`border border-gray-400 p-2 ${details.is_critical ? "text-red-600 font-bold" : "text-green-600"}`}>
                    {details.is_critical ? "Yes" : "No"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Total Repair Cost */}
      {total_repair_cost && (
        <div className="p-4 bg-gray-100 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-gray-800">Estimated Total Repair Cost</h3>
          <p className="text-2xl font-bold text-red-500">₹{total_repair_cost}</p>
        </div>
      )}

      {images && images.length > 0 && (
  <div className="mb-4 p-4 bg-gray-100 rounded-lg">
    <h3 className="text-lg font-semibold">Uploaded Images</h3>
    <div className="grid grid-cols-2 gap-4">
      {images.map((imgSrc, index) => {
        // Remove "uploads\" and extract the filename
        const formattedSrc = `../../../backend/${imgSrc.replace(/\\/g, "/")}`;
        console.log("Formatted Image Source:", formattedSrc);

        return (
          <img 
            key={index} 
            src={`${formattedSrc}`} 
            alt={`Uploaded ${index}`} 
            className="rounded-lg shadow-md w-full" 
          />
        );
      })}
    </div>
  </div>
)}

    </div>
  );
};

export default CarDamageAnalysisResults;
