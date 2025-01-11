import React, { useEffect, useState } from "react";
import axios from "axios";

const DataPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = "sundar_buscuit_admin_user";
        const password = "0";
        const authToken = btoa(`${username}:${password}`); // Base64 encoding

        const response = await axios.get(
          "https://distribution.byteelephants.com/api/distributiondevelop/v1/country",
          {
            headers: {
              Authorization: `Basic ${authToken}`,
            },
          }
        );

        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data. Please check your credentials or API access.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Data Page</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataPage;
