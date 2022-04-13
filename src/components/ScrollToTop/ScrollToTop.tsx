import React, { useState } from 'react';
import "./ScrollToTop.css";

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  window.onscroll = () => {
    if (document.documentElement.scrollTop > 300) {
    setVisible(true);
    } else {
    setVisible(false);
    }
  };

  const srollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  if (visible) {
    return (       
        <div className = "scrollToTopConatiner" >
            <div className="scrollToTopButton" onClick={srollToTop}>
                <div className="arrowUp"></div>
            </div>
        </div>
      )   
    }

    return (null)   
  
}

export default ScrollToTop
