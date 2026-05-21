import React, { useState } from 'react';
import { Lock, LockOpen } from '@phosphor-icons/react';

/**
 * JoinLockToggle
 * TailwindCSS-based toggle that transitions between locked/unlocked icons.
 * Props:
 * - initialLocked: boolean
 * - size: number (px)
 * - onChange: (locked) => void
 */
const JoinLockToggle = ({ initialLocked = true, size = 48, onChange }) => {
  const [locked, setLocked] = useState(initialLocked);

  const handleToggle = () => {
    const next = !locked;
    setLocked(next);
    if (onChange) onChange(next);
  };

  const wrapperStyle = { width: size, height: size };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-pressed={!locked}
      aria-label={locked ? 'Unlock join panel' : 'Lock join panel'}
      title={locked ? 'Locked' : 'Unlocked'}
      className="inline-flex items-center justify-center p-1 rounded-md text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
    >
      <span className="relative inline-block" style={wrapperStyle}>
        <Lock
          size={size}
          weight="duotone"
          className={`absolute inset-0 w-full h-full transition-opacity transition-transform duration-300 transform origin-[50%_38%] ${locked ? 'opacity-100 translate-y-0 scale-100 rotate-0' : 'opacity-0 -translate-y-2 scale-95 -rotate-12'}`}
        />
        <LockOpen
          size={size}
          weight="duotone"
          className={`absolute inset-0 w-full h-full transition-opacity transition-transform duration-300 transform origin-[50%_38%] ${locked ? 'opacity-0 -translate-y-2 scale-95 -rotate-12' : 'opacity-100 translate-y-0 scale-100 rotate-0'}`}
        />
      </span>
    </button>
  );
};

export default JoinLockToggle;
