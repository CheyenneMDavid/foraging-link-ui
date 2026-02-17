import React from "react";
import { useHistory } from "react-router-dom";
import styles from "../styles/NavigationControls.module.css";

function NavigationControls() {
  const history = useHistory();

  return (
    <div className={styles.controls}>
      <button type="button" onClick={() => history.goBack()}>
        <i className="fas fa-arrow-left"></i>
      </button>
    </div>
  );
}

export default NavigationControls;
