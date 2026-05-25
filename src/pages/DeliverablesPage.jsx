import DeliverableOverviewTable from '@/components/DeliverableOverviewTable.jsx'
import SearchBar from '@/components/SearchBar.jsx';
import AuthContext from '@/context/AuthContext.jsx';
import { getData } from '@/utils/api.js';
import React, { useContext, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';

const deliverablesRoute = "/dashboard/deliverables";

function DeliverablesPage() {
    const { user } = useContext(AuthContext);
    const [deliverables, setDeliverables] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const currPage = Number(searchParams.get("page") || 1);
    const itemsPerPage = 10;
    const type = searchParams.get('type');
    console.log(deliverables)   

    useEffect(() => {
        (async () => {
            const data = await getData(user, `/dashboard/deliverables/?page=${currPage}&type=${type}`);
            setDeliverables(data);
        })();
    }, [searchParams]);

    const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage });
    };

    return (
        <div>
            <SearchBar placeholder="Search deliverables by name or status..." currPage={currPage} setSearchResult={setDeliverables} route={deliverablesRoute} />
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