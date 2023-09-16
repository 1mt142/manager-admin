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

import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import { GET_CATEGORY_API } from "core/apiEndpoints";
import { postPrivateData, putPrivateData } from "core/apiClient";
import { useParams } from "react-router-dom";

const CategoryCreateEdit = () => {
  const [data, setData] = useState({});
  const { id } = useParams();

  async function createCategory(body) {
    if (id) {
      await putPrivateData(`${GET_CATEGORY_API + id}`, body)
        .then((response) => {
          toast.success(response.data.message);
        })
        .catch((err) => console.log(err));
    } else {
      await postPrivateData(GET_CATEGORY_API, body)
        .then((response) => {
          toast.success(response.data.message);
        })
        .catch((err) => console.log(err));
    }
  }

  // async function getPost(ID) {
  //   await getPublicData(GET_BLOG_API + ID)
  //     .then((response) => setData(response.data))
  //     .catch((err) => console.log(err));
  // }

  // async function getCategory() {
  //   await getPublicData(GET_CATEGORY_API)
  //     .then((response) => setCategoryData(response?.data))
  //     .catch((err) => console.log(err));
  // }

  useEffect(() => {
    // getPost(id);
    // getCategory();
  }, [id]);

  const initialValues = {
    name: data.name || "",
    category_slug: data.name || "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This is required"),
    category_slug: Yup.string().required("This is required"),
  });

  const handleSubmitMethod = (values, { resetForm }) => {
    createCategory(values);
    resetForm();
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
                <h3 className="mb-0">CATEGORY {id ? "EDIT" : "CREATE"}</h3>
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
                              Create Category
                            </h6>
                            <div className="pl-lg-4">
                              <Row>
                                <Col md="6">
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
                                      name="name"
                                      placeholder="Category Name"
                                      type="text"
                                    />
                                    <ErrorMessage
                                      name="name"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </FormGroup>
                                </Col>
                                <Col md="6">
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-slug"
                                    >
                                      Slug
                                    </label>
                                    <Field
                                      className="form-control form-control-alternative"
                                      id="input-slug"
                                      name="category_slug"
                                      placeholder="Category Slug"
                                      type="text"
                                    />
                                    <ErrorMessage
                                      name="category_slug"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                            </div>

                            <div className="pl-lg-4">
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

export default CategoryCreateEdit;
