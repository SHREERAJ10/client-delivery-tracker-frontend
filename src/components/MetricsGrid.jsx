import AuthContext from "@/context/AuthContext.jsx";
import { getData } from "@/utils/api.js";
import { useContext, useEffect, useState } from "react";

function MetricsGrid() {
  const { user } = useContext(AuthContext);
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getData(user, "/dashboard");
      setMetrics(data);
    })();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 font-primary">

      {metrics.slice(0, 3).map((item) => (
        <div key={item.key} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-none shadow-sm flex flex-col justify-center items-start pl-4 md:pl-8 py-10">
          <span className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest">
            {item.label}
          </span>
          <span className="text-5xl font-extrabold text-black dark:text-white tracking-tight mt-4">
            {item.value}
          </span>
        </div>
      ))}

      {metrics.length > 0 && (
        <div className="bg-white dark:bg-black pl-4 md:pl-8 border-2 border-black dark:border-gray-800 flex flex-col justify-center rounded-none shadow-sm">
          <span className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest block mb-4">
            {metrics[metrics.length - 1].label}
          </span>
          <div className="flex flex-col items-start gap-1">
            <span className="text-5xl font-bold text-black dark:text-white tracking-tight">
              {metrics[metrics.length - 1].value}
            </span>
            {metrics[metrics.length - 1].value > 1 && <span class="text-xs text-white bg-black px-2 py-2 font-bold tracking-widest uppercase">ACTION REQUIRED</span>}

          </div>

        </div>
      )}
    </div>
  );
}

export default MetricsGrid;
