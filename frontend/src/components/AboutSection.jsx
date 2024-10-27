import { useState } from "react";


const AboutSection = ({userData, isOwnProfile, onSave}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [about, setAbout] = useState(userData.about || "");

  const handleSave = () => {
    onSave({about});
    setIsEditing(false);
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">About</h2>

      {isEditing ? (
        <>
          <textarea
            className="w-full border rounded-md p-2"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            rows={4}
          />
          <button
            className="mt-2 bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded transition duration-300"
            onClick={handleSave}
          >
            Save
          </button>
        </>
      ) : (
        <>
          <p>{userData.about || "No information provided."}</p>
          {/* Render the Edit button only if it's the user's own profile */}
          {isOwnProfile && (
            <button
              className="text-primary hover:text-primary-dark transition duration-300"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default AboutSection