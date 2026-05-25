import { useState } from "react";
import JoinLockToggle from "./JoinLockToggle";

export default function JoinLockToggleDemo() {
  const [locked, setLocked] = useState(true);

  return (
    <div className="flex items-center space-x-4">
      <JoinLockToggle initialLocked={locked} onChange={setLocked} />
      <span className="text-sm">
        {locked ? "Panel locked" : "Panel unlocked"}
      </span>
    </div>
  );
}
