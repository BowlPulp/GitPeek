import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../App.css';

const ProfilePage = () => {
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [reposData, setReposData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResponse = await fetch(`https://api.github.com/users/${username}`);
        const profile = await profileResponse.json();
        setProfileData(profile);

        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
        const repos = await reposResponse.json();
        setReposData(repos);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [username]);

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

  return (
    <div className="flex flex-col items-center min-h-screen w-full p-8 animated-gradient text-white mt-16">
      {profileData && (
        <div id="profile" className="w-full max-w-4xl mb-8 p-6 bg-gray-800 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-shrink-0">
              <img
                className="rounded-full w-32 h-32 mb-4 md:mb-0 md:mr-8"
                src={profileData.avatar_url}
                alt="Profile Avatar"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-semibold mb-2">{profileData.name}</h1>
              <p className="text-lg mb-2">{profileData.bio}</p>
              <p className="text-sm mb-2">Location: {profileData.location || 'N/A'}</p>
              <p className="text-sm mb-2">Repositories: {profileData.public_repos}</p>
              <p className="text-sm mb-2">Followers: {profileData.followers}</p>
              <p className="text-sm mb-2">Following: {profileData.following}</p>
              <p className="text-sm mb-2">GitHub User Since: {formatDate(profileData.created_at)}</p>
              <p className="text-sm">Last Active: {formatDate(profileData.updated_at)}</p>
            </div>
          </div>
        </div>
      )}

      {reposData.length > 0 && (
        <div id="repositories" className="w-full max-w-4xl">
          <h2 className="text-2xl font-semibold mb-4">Repositories</h2>
          {reposData.map((repo) => (
            <div key={repo.id} className="py-4 border-b border-gray-700">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-white hover:text-red-400"
              >
                {repo.name}
              </a>
              <p className="text-sm text-gray-400">{repo.description || 'No description available'}</p>
              <div className="flex gap-4 text-sm text-gray-200">
                <span>Language: {repo.language || 'N/A'}</span>
                <span>Stars: {repo.stargazers_count}</span>
                <span>Forks: {repo.forks}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
