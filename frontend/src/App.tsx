import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/index";

import { LoadSession } from "./controllers/Loader";
import { Provider, useSelector } from "react-redux";
import store from "./store";

import { LoginView } from "./views/Login";
import { NoMatch } from "./views/NoMatch";
import { LoginView } from "./views/Login";
import { Reservation } from "./views/Reservation";

function RedirectHome() {
  return <Navigate to="/" replace />;
}

function Routing() {
  const isLoggedIn = useSelector(({ user }: any) => !!user.data);
  return (
    <>
      {isLoggedIn ? (
        <Router>
          <Routes>
            <Route path="/" element={<LoginView />} />
            <Route path="reservations" element={<Reservation />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Router>
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<LoginView />} />
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
