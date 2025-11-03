import React, { useState, useEffect } from "react";

const IsLogedin = ({ logged, children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Update state when prop 'logged' changes
  useEffect(() => {
    if (logged) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [logged]);

  return <>{isLoggedIn ? children : null}</>;
};

export default IsLogedin;
