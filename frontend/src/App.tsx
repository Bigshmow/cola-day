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
            <Route path="/" element={<Reservation />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Router>
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<LoginView />} />
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
