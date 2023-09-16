// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
  Button,
  CardBody,
  FormGroup,
  Col,
} from "reactstrap";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";

import Header from "components/Headers/Header.js";
import { useEffect, useState, useRef } from "react";
import { GET_BLOG_API, POST_BLOG_API, PUT_BLOG_API } from "core/apiEndpoints";
import { getPublicData, postPrivateData, putPrivateData } from "core/apiClient";
import { useParams } from "react-router-dom";

const UserCreateEdit = () => {
  const [data, setData] = useState({});
  const [dropdownKey, setDropdownKey] = useState(0);
  const { id } = useParams();

  const formRef = useRef(null);

  async function postBlog(body) {
    if (id) {
      await putPrivateData(`${PUT_BLOG_API + id}`, body)
        .then((response) => {
          toast.success(response.data.message);
        })
        .catch((err) => console.log(err));
    } else {
      await postPrivateData(POST_BLOG_API, body)
        .then((response) => {
          toast.success(response.data.message);
        })
        .catch((err) => console.log(err));
    }
  }

  async function getPost(ID) {
    await getPublicData(GET_BLOG_API + ID)
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getPost(id);
  }, [id]);

  const initialValues = {
    username: data.username || "",
    email: data.email || "",
    password: "",
    user_type: data.user_type || "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required"),
    email: Yup.string().required("This field is required"),
    user_type: Yup.string().required("This field is required"),
    password: Yup.string().required("This field is required"),
  });

  const handleSubmitMethod = (values, { resetForm }) => {
    postBlog(values);
    resetForm();
    setDropdownKey(dropdownKey + 1);
    formRef.current.reset();
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">USER {id ? "EDIT" : "CREATE"}</h3>
              </CardHeader>
              <CardBody className="child_div_center">
                <Col className="order-xl-1" xl="8">
                  <Card className="bg-secondary shadow">
                    <CardBody>
                      <Formik
                        enableReinitialize
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmitMethod}
                      >
                        {(formikProps) => (
                          <Form
                            onSubmit={formikProps.handleSubmit}
                            ref={formRef}
                          >
                            <h6 className="heading-small text-muted mb-4">
                              Create User
                            </h6>
                            <div className="pl-lg-4">
                              <Row>
                                <Col md="12">
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-address"
                                    >
                                      Name
                                    </label>
                                    <Field
                                      className="form-control form-control-alternative"
                                      id="input-address"
                                      name="username"
                                      placeholder="Name"
                                      type="text"
                                    />
                                    <ErrorMessage
                                      name="username"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </FormGroup>
                                </Col>

                                <Col md="12">
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-address"
                                    >
                                      Email
                                    </label>
                                    <Field
                                      className="form-control form-control-alternative"
                                      id="input-address"
                                      name="email"
                                      placeholder="Email"
                                      type="email"
                                    />
                                    <ErrorMessage
                                      name="email"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </FormGroup>
                                </Col>

                                <Col md="6">
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-address"
                                    >
                                      Password
                                    </label>
                                    <Field
                                      className="form-control form-control-alternative"
                                      id="input-address"
                                      name="password"
                                      placeholder="Password"
                                      type="password"
                                    />
                                    <ErrorMessage
                                      name="password"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </FormGroup>
                                </Col>
                                <Col md="6">
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-address"
                                    >
                                      Confirm Password
                                    </label>
                                    <Field
                                      className="form-control form-control-alternative"
                                      id="input-address"
                                      name="password"
                                      placeholder="Confirm Password"
                                      type="password"
                                    />
                                    <ErrorMessage
                                      name="password"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                            </div>

                            <hr className="my-4" />
                            <h6 className="heading-small text-muted mb-4">
                              User Permission
                            </h6>

                            <div className="pl-lg-4">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-title"
                                >
                                  Select User Type
                                </label>
                                <Select
                                  key={dropdownKey}
                                  type="text"
                                  className="form-control-alternative"
                                  name="user_type"
                                  onChange={(selectedOption) => {
                                    formikProps.setFieldValue(
                                      "user_type",
                                      selectedOption?.value
                                    );
                                  }}
                                  options={[
                                    { label: "GOST", value: "gost" },
                                    { label: "Admin", value: "Admin" },
                                  ]}
                                  onBlur={formikProps.handleBlur}
                                  menuPortalTarget={document.body}
                                  isSearchable
                                  isClearable
                                />
                                <ErrorMessage
                                  name="user_type"
                                  component="div"
                                  className="text-danger"
                                />
                              </FormGroup>
                              <Button type="submit" className="btn btn-primary">
                                Submit
                              </Button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </CardBody>
                  </Card>
                </Col>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default UserCreateEdit;
