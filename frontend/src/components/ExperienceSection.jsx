import { format, isValid, parseISO } from "date-fns";
import { Briefcase, X } from "lucide-react";
import { useState } from "react";


const ExperienceSection = ({userData, isOwnProfile, onSave}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [experiences, setExperiences] = useState(userData.experience || []);
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
    currentlyWorking: false,
  });

  const handleAddExperience = () => {
    if(newExperience.title && newExperience.company && newExperience.startDate) {
      setExperiences([...experiences, newExperience]);

      setNewExperience({
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
        currentlyWorking: false,
      })
    }
  };
  const handleDeleteExperience = (id) => {
    setExperiences(experiences.filter((exp) => exp._id !== id));
  };
  const handleSave = () => {
    onSave({experience: experiences});
    setIsEditing(false);
  };
  const handleCurrentlyWorkingChange = (e) => {
    setNewExperience({
      ...newExperience,
      currentlyWorking: e.target.checked,
      endDate: e.target.checked ? "" : newExperience.endDate,
    });
  };

  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return isValid(date) ? format(date, "MMM yyyy") : "Present";
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Experience</h2>
      {experiences.map((exp, index) => (
        <div key={exp._id || index} className="mb-4 flex justify-between items-start">
          <div className="flex items-start">
            <Briefcase size={20} className="mr-2 mt-1"/>
            <div>
              <h3 className="font-semibold">{exp.title}</h3>
              <p className="tet-gray-600">{exp.company}</p>
              <p>
                {formatDate(exp.startDate)} - {exp.endDate ?  formatDate(exp.endDate) : "Present"}
              </p>
              <p className="text-gray-700">{exp.description}</p>
            </div>
          </div>
          {isEditing && (
            <button
              onClick={() => handleDeleteExperience(exp._id)}
              className="text-red-500 hover:text-red-700"
            >
              <X size={20}/>
            </button>
          )}
        </div>
      ))}
      {isEditing && (
        <div>
          <input
            type="text"
            placeholder="Title"
            value={newExperience.title}
            onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
            className="w-full border rounded p-2 mb-2"
          />
          <input
            type="text"
            placeholder="Company"
            value={newExperience.company}
            onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
            className="w-full border rounded p-2 mb-2"
          />
          <input
            type="date"
            placeholder="Start Date"
            value={newExperience.startDate}
            onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
            className="w-full border rounded p-2 mb-2"
          />
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="currentlyWorking"
              checked={newExperience.currentlyWorking}
              onChange={handleCurrentlyWorkingChange}
              className="mr-2"
            />
            <label htmlFor="currentlyWorking">I currently work here</label>
          </div>
          {!newExperience.currentlyWorking && (
            <input
              type="date"
              placeholder="End Date"
              value={newExperience.endDate}
              onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
              className="w-full border rounded p-2 mb-2"
            />
          )}
          <textarea
            placeholder="Description"
            value={newExperience.description}
            onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
            className="w-full border rounded p-2 mb-2"
          />
          <button
            onClick={handleAddExperience}
            className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded transition duration-300"
          >
            Add Experience
          </button>
        </div>
      )}

      {isOwnProfile && (
        <>
          {isEditing ? (
            <button
              onClick={handleSave}
              className="mt-4 bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded transition duration-300"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-primary hover:text-primary-dark mt-4 transition duration-300"
            >
              Edit Experiences
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default ExperienceSection