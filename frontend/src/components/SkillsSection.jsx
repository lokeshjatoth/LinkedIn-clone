import { X } from "lucide-react";
import { useState } from "react";


const SkillsSection = ({userData, isOwnProfile, onSave}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [skills, setSkills] = useState(userData.skills || []);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if(newSkill && !skills.includes(newSkill)){
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  }

  const handleDeleteSkill = (id) => {
    setSkills(skills.filter((skill) => skill !== id));
  }

  const handleSave = () => {
    onSave({skills});
    setIsEditing(false);
  }


  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Skills</h2>
      <div className="flex flex-wrap">
        {skills.map((skill,index) => (
          <span
          key={skill._id ||index}
          className="bg-gray-200 text-gray-700 rounded-full py-1 px-3 m-1 text-sm mr-2 mb-2 items-center flex"
          >
            {skill}
            {isEditing &&(
              <button onClick={() => handleDeleteSkill(skill)}>
                <X size={14}/>
              </button>
            )}
          </span>
        ))}
      </div>

      {isEditing && (
        <div className="mt-4 flex">
          <input
            type="text"
            placeholder="New Skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="flex-grow p-2 border rounded-l"
          />
          <button
            onClick={handleAddSkill}
            className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-r transition duration-300"
          >
            Add Skill
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
              className="mt-4 hover:text-primary-dark text-primary  transition duration-300"
            >
              Edit Skills
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default SkillsSection