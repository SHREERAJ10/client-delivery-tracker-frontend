import Button from '@/components/Button.jsx';
import DeliverableOverviewTable from '@/components/DeliverableOverviewTable.jsx'
import Filter from '@/components/Filter.jsx';
import SearchBar from '@/components/SearchBar.jsx';
import { SidebarTrigger } from '@/components/ui/sidebar.jsx';
import AuthContext from '@/context/AuthContext.jsx';
import { getData } from '@/utils/api.js';
import React, { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';

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

function SearchDeliverablesPage() {
    const { user } = useContext(AuthContext);
    const [deliverables, setDeliverables] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const type = searchParams.get('type');
    const [searchTerm, setSearchTerm] = useState(searchParams.get('searchQuery') || "");
    const [deliverableType, setDeliverableType] = useState(type || "");
    const currPage = Number(searchParams.get("page") || 1);
    const searchQuery = searchParams.get('searchQuery');
    const [isLoading, setIsLoading] = useState(true);

    const itemsPerPage = 10;

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            let url = `/dashboard/deliverables/?page=${currPage}&pageSize=10`;
            if (type) {
                url += `&type=${type}`
            }
            if(searchQuery){
                url+=`&searchQuery=${searchQuery}`
            }
            const data = await getData(user, url);
            setDeliverables(data);
            setIsLoading(false);
        })();
    }, [searchQuery, type, currPage]);

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
                <SearchBar placeholder="Search deliverables by client, project, deliverable name or status..." searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchParams={searchParams} setSearchParams={setSearchParams} />
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

            <DeliverableOverviewTable isLoading={isLoading} deliverables={deliverables.items} type={type} skeletonRows={10} />
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

export default SearchDeliverablesPage;