// ProfileEditForm
// Based on the Code Institute's "Moments" walkthrough project and,
// adapted for this application.
// Allows a logged-in user to update their profile details of
// name, bio and profile image.
// Access is restricted to the owner of the profile.

import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Form,
  Button,
  Col,
  Row,
  Image,
  Container,
  Alert,
} from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";

import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

import styles from "../../styles/ProfilePage.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

function ProfileEditForm() {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const history = useHistory();
  const imageFile = useRef();

  const [profileData, setProfileData] = useState({
    name: "",
    content: "",
    image: "",
  });
  const { name, content, image } = profileData;

  const [errors, setErrors] = useState({});

  // Auth check + fetch data
  useEffect(() => {
    const fetchData = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          setProfileData({
            name: data.name,
            content: data.content,
            image: data.image,
          });
        } catch (err) {
          history.push("/");
        }
      } else {
        history.push("/");
      }
    };
    fetchData();
  }, [currentUser, id, history]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      setProfileData({
        ...profileData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("content", content);

    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile.current.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setCurrentUser((prevUser) => ({
        ...prevUser,
        profile_image: data.image,
      }));
      history.push(`/profiles/${id}`);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row>
      <Col className="py-2 mx-auto text-center" md={10} lg={8}>
        <Container
          className={`${appStyles.content} ${styles.profileContainer}`}
        >
          <h2 className="mb-4">Edit Profile</h2>
          <Form onSubmit={handleSubmit}>
            {/* Avatar */}
            <Form.Group>
              {image && (
                <figure>
                  <Image
                    src={image}
                    roundedCircle
                    className={styles.profileImage}
                  />
                </figure>
              )}
              <Form.File
                className="mt-2"
                label="Change profile image"
                accept="image/*"
                name="image"
                ref={imageFile}
                onChange={handleChangeImage}
              />
              {errors?.image?.map((msg, idx) => (
                <Alert variant="warning" key={idx}>
                  {msg}
                </Alert>
              ))}
            </Form.Group>

            {/* Name */}
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
              />
              {errors?.name?.map((msg, idx) => (
                <Alert variant="warning" key={idx}>
                  {msg}
                </Alert>
              ))}
            </Form.Group>

            {/* Content */}
            <Form.Group>
              <Form.Label>About</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="content"
                value={content}
                onChange={handleChange}
              />
              {errors?.content?.map((msg, idx) => (
                <Alert variant="warning" key={idx}>
                  {msg}
                </Alert>
              ))}
            </Form.Group>

            {/* Buttons */}
            <Button
              className={`${btnStyles.button} ${btnStyles.black}`}
              type="submit"
            >
              Save Changes
            </Button>
            <Button
              type="button"
              className={`${btnStyles.button} ${btnStyles.blackOutline} ml-2`}
              onClick={() => history.goBack()}
            >
              Cancel
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
}

export default ProfileEditForm;
