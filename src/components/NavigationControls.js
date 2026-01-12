import React from "react";
import { useHistory } from "react-router-dom";

function NavigationControls() {
  const history = useHistory();

  return (
    <div>
      <button type="button" onClick={() => history.goBack()}>
        Back
      </button>

      <button type="button" onClick={() => history.goForward()}>
        Forward
      </button>
    </div>
  );
}

export default NavigationControls;
