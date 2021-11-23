import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Actions
import { checkSession } from "../store/user";

export function LoadSession({ children }) {
  const { isLoading, error } = useSelector(({ user }) => ({
    isLoading: user.isLoading,
    error: user.error,
  }));
  const dispatch = useDispatch();
  const checkSessionCallback = useCallback(() => dispatch(checkSession()), [
    dispatch,
  ]);

  useEffect(() => {
    dispatch(checkSession());
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return (
      <ViewError
        retry={checkSessionCallback}
        label="There was an error loading your session!"
      />
    );
  }

  return children;
}

export function Loading() {
  return <div>Loading</div>;
}

export function ViewError({ retry, label }) {
  return (
    <div>
      <h3>{label}</h3>
      <button type="button" onClick={retry}>
        Retry
      </button>
    </div>
  );
}
