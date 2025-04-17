import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../App.css';

const ProfilePage = () => {
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [reposData, setReposData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const profileResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!profileResponse.ok) {
          throw new Error('User not found');
        }
        const profile = await profileResponse.json();
        setProfileData(profile);

        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
        const repos = await reposResponse.json();
        setReposData(repos);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full animated-gradient text-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-4"></div>
          <p className="text-xl">Loading profile data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full animated-gradient text-white">
        <div className="bg-red-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
          <p className="mt-4">Please check the username and try again</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen w-full p-4 md:p-8 animated-gradient text-white mt-16">
      {profileData && (
        <div id="profile" className="w-full max-w-4xl mb-8 overflow-hidden rounded-xl shadow-lg bg-gray-800 bg-opacity-80 backdrop-blur-sm">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="flex-shrink-0 mb-6 md:mb-0">
                <img
                  className="rounded-full w-36 h-36 border-4 border-gray-700 shadow-xl"
                  src={profileData.avatar_url}
                  alt={`${profileData.name || username}'s avatar`}
                />
              </div>
              <div className="md:ml-8 text-center md:text-left flex-grow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-1">{profileData.name || username}</h1>
                    <h2 className="text-xl text-gray-300 font-medium mb-4">@{username}</h2>
                  </div>
                  <a 
                    href={profileData.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center mb-4 md:mb-0"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.37 7.84 10.87.57.1.78-.25.78-.55v-2c-3.19.69-3.86-1.52-3.86-1.52-.52-1.34-1.28-1.7-1.28-1.7-1.05-.71.08-.7.08-.7 1.17.08 1.8 1.21 1.8 1.21 1.03 1.8 2.7 1.28 3.36.98.1-.75.4-1.28.72-1.57-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.3 1.18-3.1-.12-.3-.51-1.52.1-3.18 0 0 .97-.31 3.2 1.18.91-.26 1.88-.39 2.84-.39s1.93.13 2.84.39c2.23-1.49 3.2-1.18 3.2-1.18.61 1.66.22 2.88.1 3.18.73.8 1.18 1.84 1.18 3.1 0 4.43-2.68 5.41-5.24 5.7.41.35.76 1.05.76 2.12v3.14c0 .3.21.65.79.54A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
                    </svg>
                    View on GitHub
                  </a>
                </div>
                
                {profileData.bio && (
                  <p className="text-lg mb-4 italic">{profileData.bio}</p>
                )}
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {profileData.location && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      <span>{profileData.location}</span>
                    </div>
                  )}
                  {profileData.company && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                      </svg>
                      <span>{profileData.company}</span>
                    </div>
                  )}
                  {profileData.blog && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                      </svg>
                      <a href={profileData.blog.startsWith('http') ? profileData.blog : `https://${profileData.blog}`} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-blue-300 hover:text-blue-200 truncate max-w-xs">
                        {profileData.blog}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span>Joined {formatDate(profileData.created_at)}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Last active {formatDate(profileData.updated_at)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 bg-gray-900 bg-opacity-60 border-t border-gray-700">
            <div className="p-4 text-center border-r border-gray-700">
              <p className="text-2xl font-bold">{profileData.public_repos}</p>
              <p className="text-gray-400">Repositories</p>
            </div>
            <div className="p-4 text-center border-r border-gray-700">
              <p className="text-2xl font-bold">{profileData.followers}</p>
              <p className="text-gray-400">Followers</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-2xl font-bold">{profileData.following}</p>
              <p className="text-gray-400">Following</p>
            </div>
          </div>
        </div>
      )}

      {reposData.length > 0 && (
        <div id="repositories" className="w-full max-w-4xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Popular Repositories</h2>
            {profileData && profileData.public_repos > 10 && (
              <a 
                href={`https://github.com/${username}?tab=repositories`}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-200"
              >
                View all ({profileData.public_repos})
              </a>
            )}
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            {reposData.map((repo) => (
              <div 
                key={repo.id} 
                className="bg-gray-800 bg-opacity-80 rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow border border-gray-700 flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-3">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-semibold text-blue-300 hover:text-blue-200 truncate max-w-xs"
                  >
                    {repo.name}
                  </a>
                  {repo.private ? (
                    <span className="bg-gray-700 text-xs px-2 py-1 rounded-full">Private</span>
                  ) : (
                    <span className="bg-green-900 text-xs px-2 py-1 rounded-full">Public</span>
                  )}
                </div>
                
                {repo.description && (
                  <p className="text-gray-300 mb-4 flex-grow">{repo.description}</p>
                )}
                
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {repo.topics && repo.topics.slice(0, 3).map(topic => (
                      <span key={topic} className="bg-blue-900 bg-opacity-40 text-xs px-2 py-1 rounded-full">
                        {topic}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                    {repo.language && (
                      <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-blue-400 mr-1"></span>
                        <span>{repo.language}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z"></path>
                      </svg>
                      <span>{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
                      </svg>
                      <span>{repo.forks}</span>
                    </div>
                    {repo.updated_at && (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;