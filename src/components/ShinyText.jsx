import React from "react";

const ShinyText = ({ text, disabled = false, speed = 5, className = "" }) => {
  const animationDuration = `${speed}s`;

  return (
    <>
      <style>{`
        .shiny-text {
          color:rgba(181, 188, 235, 0.64); /* Adjust this color to change intensity/style */
        background: linear-gradient(
        120deg,
        rgba(181, 188, 235, 0) 40%,
        rgba(181, 188, 235, 0.9) 50%,
        rgba(181, 188, 235, 0) 60%
      );

          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          display: inline-block;
          animation: shine 5s linear infinite;
        }

        @keyframes shine {
          0% {
            background-position: 100%;
          }
          100% {
            background-position: -100%;
          }
        }

        .shiny-text.disabled {
          animation: none;
        }
      `}</style>

      <div
        className={`shiny-text ${disabled ? "disabled" : ""} ${className}`}
        style={{ animationDuration }}
      >
        {text}
      </div>
    </>
  );
};

export default ShinyText;
