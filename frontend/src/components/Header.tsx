import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "../store/user";

export const Header = () => {
  const user = useSelector(({ user }: any) => user.data);

  const dispatch = useDispatch();

  const logoutUserDispatch = useCallback(
    () => dispatch(logoutUser()),
    [dispatch]
  );

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container d-flex align-items-center">
        <a className="navbar-brand" href="/">
          <img src="/apple-touch-icon.png" alt="logo" width="50" height="50" />
          <span className="p-3">Cola Day</span>
        </a>
        <div className="ms-auto d-flex justify-content-between">
          <div className="dropdown">
            <button
              className="btn dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {<FontAwesomeIcon icon={faUserCircle} size="3x" />}
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="dropdownMenuButton1"
            >
              <li>
                <span className="dropdown-item-text text-uppercase">
                  {user.firstName} - {user.organization?.name}
                </span>
              </li>
              <li>
                <p onClick={logoutUserDispatch} className="dropdown-item">
                  Log Out
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
