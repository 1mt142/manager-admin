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
import {
  GET_BLOG_API,
  GET_TAG_API,
  POST_BLOG_API,
  PUT_BLOG_API,
  GET_CATEGORY_API,
} from "core/apiEndpoints";
import { getPublicData, postPrivateData, putPrivateData } from "core/apiClient";
import { useParams } from "react-router-dom";
import TextEditor from "components/TextEditor";

const BlogCreateEdit = () => {
  const [data, setData] = useState({});
  const [categoryData, setCategoryData] = useState([]);
  const [tagData, setTagData] = useState([]);
  const [editorValue, setEditorValue] = useState("");
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
    file: Yup.mixed().required("Image is required"),
  });

  const handleSubmitMethod = (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("tags", JSON.stringify(values.tags));
    formData.append("categoryId", values.categoryId);
    formData.append("image", values.file);
    postBlog(formData);
    resetForm(); // this method is for without formik field
    setDropdownKey(dropdownKey + 1);
    formRef.current.reset();
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
                <Col className="order-xl-1" xl="12">
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
                                      key={dropdownKey}
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
                                      key={dropdownKey}
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
                            <div className="pl-lg-4">
                              <Row>
                                <Col md="12">
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-address"
                                    >
                                      Image
                                    </label>
                                    <input
                                      key={dropdownKey}
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
                              </Row>
                            </div>

                            <hr className="my-4" />
                            <h6 className="heading-small text-muted mb-4">
                              Blog Details
                            </h6>
                            <div className="pl-lg-4">
                              <Row>
                                <Col md="12">
                                  <FormGroup>
                                    <label>Blog Content</label>
                                    <Field name="content">
                                      {({ field }) => (
                                        <TextEditor
                                          dataOnChange={(content) => {
                                            formikProps.setFieldValue(
                                              "content",
                                              content
                                            );
                                          }}
                                        />
                                      )}
                                    </Field>
                                    <ErrorMessage
                                      name="content"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                            </div>
                            <div className="pl-lg-4 pt-6">
                              <Row>
                                <Col md="12">
                                  <Button
                                    type="submit"
                                    className="btn btn-primary"
                                  >
                                    Submit
                                  </Button>
                                </Col>
                              </Row>
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
