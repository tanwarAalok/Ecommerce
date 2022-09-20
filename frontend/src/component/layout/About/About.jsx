import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@mui/material";
import { LinkedIn, Instagram } from "@mui/icons-material";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.instagram.com/enig.matic14/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Me</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dw2dqblhs/image/upload/v1661664529/avatars/bt8gjoirppuvrxl9xocs.jpg"
              alt="Founder"
            />
            <Typography>Aalok Singh Tanwar</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>This is a MERN stack ecommerce project.</span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">My Socials</Typography>
            <a
              href="https://www.linkedin.com/in/aalok-tanwar-1230631b8/"
              target="blank"
            >
              <LinkedIn className="linkedInSvgIcon" />
            </a>

            <a href="https://www.instagram.com/enig.matic14/" target="blank">
              <Instagram className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
