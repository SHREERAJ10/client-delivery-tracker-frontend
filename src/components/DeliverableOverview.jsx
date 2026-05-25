import React, { useContext, useEffect, useState } from "react";
import DeliverableOverviewTable from "./DeliverableOverviewTable.jsx";
import AuthContext from "@/context/AuthContext.jsx";
import { getData } from "@/utils/api.js";
import { NavLink } from "react-router-dom";

function DeliverableOverview({ heading, deliverableRoute, type }) {
  const { user } = useContext(AuthContext);
  const [deliverableData, setDeliverableData] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getData(user, deliverableRoute);
      setDeliverableData(data);
    })();
  }, []);

  return (
    <section className="w-full">
      <div className="flex justify-between">
        <h2 className="font-primary text-[#313131] font-semibold text-base lg:text-xl mb-4">
          {heading}
        </h2>
        <NavLink to={`/deliverables/?type=${type}`} className="text-blue-500 font-secondary text-sm lg:text-base font-semibold hover:underline">
          View all
        </NavLink>
      </div>
      <DeliverableOverviewTable deliverables={deliverableData.items} type={type} />
    </section>
  );
}

export default DeliverableOverview;
