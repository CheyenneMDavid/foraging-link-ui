// Hero image that is used as a banner / link to the full list of courses.

import appStyles from "../App.module.css";
import styles from "../styles/HeroBanner.module.css";
import { Row, Col } from "react-bootstrap";

function HeroBanner() {
  return (
    <Row className="h-100">
      <Col md={12}>
        <div className={`${appStyles.Content} ${styles.Hero}`}>
          <div className={styles.WelcomeTint}>
            <h1>Welcome to The Foraging Link</h1>
            <a href="/courses/full-list">
              <p className={styles.BannerText}>See All Courses</p>
            </a>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default HeroBanner;
