import { createContext, useState } from "react";

// creates context for managing page state with default values
export const PageContext = createContext({
  page: "", // current page identifier
  setPage: (page) => {}, // updates current page
});

// PageLogic component acts as a context provider for the current page's state
export const PageLogic = ({ children }) => {
  const [page, setPage] = useState("items"); // state hook for current page, defaults to 'items'

  // provides the page state and updater function to child components
  return (
    <PageContext.Provider value={{ page, setPage }}>
      {children}
    </PageContext.Provider>
  );
};
