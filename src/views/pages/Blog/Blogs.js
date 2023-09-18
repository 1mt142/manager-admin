// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Button,
  Col,
  FormGroup,
} from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import Header from "components/Headers/Header.js";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { getPublicData } from "core/apiClient";
import { GET_BLOGS_API } from "core/apiEndpoints";

const Blogs = () => {
  const [data, setData] = useState({});
  const [dropdownKey, setDropdownKey] = useState(0);
  // const { id } = useParams();
  const formRef = useRef(null);
  async function getPosts(params = {}) {
    await getPublicData(GET_BLOGS_API, params)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }

  const initialValues = {
    // username: data.username || "",
    // email: data.email || "",
    // password: "",
    // user_type: data.user_type || "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required"),
    email: Yup.string().required("This field is required"),
    user_type: Yup.string().required("This field is required"),
    password: Yup.string().required("This field is required"),
  });

  const handleSubmitMethod = (values, { resetForm }) => {
    // postBlog(values);
    resetForm();
    setDropdownKey(dropdownKey + 1);
    formRef.current.reset();
  };

  useEffect(() => {
    getPosts({
      page: 1,
      limit: 10,
    });
  }, []);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex align-items-center justify-content-between">
                <h3 className="mb-0">Filter Blogs</h3>
              </CardHeader>
              <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmitMethod}
              >
                {(formikProps) => (
                  <Form onSubmit={formikProps.handleSubmit} ref={formRef}>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-title"
                            >
                              Title
                            </label>
                            <Field
                              className="form-control form-control-alternative"
                              id="input-title"
                              name="title"
                              placeholder="Name"
                              type="text"
                            />
                            <ErrorMessage
                              name="title"
                              component="div"
                              className="text-danger"
                            />
                          </FormGroup>
                        </Col>

                        <Col>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-tag"
                            >
                              Tag
                            </label>
                            <Select
                              key={dropdownKey}
                              type="text"
                              className="form-control-alternative"
                              name="tag"
                              onChange={(selectedOption) => {
                                formikProps.setFieldValue(
                                  "tag",
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
                              name="tag"
                              component="div"
                              className="text-danger"
                            />
                          </FormGroup>
                        </Col>

                        <Col>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-category"
                            >
                              Category
                            </label>
                            <Select
                              key={dropdownKey}
                              type="text"
                              className="form-control-alternative"
                              name="category"
                              onChange={(selectedOption) => {
                                formikProps.setFieldValue(
                                  "category",
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
                              name="category"
                              component="div"
                              className="text-danger"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="3">
                          <div className="mt-4">
                            <Button type="submit" className="btn btn-success">
                              Search
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card>
          </div>
        </Row>

        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex align-items-center justify-content-between">
                <h3 className="mb-0">ALL BLOGS</h3>
                <Link to="/admin/blogs/create">
                  <Button color="primary">Create</Button>
                </Link>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Created by</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Actions </th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data?.data?.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.title}</td>
                        <td>{item?.user?.username}</td>
                        <td>{item.created_at}</td>
                        <th>
                          {" "}
                          <Link to={`${item.id}/edit`}>
                            <Button>Edit</Button>
                          </Link>{" "}
                          <Link to={`${item.id}/details`}>
                            <Button>Details</Button>
                          </Link>{" "}
                        </th>
                      </tr>
                    ))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Blogs;
