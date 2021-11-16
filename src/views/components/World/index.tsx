import React, { useEffect, useRef } from "react";
import Umbrella, { HoverType } from "@/assets/lib/umbrella";

export type WorldProps = {
  hover?: HoverType;
};

const World: React.FC<WorldProps> = function ({ children, hover }) {
  const world = useRef<HTMLDivElement>();
  const scene = useRef<HTMLDivElement>();

  useEffect(() => {
    if (world.current && scene.current)
      new Umbrella({
        world: world.current,
        scene: scene.current,
        hover,
      });
  }, [world, scene]);
  return (
    <div
      ref={world}
      className="umbrella-world absolute left-0 top-0 w-full h-full"
    >
      <div ref={scene} className="umbrella-scene w-full h-full">
        {children}
      </div>
    </div>
  );
};
export default World;
