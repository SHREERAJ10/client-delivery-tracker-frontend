import React from 'react'
import ProjectCard from './ProjectCard.jsx';

function ProjectList({ projects }) {

    if (!projects) return null;

    return (
        <>
            <section className="px-6 flex flex-col gap-y-8">
                {projects?.items.length != 0
                    && projects?.items.map((project) => {
                        return (
                            <ProjectCard
                                key={project.id}
                                {...project}
                            />
                        );
                    })
                }
            </section>
        </>
    )
}

export default ProjectList;