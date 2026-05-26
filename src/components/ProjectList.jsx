import React from 'react'
import ProjectCard from './ProjectCard.jsx';

function ProjectList({ projects, setProjects, setOptimisticProjects, triggerRefetch }) {
    console.log(projects)
    if (!projects) return null;

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
            </section>
        </>
    )
}

export default ProjectList;