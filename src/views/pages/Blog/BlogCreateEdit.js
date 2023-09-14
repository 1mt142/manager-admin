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
import { GET_CATEGORY_API } from "core/apiEndpoints";
import { GET_TAG_API } from "core/apiEndpoints";
import { postPrivateData } from "core/apiClient";
import { POST_BLOG_API } from "core/apiEndpoints";

const BlogCreateEdit = () => {
  const [data, setData] = useState({});
  const [categoryData, setCategoryData] = useState([]);
  const [tagData, setTagData] = useState([]);
  const { id } = useParams();

  async function postBlog(body) {
    await postPrivateData(POST_BLOG_API, body)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }

  async function getPost(ID) {
    await getPublicData(GET_BLOG_API + ID)
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  }

  async function getCategory() {
    await getPublicData(GET_CATEGORY_API)
      .then((response) => setCategoryData(response?.data))
      .catch((err) => console.log(err));
  }

  async function getTag() {
    await getPublicData(GET_TAG_API)
      .then((response) => setTagData(response?.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getPost(id);
    getCategory();
    getTag();
  }, [id]);

  const initialValues = {
    title: data.title || "",
    tags: [],
    categoryId: "",
    content: data.content || "",
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    tags: Yup.array().of(Yup.string()).required("Tags is required"),
    categoryId: Yup.string().required("Category is required"),
    content: Yup.string().required("Content is required"),
    file: Yup.mixed().required("Image is required"),
  });

  const handleSubmitMethod = (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("tags", values.tags);
    formData.append("categoryId", values.categoryId);
    formData.append("image", values.file);
    console.log("FromData", formData);
    postBlog(formData);
  };

  const categoryOption = categoryData.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  const tagOption = tagData.map((item) => {
    return {
      label: item.title,
      value: item.id,
    };
  });

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
                                      options={tagOption}
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
                                      name="categoryId"
                                      onChange={(selectedOption) => {
                                        formikProps.setFieldValue(
                                          "categoryId",
                                          selectedOption?.value
                                        );
                                      }}
                                      options={categoryOption}
                                      onBlur={formikProps.handleBlur}
                                      menuPortalTarget={document.body}
                                      isSearchable
                                      isClearable
                                      placeholder={"Select Category"}
                                    />
                                    <ErrorMessage
                                      name="categoryId"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                            </div>
                            <hr className="my-4" />
                            <h6 className="heading-small text-muted mb-4">
                              Blog Image
                            </h6>

                            <Col md="12">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-address"
                                >
                                  Image
                                </label>
                                <input
                                  className="form-control form-control-alternative"
                                  id="input-image"
                                  name="file"
                                  type="file"
                                  onChange={(event) => {
                                    formikProps.setFieldValue(
                                      "file",
                                      event.currentTarget.files[0]
                                    );
                                  }}
                                  accept="image/*"
                                />
                                <ErrorMessage
                                  name="image"
                                  component="div"
                                  className="text-danger"
                                />
                              </FormGroup>
                            </Col>

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
