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
      <div className="flex justify-between border-b border-black mb-6">
        <h2 className="text-black font-bold text-base lg:text-xl mb-4 uppercase">
          {heading}
        </h2>
        <NavLink to={`/deliverables/?type=${type}`} className="text-black font-secondary text-sm font-semibold hover:underline uppercase">
          View all
        </NavLink>
      </div>
      <DeliverableOverviewTable deliverables={deliverableData.items} type={type} />
    </section>
  );
}

export default DeliverableOverview;
