// UserPasswordForm
// Based on the Code Institute "Moments" walkthrough project,
// adapted for this application.
// Allows a logged-in user to update their password.
// Access is restricted to the profile owner.

import React, { useEffect, useState } from "react";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

const UserPasswordForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const currentUser = useCurrentUser();

  // Controlled form state for the password fields
  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });
  const { new_password1, new_password2 } = userData;

  // Stores validation errors returned from the API
  const [errors, setErrors] = useState({});

  // Updates form state as the user types
  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    // Redirect if the logged-in user does not match
    // the profile id in the URL
    if (currentUser?.profile_id?.toString() !== id) {
      history.push("/");
    }
  }, [currentUser, history, id]);

  // Submits the password change request
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.post("/dj-rest-auth/password/change/", userData);
      history.goBack();
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <Row>
      <Col className="py-2 mx-auto text-center" md={6}>
        <Container className={appStyles.content}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>New password</Form.Label>
              <Form.Control
                placeholder="new password"
                type="password"
                value={new_password1}
                onChange={handleChange}
                name="new_password1"
              />
            </Form.Group>

            {errors?.new_password1?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Form.Group>
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                placeholder="confirm new password"
                type="password"
                value={new_password2}
                onChange={handleChange}
                name="new_password2"
              />
            </Form.Group>

            {errors?.new_password2?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            {/* Cancel returns to the previous page without submitting */}
            <Button
              type="button"
              className={`${btnStyles.button} ${btnStyles.blue}`}
              onClick={() => history.goBack()}
            >
              cancel
            </Button>

            {/* Save submits the form */}
            <Button
              type="submit"
              className={`${btnStyles.button} ${btnStyles.blue}`}
            >
              save
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default UserPasswordForm;
