import Button from '@/components/Button.jsx';
import DeliverableOverviewTable from '@/components/DeliverableOverviewTable.jsx'
import Filter from '@/components/Filter.jsx';
import SearchBar from '@/components/SearchBar.jsx';
import { SidebarTrigger } from '@/components/ui/sidebar.jsx';
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
    const [deliverableType, setDeliverableType] = useState(type || "");
    const currPage = Number(searchParams.get("page") || 1);
    const itemsPerPage = 10;

    useEffect(() => {
        (async () => {
            const data = await getData(user, `/dashboard/deliverables/?page=${currPage}&pageSize=10${type ? `&type=${type}` : ""}`);
            setDeliverables(data);
        })();
    }, [searchParams]);

    const handlePageChange = (newPage) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", newPage);
        setSearchParams(params);
    };

    return (
        <div className="px-4 md:px-10 pt-8 pb-6 flex flex-col gap-6">
            <div className="flex items-center gap-x-5">
                <SidebarTrigger className="lg:hidden" />
                <h1 className="text-2xl font-bold">Search Deliverables</h1>
            </div>
            <section className="flex justify-between flex-col items-start sm:flex-row sm:justify-between sm:items-center gap-4">
                <SearchBar placeholder="Search deliverables by client, project, deliverable name or status..." currPage={currPage} setSearchResult={setDeliverables} route={deliverablesRoute} />
                <Filter options={filterOptions} value={deliverableType} onChange={(value) => {
                    const params = new URLSearchParams(searchParams);
                    setDeliverableType(value);
                    if (value != "") {
                        params.set("type", value);
                        setSearchParams(params);
                    }
                    else {
                        searchParams.delete("type");
                        setSearchParams(searchParams);
                    }
                }} />
            </section>

            <DeliverableOverviewTable deliverables={deliverables.items} type={type} />
            <div className="flex justify-around">
                <Button
                    className="px-4 py-3 border-2 border-black hover:text-[#111] hover:bg-white transition-colors duration-150 font-semibold uppercase"
                    onClick={() =>
                        handlePageChange(currPage > 1 ? currPage - 1 : currPage)
                    }
                >
                    previous
                </Button>
                <Button
                    id="forward"
                    className="px-4 py-3 border-2 border-black hover:text-[#111] hover:bg-white transition-colors duration-150 font-semibold uppercase"
                    onClick={() =>
                        handlePageChange(
                            deliverables != null &&
                                deliverables.totalCount > currPage * itemsPerPage
                                ? currPage + 1
                                : currPage,
                        )
                    }
                >
                    Next
                </Button>
            </div>
        </div>
    )
}

export default DeliverablesPage