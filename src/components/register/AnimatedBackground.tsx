"use client";

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">

      {/* gradient */}
      <div className="absolute w-full h-full bg-gradient-to-br
        from-purple-900 via-black to-blue-900" />

      {/* animated glow */}
      <div className="absolute w-[600px] h-[600px] bg-purple-500
        opacity-30 blur-[150px] animate-pulse
        top-[-100px] left-[-100px]" />

      <div className="absolute w-[500px] h-[500px] bg-blue-500
        opacity-30 blur-[150px] animate-pulse
        bottom-[-100px] right-[-100px]" />

    </div>
  );
}