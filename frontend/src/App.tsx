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
import { LoginLayout } from "./layout/Login";
import { Dashboard } from "./layout/Dashboard";

function RedirectHome() {
  return <Navigate to="/login" replace />;
}

function RedirectReservations() {
  return <Navigate to="/reservations" replace />;
}

function Routing() {
  const isLoggedIn = useSelector(({ user }: any) => !!user.data);
  return (
    <>
      {isLoggedIn ? (
        <Router>
          <Routes>
            <Route path="/reservations">
              <Route path="/reservations" element={<Dashboard />} />
              <Route path="*" element={<NoMatch />} />
            </Route>
            <Route path="*" element={<RedirectReservations />} />
          </Routes>
        </Router>
      ) : (
        <Router>
          <Routes>
            <Route path="/login" element={<LoginLayout />}>
              <Route path="*" element={<LoginView />} />
            </Route>
            <Route path="*" element={<RedirectHome />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <LoadSession>
          <Routing />
        </LoadSession>
      </ApolloProvider>
    </Provider>
  );
}
