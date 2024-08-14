// Check if the user is logged in
export const isLoggedIn = () => {
    let data = localStorage.getItem("data");
    return data !== null; // Returns true if data is not null, indicating a logged-in user
  };
  
  
  export const doLogin = (data, next) => {
    localStorage.setItem("data", JSON.stringify(data)); // Store user data in local storage
    if (typeof next === "function") {
      next(); // Execute the callback function, if provided
    }
  };
  

  export const doLogout = (next) => {
    localStorage.removeItem("data"); // Remove user data from local storage
    if (typeof next === "function") {
      next(); // Execute the callback function, if provided
    }
  };
  
  // Get the current logged-in user's data
  export const getCurrentUser = () => {
    let data = localStorage.getItem("data");
    if (data !== null) {
      return JSON.parse(data); // Parse and return the user data if it exists
    } else {
      return null; // Return null if no user data is found
    }
  };
  