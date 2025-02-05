import React, { useState, useEffect } from "react";

const LetsBuild = () => {
  const words = ["TECH", "BUZZ", "COLL", "SMART", "BIG"]; // Words for transitions
  const images = [
    "https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/64783ebdb52cf8fbc2c201fd_home-hero_03.avif",
    "https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/64783ebdb52cf8fbc2c201f7_home-hero_04.avif",
    "https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/64783ebdb52cf8fbc2c20200_home-hero_05.avif",
    "https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/64783ebdb52cf8fbc2c201f4_home-hero_01.avif",
    "https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/64783ebdb52cf8fbc2c201fa_home-hero_02.avif",
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [words.length, images.length]);

  const pageContainerStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "100vh",
    width: "100%",
    background: "#000",
    top: "0",
    left: "0",
    transform: "translate(0, 0)",
    overflow: "hidden",
    flexWrap: "wrap", // Allow wrapping on smaller screens
  };

  const leftSectionStyle = {
    width: "60%",
    height: "70%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    position: "relative",
    backgroundImage: `url("https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/64783f450dfdcf02d859f1c0_bg-card-hero_laptop.webp")`,
    backgroundSize: "84%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    marginLeft: "20px",
    marginTop: "8%",
  };

  const rightSectionStyle = {
    width: "30%",
    height: "70%",
    marginTop: "8%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    borderRadius: "12px",
    backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Gm7iDyKB4FY_HNqS1wxRUalz4ywmRTKqiQ&s')`,
    backgroundSize: "50%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const textSectionStyle = {
    fontSize: "clamp(2rem, 7vw, 6rem)",
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: "15%",
    marginBottom: "4%",
    textTransform: "uppercase",
    lineHeight: "100px",
    color: "#FFF",
    zIndex: 2,
  };

  const animatedTextStyle = {
    display: "inline-block",
    position: "relative",
    whiteSpace: "nowrap",
    overflow: "hidden",
  };

  const animatedLetterStyle = (index) => ({
    display: "inline-block",
    position: "relative",
    color: "#FFF",
    animation: `slideIn 0.5s ease forwards, fadeIn 0.5s ease forwards`,
    animationDelay: `${index * 0.1}s`,
    zIndex: 9999,
  });

  const animatedImageStyle = {
    width: "30%",
    height: "auto",
    objectFit: "cover",
    position: "absolute",
    top: "45%",
    left: "70%",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
    animation: `imageGrow 2s ease-in-out infinite alternate`,
  };

  const animationKeyframes = `
    @keyframes imageGrow {
      0% { width: 0px; }
      50% { width: 20%; }
      100% { width: 0px; }
    }
    @keyframes slideIn {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;

  return (
    <div style={pageContainerStyle}>
      <style>{animationKeyframes}</style>

      <div style={leftSectionStyle}>
        <h1 style={textSectionStyle}>
          LET'S BUILD
          <div
            style={{
              display: "flex",
              gap: "30px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <span>THE NEXT</span>
            <img
              src={images[currentImageIndex]}
              alt="Background"
              style={{ ...animatedImageStyle, flexShrink: 0 }}
            />
          </div>
          <span style={animatedTextStyle} key={currentWordIndex}>
            {words[currentWordIndex].split("").map((letter, index) => (
              <span key={index} style={animatedLetterStyle(index)}>
                {letter}
              </span>
            ))}{" "}
            THING
          </span>
        </h1>
      </div>

      {/* Right Section */}
      <div style={rightSectionStyle}></div>
    </div>
  );
};

export default LetsBuild;
