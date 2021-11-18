import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

const FooterNav = ({ className, ...props }) => {
  const classes = classNames("footer-nav", className);

  return (
    <nav {...props} className={classes}>
      <ul className="list-reset">
        <li>
          <a target="_blank" href="https://forms.gle/6uJvgX9Vidj81wtW6">
            Provide your valuable feedback!
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default FooterNav;
