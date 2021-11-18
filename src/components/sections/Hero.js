import React, { useState } from "react";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";
import ButtonGroup from "../elements/ButtonGroup";
import Button from "../elements/Button";
import Image from "../elements/Image";
import Modal from "../elements/Modal";
import app from "../../utils/firebase-config";
import firebase from "firebase";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Link } from "react-scroll";

const propTypes = {
  ...SectionProps.types,
};

const defaultProps = {
  ...SectionProps.defaults,
};

const Hero = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  isAuth,
  setIsAuth,
  ...props
}) => {
  const [videoModalActive, setVideomodalactive] = useState(false);

  const navigate = useNavigate();

  const openModal = (e) => {
    e.preventDefault();
    setVideomodalactive(true);
  };

  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  };

  const outerClasses = classNames(
    "hero section center-content",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "hero-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );
  const [loader, setLoader] = React.useState({
    microsoftLoading: false,
  });
  const [error, setError] = React.useState({
    message: "",
    open: false,
  });

  const handleMicrosoftLogin = () => {
    setLoader((prevState) => ({ ...prevState, microsoftLoading: true }));
    const provider = new firebase.auth.OAuthProvider("microsoft.com");
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((data) => {
        setIsAuth(true);
        const goToChatPage = () => navigate("/chatroom");
        goToChatPage();
        // }
        setLoader((prevState) => ({ ...prevState, microsoftLoading: false }));
      })
      .catch((e) => {
        console.log(e, "error");
        setLoader((prevState) => ({ ...prevState, microsoftLoading: false }));
      });
  };
  return (
    <section {...props} className={outerClasses}>
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1
              className="mt-0 mb-16 reveal-from-bottom"
              data-reveal-delay="200"
            >
              MUJ <span className="">Connect</span>
            </h1>
            <div className="container-xs">
              <p
                className="m-0 mb-32 reveal-from-bottom"
                data-reveal-delay="400"
              >
                Connect and chat with random people from MUJ! Get started by
                verifying your identity with your college credentials.
              </p>
              <div className="reveal-from-bottom" data-reveal-delay="600">
                <ButtonGroup>
                  <Button
                    tag="a"
                    color="primary"
                    wideMobile
                    onClick={() => handleMicrosoftLogin()}
                    style={{ cursor: "pointer" }}
                  >
                    Login with Microsoft
                  </Button>
                  <Button tag="a" color="dark" wideMobile href="">
                    <Link to="LearnMore" spy={true} smooth={true}>
                      Learn More
                    </Link>
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
          <div
            className="hero-figure reveal-from-bottom illustration-element-01"
            data-reveal-value="20px"
            data-reveal-delay="800"
          >
            <Image
              className="has-shadow"
              src={require("./../../assets/images/video-placeholder.png")}
              alt="Hero"
              width={896}
              height={504}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;
