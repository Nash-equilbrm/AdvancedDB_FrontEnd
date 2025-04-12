import React from 'react';

interface AvatarProps {
  color?: string;
  size?: number;
  className?: string;
  hexColor?: string; // Hex color code
}

const generateRandomColor = (seed: string): string => {
  // Use the seed to generate a consistent color for the same input
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Generate a color using the hash
  const color = Math.floor(Math.abs(Math.sin(hash) * 16777215));
  return '#' + color.toString(16).padStart(6, '0');
};

const Avatar: React.FC<AvatarProps> = ({
  color = '#3b82f6', // Tailwind blue-500
  size = 45,
  className = '',
  hexColor = '#FF0000' // Default to red
}) => {
  // Use hex color if provided, otherwise use random color
  const avatarColor = hexColor.startsWith('#') ? hexColor : `#${hexColor}`;

  return (
    <svg
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="User Avatar"
      width={size}
      height={size}
      className={className}
      style={{
        color: color,
      }}
    >
      <g>
        <circle cx="64" cy="64" r="64" fill={avatarColor} />
        <g>
            <path fill="#fff"
                d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z" />
            <path fill="#fff"
                d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24" />
        </g>
    </g>
    </svg>
  );
};

export default Avatar;
