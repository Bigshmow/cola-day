import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Footer = () => {
  return (
    <footer>
      <p>
        <span>
          <FontAwesomeIcon icon={faCopyright} /> 2021 Copyright:{" "}
        </span>
        <span className="text-nowrap">Devin Stewart</span>
      </p>
      <p>Cola Day Technical</p>
    </footer>
  );
};
