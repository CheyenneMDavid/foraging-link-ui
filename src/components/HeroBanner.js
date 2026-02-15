// Hero image that is used as a banner / link to the full list of courses.

import appStyles from "../App.module.css";
import styles from "../styles/HeroBanner.module.css";
import { Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function HeroBanner() {
  return (
    <Row className="h-100">
      <Col md={12}>
        <div className={`${appStyles.content} ${styles.hero}`}>
          <div className={styles.welcomeTint}>
            <h1>Welcome to The Foraging Link</h1>
            <NavLink to="/courses/full-list">
              <p className={styles.bannerText}>See All Courses</p>
            </NavLink>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default HeroBanner;
