import { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export function ProductThree() {
  const [wasteReqData, setWasteReqData] = useState([]);

  useEffect(() => {
    // Fetch waste request data when the component mounts
    const fetchWasteReqData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/getInnovativeProd", { withCredentials: true });
        setWasteReqData(response.data);
      } catch (error) {
        console.error("Error fetching waste request data:", error);
      }
    };

    fetchWasteReqData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {wasteReqData.map((wasteReq, index) => (
        <Link to={`/product/${wasteReq._id}`} key={index}>
        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <img src={wasteReq.image} alt="Waste Request" className="w-96 h-72 object-cover" />
          <div className="p-4">
            <h5 className="text-lg font-semibold mb-2">{wasteReq.title}</h5>
            <p className="text-gray-700 text-sm">{wasteReq.description}</p>
            {/* Add more details here */}
          </div>
        </div>
        </Link>
      ))}
    </div>
  );
}