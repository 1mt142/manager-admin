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
import { GET_TAG_API } from "core/apiEndpoints";
import { postPrivateData, putPrivateData } from "core/apiClient";
import { useNavigate, useParams } from "react-router-dom";
import { getPrivateData } from "core/apiClient";
import { GET_USER_API } from "core/apiEndpoints";

const TagCreateEdit = () => {
  const [data, setData] = useState({});
  const { id } = useParams();

  const navigate = useNavigate();

  async function postTag(body) {
    if (id) {
      await putPrivateData(`${GET_TAG_API + id}`, body)
        .then((response) => {
          toast.success(response.data.message);
          navigate("/admin/tag");
        })
        .catch((err) => console.log(err));
    } else {
      await postPrivateData(GET_TAG_API, body)
        .then((response) => {
          toast.success(response.data.message);
        })
        .catch((err) => console.log(err));
    }
  }

  async function getTag(ID) {
    await getPrivateData(GET_TAG_API + ID)
      .then((response) => {
        toast.success(response.data.message);
        setData(response.data.results);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (id) {
      getTag(id);
    }
    // getPost(id);
  }, [id]);

  const initialValues = {
    title: data.title || "",
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("This field is required"),
  });

  const handleSubmitMethod = (values, { resetForm }) => {
    postTag(values);
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
                <h3 className="mb-0">TAG {id ? "EDIT" : "CREATE"}</h3>
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
                              Create Your Tag
                            </h6>
                            <div className="pl-lg-4">
                              <Row>
                                <Col md="12">
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-tag"
                                    >
                                      Title
                                    </label>
                                    <Field
                                      className="form-control form-control-alternative"
                                      id="input-tag"
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

export default TagCreateEdit;
