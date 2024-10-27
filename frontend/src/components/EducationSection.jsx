import { School, X } from "lucide-react";
import { useState } from "react";


const EducationSection = ({userData, isOwnProfile, onSave}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [educations, setEducations] = useState(userData.education || []);
  const [newEducation, setNewEducation] = useState({
    school: "",
    fieldOfStudy: "",
    startYear: "",
    endYear: ""
  });

  const handleAddEducation = () => {
    if (newEducation.school && newEducation.fieldOfStudy && newEducation.startYear) {
      setEducations([...educations, newEducation]);
      setNewEducation({
        school: "",
        fieldOfStudy: "",
        startYear: "",
        endYear: ""
      });
    }
  };

  const handleDeleteEducation = (id) => {
    setEducations(educations.filter((edu) => edu._id !== id));
  };

  const handleSave = () => {
    onSave({education: educations});
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Education</h2>
      {educations.map((edu, index) => (
        <div key={edu._id || index} className="mb-4 flex justify-between items-start">
          <div className="flex items-start">
            <School size={20} className="mt-1 mr-2" />
            <div>
              <h3 className="font-semibold">{edu.fieldOfStudy}</h3>
              <p className="font-gray-600">{edu.school}</p>
              <p className="text-gray-500 text-sm">
                {edu.startYear} - {edu.endYear || "Present"}
              </p>
            </div>
          </div>
          {isEditing && (
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDeleteEducation(edu._id)}
            >
              <X size={20} />
            </button>
          )}
        </div>
      ))}

      {isEditing &&(
        <div className="mt-4">
          <input
            type="text"
            placeholder="School"
            className="w-full border rounded-md p-2 mb-2"
            value={newEducation.school}
            onChange={(e) =>
              setNewEducation({ ...newEducation, school: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Field of study"
            className="w-full border rounded-md p-2 mb-2"
            value={newEducation.fieldOfStudy}
            onChange={(e) =>
              setNewEducation({ ...newEducation, fieldOfStudy: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Start year"
            className="w-full border rounded-md p-2 mb-2"
            value={newEducation.startYear}
            onChange={(e) =>
              setNewEducation({ ...newEducation, startYear: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="End year"
            className="w-full border rounded-md p-2 mb-2"
            value={newEducation.endYear}
            onChange={(e) =>
              setNewEducation({ ...newEducation, endYear: e.target.value })
            }
          />
          <button
            className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded tranasition duration-300"
            onClick={handleAddEducation}
          >
            Add Education
          </button>
        </div>
      )}

      {isOwnProfile && (
        <>
          {isEditing ? (
            <button
              className="mt-4 bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded transition duration-300"
              onClick={handleSave}
            >
              Save Changes
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)}
              className="mt-4 hover:text-primary-dark text-primary transition duration-300">
              Edit Education
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default EducationSection