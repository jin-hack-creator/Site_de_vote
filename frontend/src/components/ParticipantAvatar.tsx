import React from 'react';

interface AvatarProps {
  name: string;
}

// Simple hashing function to get a color from a string
const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
};

const getInitials = (name: string) => {
    const names = name.split(' ');
    const firstName = names[0] || '';
    const lastName = names[names.length - 1] || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

const ParticipantAvatar: React.FC<AvatarProps> = ({ name }) => {
  const initials = getInitials(name);
  const backgroundColor = stringToColor(name);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100">
      <rect width="100" height="100" fill="${backgroundColor}"></rect>
      <text x="50" y="50" font-family="'Poppins', sans-serif" font-size="40" dy=".35em" fill="#ffffff" text-anchor="middle">${initials}</text>
    </svg>
  `;

  const dataUrl = `data:image/svg+xml;base64,${btoa(svg)}`;

  return <img src={dataUrl} alt={`Avatar for ${name}`} />;
};

export default ParticipantAvatar;
