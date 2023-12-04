import { createContext, useState } from "react";

// creates context for managing page state with default values
export const PageContext = createContext({
  page: "", // current page
  setPage: (page) => {}, // updates
});


export const PageLogic = ({ children }) => {
  const [page, setPage] = useState("home"); // state hook for current page, defaults to 'home'

  return (
    <PageContext.Provider value={{ page, setPage }}>
      {children}
    </PageContext.Provider>
  );
};
