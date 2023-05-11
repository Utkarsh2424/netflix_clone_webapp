import React, { useState, useEffect } from 'react';
import './Nav.css';

function Nav() {
    const [show, handleshow] = useState(false);
    
//when the scroll is 100 px down the nav bar appears in black
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleshow(true);
      } else handleshow(false);
    });
    //Removing the event listener can be so important in some cases 
    //as you don't want the event to get triggered multiple times without any reason
    // return () => {
    //   window.removeEventListener("scroll");
    // };
  }, []);

  return (
    //if the nav goes past 100px it shows the nav in black color all the way
    <div className={`nav ${show && "nav_black"}`}>
        <img
            className="nav_logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/250px-Netflix_2015_logo.svg.png"
            alt="Netflix Logo"
        />
        <img
            className="nav_avatar"
            src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"
            alt="Netflix Logo"
        />

    </div>
  );
}

export default Nav;