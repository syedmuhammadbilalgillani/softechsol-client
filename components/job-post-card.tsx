import { Job } from '@/app/generated/prisma/client'
import React from 'react'

const JobPostCard = ({ job }: { job: Job }) => {
  return (
    <div>
        <h3>{job.title}</h3>
        <p>{job.description}</p>
        <p>{job.location}</p>
        <p>{job.salary_min ? `${job.salary_min} - ${job.salary_max}` : 'N/A'}</p>
        <p>{job.salary_currency}</p>
        <p>{job.experience_level ? job.experience_level : 'N/A'}</p>
        <p>{job.job_type ? job.job_type : 'N/A'}</p>
        <p>{job.status ? job.status : 'N/A'}</p>
        <p>{job.is_featured ? job.is_featured : 'N/A'}</p>
        <p>{job.application_url ? job.application_url : 'N/A'}</p>
        <p>{job.application_email ? job.application_email : 'N/A'}</p>
    
    </div>
  )
}

export default JobPostCard