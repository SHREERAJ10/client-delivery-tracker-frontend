import AuthContext from '@/context/AuthContext.jsx';
import { getData } from '@/utils/api.js';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Stats from './Stats.jsx';
import { BriefcaseBusiness, SquareActivity, SquareCheck } from 'lucide-react';

const icons = {
    totalDeliverables: <BriefcaseBusiness />,
    completed: <SquareCheck />,
    projectHealth: <SquareActivity />,
};

function DeliverableStats({ refetchTrigger }) {
    const { clientId, projectId } = useParams();
    const [stats, setStats] = useState([]);
    const { user } = useContext(AuthContext);
    useEffect(() => {
        (async () => {
            const deliverableStats = await getData(user, `/client/${clientId}/project/${projectId}/deliverable/status`);
            setStats(deliverableStats);
        })();
    }, [refetchTrigger]);

    return (

        <section className="flex flex-col lg:flex-row gap-y-6 justify-between">
            {stats?.map((stat) => (
                <Stats item={stat} key={stat.key} icons={icons} />
            ))}
        </section>

    )
}

export default DeliverableStats