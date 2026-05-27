import React from 'react'
import ProjectCard from './ProjectCard.jsx';
import ProjectCardSkeleton from './ProjectCardSkeleton.jsx';

function ProjectList({ projects, setProjects, setOptimisticProjects, triggerRefetch }) {

    if (!projects) return (
        <section className="flex flex-col gap-y-8">
            {Array.from({ length: 4 }, (_, i) => i).map((el, i) => {
                return <ProjectCardSkeleton key={i} />
            })}
        </section>
    )
    return (
        <>
            <section className="flex flex-col gap-y-8">
                {projects?.items?.length != 0
                    && projects?.items?.map((project) => {
                        return (
                            <ProjectCard
                                key={project.id}
                                {...project}
                                setOptimisticProjects={setOptimisticProjects}
                                setProjects={setProjects}
                                triggerRefetch={triggerRefetch}
                            />
                        );
                    })
                }
            </section >
        </>
    )
}

export default ProjectList;