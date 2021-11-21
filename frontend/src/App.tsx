import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/index";
import { NoMatch } from "./views/NoMatch";
import { Login } from "./views/Login";
import { Reservation } from "./views/Reservation";

function Routing() {
  //TODO: wire up login to simple redux
  const isLoggedIn = true;

  return (
    <>
      {isLoggedIn ? (
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="reservations" element={<Reservation />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Router>
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route>
              <Route element={<NoMatch />} />
              <Navigate to="/" />
            </Route>
          </Routes>
        </Router>
      )}
    </>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Routing />
    </ApolloProvider>
  );
}
