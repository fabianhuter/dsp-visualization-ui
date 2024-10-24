import { useState, useEffect } from "react";
import Chart from "./components/Chart";
import { SineWaveData } from "./types/types"


function App() {


  const [data, setData] = useState<SineWaveData[]>([]);

  
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/hello'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result: SineWaveData[] = await response.json();
      setData(result); // Assuming the API returns an array of objects
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  console.log(data);


  return (
    <>
      <p>Response from RestBed: </p>
      <Chart data={data} />
      <button onClick={fetchData}>Fetch</button>
    </>
  );
}

export default App
