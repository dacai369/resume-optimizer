import { Link } from 'react-router-dom';

interface Job {
  id: string;
  name: string;
  icon: string;
  description: string;
  salary: string;
  industry: string;
  requirements: string[];
  color: string;
}

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <Link 
      to={`/jobs/${job.id}`}
      className="group block"
    >
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
        <div className={`h-2 bg-gradient-to-r ${job.color}`}></div>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${job.color} flex items-center justify-center text-3xl shadow-md`}>
              {job.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-gray-900">
                {job.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-500">{job.industry}</span>
                <span className="text-sm text-green-600 font-semibold">{job.salary}</span>
              </div>
            </div>
          </div>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {job.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {job.requirements.slice(0, 2).map((req, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {req.length > 10 ? req.substring(0, 10) + '...' : req}
                </span>
              ))}
            </div>
            <div className="flex items-center text-indigo-600 font-semibold group-hover:text-indigo-700">
              了解更多
              <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
