import DeliverableOverviewTable from '@/components/DeliverableOverviewTable.jsx'
import Filter from '@/components/Filter.jsx';
import SearchBar from '@/components/SearchBar.jsx';
import AuthContext from '@/context/AuthContext.jsx';
import { getData } from '@/utils/api.js';
import React, { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';

const deliverablesRoute = "/dashboard/deliverables";
const filterOptions = [
    {
        id: crypto.randomUUID(),
        status: "upcoming"
    },
    {
        id: crypto.randomUUID(),
        status: "overdue"
    },
]

function DeliverablesPage() {
    const { user } = useContext(AuthContext);
    const [deliverables, setDeliverables] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const type = searchParams.get('type');
    const [deliverableType, setDeliverableType] = useState(type);
    const currPage = Number(searchParams.get("page") || 1);
    const itemsPerPage = 10;

    useEffect(() => {
        (async () => {
            const data = await getData(user, `/dashboard/deliverables/?page=${currPage}${type ? `&type=${type}` : ""}`);
            setDeliverables(data);
        })();
    }, [searchParams]);

    const handlePageChange = (newPage) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", newPage);
        setSearchParams(params);
    };

    return (
        <div>
            <section className="flex justify-between gap-4 px-7">
                <SearchBar placeholder="Search deliverables by client, project, deliverable name or status..." currPage={currPage} setSearchResult={setDeliverables} route={deliverablesRoute} />
                <Filter options={filterOptions} value={deliverableType} onChange={(value) => {
                    setDeliverableType(value);
                    if (value != "") {
                        setSearchParams({ type: value });
                    }
                    else {
                        searchParams.delete("type");
                        setSearchParams(searchParams);
                    }
                }} />
            </section>

            <DeliverableOverviewTable deliverables={deliverables.items} type={type} />
            <div className="flex justify-around">
                <button
                    id="previous"
                    className="p-4 border border-black"
                    onClick={() =>
                        handlePageChange(currPage > 1 ? currPage - 1 : currPage)
                    }
                >
                    previous
                </button>
                <button
                    id="forward"
                    className="p-4 border border-black"
                    onClick={() =>
                        handlePageChange(
                            deliverables != null &&
                                deliverables.totalCount > currPage * itemsPerPage
                                ? currPage + 1
                                : currPage,
                        )
                    }
                >
                    forward
                </button>
            </div>
        </div>
    )
}

export default DeliverablesPage