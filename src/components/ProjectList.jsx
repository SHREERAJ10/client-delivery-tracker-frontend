import React from 'react'
import ProjectCard from './ProjectCard.jsx';
import ProjectCardSkeleton from './ProjectCardSkeleton.jsx';

function ProjectList({ isLoading, projects, setProjects, triggerRefetch }) {

    if (isLoading) return (
        <section className="flex flex-col gap-y-8">
            {Array.from({ length: 4 }, (_, i) => i).map((el, i) => {
                return <ProjectCardSkeleton key={i} />
            })}
        </section>
    )
    return (
        <>
            <section className="flex flex-col gap-y-8">
                {projects?.items?.length != 0 ?
                    <>
                        {projects?.items?.map((project) => {
                            return (
                                <ProjectCard
                                    key={project.id}
                                    {...project}
                                    setProjects={setProjects}
                                    triggerRefetch={triggerRefetch}
                                />
                            );
                        })}
                    </> :
                    <p className="py-6 text-center text-base italic text-gray-400">
                        No Projects Found!
                    </p>
                }
            </section >
        </>
    )
}

export default ProjectList;