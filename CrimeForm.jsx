import React, { useState } from "react";
import axios from "axios";

const CrimeForm = () => {
  const [crimeDetails, setCrimeDetails] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const response = await axios.post("http://localhost:5000/analyze-crime", { crimeDetails });

      setResponse(res.data.response);
    } catch (err) {
      setResponse("Error fetching legal details.");
    }
    
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", textAlign: "center" }}>
      <h2>Crime Analysis</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          cols="50"
          placeholder="Enter crime details..."
          value={crimeDetails}
          onChange={(e) => setCrimeDetails(e.target.value)}
          required
        />
        <br />
        <button type="submit" disabled={loading}>{loading ? "Analyzing..." : "Submit"}</button>
      </form>
      {response && (
        <div>
          <h3>Legal Analysis:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default CrimeForm;
