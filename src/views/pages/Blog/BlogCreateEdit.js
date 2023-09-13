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
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";

import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import { GET_BLOG_API } from "core/apiEndpoints";
import { getPublicData } from "core/apiClient";
import { useParams } from "react-router-dom";

const BlogCreateEdit = () => {
  const [data, setData] = useState({});
  const { id } = useParams();

  async function getPost(ID) {
    await getPublicData(GET_BLOG_API + ID)
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getPost(id);
  }, [id]);

  console.log(data);

  const initialValues = {
    title: data.title || "",
    tags: [],
    category: "",
    content: data.content || "",
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    tags: Yup.array().of(Yup.string()).required("Tags is required"),
    category: Yup.string().required("Category is required"),
    content: Yup.string().required("Content is required"),
  });

  const handleSubmitMethod = (values) => {
    // Handle form submission here
    console.log(values);
  };

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

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
                <h3 className="mb-0">BLOG {id ? "EDIT" : "CREATE"}</h3>
              </CardHeader>
              <CardBody>
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
                          <Form onSubmit={formikProps.handleSubmit}>
                            <h6 className="heading-small text-muted mb-4">
                              Insert You Blog
                            </h6>
                            <div className="pl-lg-4">
                              <Row>
                                <Col md="12">
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-address"
                                    >
                                      Title
                                    </label>
                                    <Field
                                      className="form-control form-control-alternative"
                                      // defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                                      id="input-address"
                                      name="title"
                                      placeholder="Blog Title"
                                      type="text"
                                    />
                                    <ErrorMessage
                                      name="title"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </FormGroup>
                                </Col>

                                <Col lg="6">
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-title"
                                    >
                                      Tags
                                    </label>
                                    <Select
                                      className="form-control-alternative"
                                      type="text"
                                      name="tags"
                                      options={options}
                                      onChange={(selectedOptions) => {
                                        const selectedValues =
                                          selectedOptions.map(
                                            (option) => option?.value
                                          );
                                        formikProps.setFieldValue(
                                          "tags",
                                          selectedValues
                                        );
                                      }}
                                      onBlur={formikProps.handleBlur}
                                      menuPortalTarget={document.body}
                                      isSearchable
                                      isMulti
                                      placeholder={"Select Tags"}
                                    />
                                    <ErrorMessage
                                      name="tags"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </FormGroup>
                                </Col>

                                <Col lg="6">
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-title"
                                    >
                                      Category
                                    </label>
                                    <Select
                                      type="text"
                                      className="form-control-alternative"
                                      name="category"
                                      onChange={(selectedOption) => {
                                        formikProps.setFieldValue(
                                          "category",
                                          selectedOption?.value
                                        );
                                      }}
                                      options={options}
                                      onBlur={formikProps.handleBlur}
                                      menuPortalTarget={document.body}
                                      isSearchable
                                      isClearable
                                      placeholder={"Select Category"}
                                    />
                                    <ErrorMessage
                                      name="category"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                            </div>

                            <hr className="my-4" />
                            <h6 className="heading-small text-muted mb-4">
                              Blog Details
                            </h6>
                            <div className="pl-lg-4">
                              <FormGroup>
                                <label>Blog Content</label>
                                <Field
                                  className="form-control form-control-alternative"
                                  placeholder="A few words about you ..."
                                  rows="4"
                                  type="textarea"
                                  name="content"
                                />
                                <ErrorMessage
                                  name="content"
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

export default BlogCreateEdit;
