import AuthContext from "@/context/AuthContext.jsx";
import { getData } from "@/utils/api.js";
import { useContext, useEffect, useState } from "react";

function  MetricsGrid() {
  const { user } = useContext(AuthContext);
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getData(user, "/dashboard");
      setMetrics(data);
    })();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

      {metrics.slice(0, 3).map((item) => (
        <div key={item.key} className="bg-white border rounded-lg p-4">
          <p className="text-sm text-gray-500 font-semibold font-primary">{item.label}</p>
          <p className="font-semibold text-xl">{item.value}</p>
        </div>
      ))}

      {metrics.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
          <p className="text-sm text-red-500 font-semibold font-primary">
            {metrics[metrics.length - 1].label}
          </p>
          <p className="font-semibold text-xl text-red-600">
            {metrics[metrics.length - 1].value}
          </p>
        </div>
      )}
    </div>
  );
}

export default MetricsGrid;
