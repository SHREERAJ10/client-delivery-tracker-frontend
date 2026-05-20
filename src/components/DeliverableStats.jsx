import AuthContext from '@/context/AuthContext.jsx';
import { getData } from '@/utils/api.js';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function DeliverableStats({refetchTrigger}) {
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-4 bg-gray-50 rounded-xl">
            {stats?.map((item) => (
                <div
                    key={item.key}
                    className="flex flex-col justify-center p-6 bg-white border border-gray-100 rounded-lg shadow-sm"
                >
                    {/* Label */}
                    <span className="font-secondary text-xs font-semibold tracking-wider text-gray-400 uppercase mb-2">
                        {item.label}
                    </span>

                    {/* Value (handles both item.value and item.data keys) */}
                    <span className="font-primary text-3xl font-bold text-gray-800">
                        {item.value ?? item.data ?? '—'}
                    </span>
                </div>
            ))}
        </div>
    )
}

export default DeliverableStats