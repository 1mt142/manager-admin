// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
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
import { GET_CATEGORY_API } from "core/apiEndpoints";
import { GET_TAG_API } from "core/apiEndpoints";
import PaginationComponent from "components/PaginationComponent";
import LoaderComponent from "components/LoaderComponent";
import { toast } from "react-toastify";

const Blogs = () => {
  // Loading
  const [loading, setLoading] = useState(false);
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  //
  const [data, setData] = useState({});
  const [dropdownKey, setDropdownKey] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [tagData, setTagData] = useState([]);

  // SET FORM Data
  const [formData, setFormData] = useState({});
  // const { id } = useParams();
  const formRef = useRef(null);
  async function getPosts(params = {}) {
    setLoading(true);
    await getPublicData(GET_BLOGS_API, params)
      .then((response) => {
        toast.success(response?.data?.message);
        setData(response.data);
        setTotalPages(response.data.pagination.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  async function getCategory() {
    await getPublicData(GET_CATEGORY_API)
      .then((response) => setCategoryData(response?.data?.results))
      .catch((err) => console.log(err));
  }

  async function getTag() {
    await getPublicData(GET_TAG_API)
      .then((response) => setTagData(response?.data?.results))
      .catch((err) => console.log(err));
  }

  const initialValues = {
    title: "",
    tagId: "",
    categoryId: "",
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string(),
    tagId: Yup.string(),
    categoryId: Yup.string(),
  });

  const categoryOption = categoryData.map((item) => {
    return {
      label: item?.name,
      value: item.id,
    };
  });

  const tagOption = tagData.map((item) => {
    return {
      label: item.title,
      value: item.id,
    };
  });

  const handleSubmitMethod = (values, { resetForm }) => {
    const updatedValues = {
      ...values,
      page: 1,
      limit: pageLimit,
    };
    Object.keys(updatedValues).forEach((key) => {
      if (
        updatedValues[key] === null ||
        updatedValues[key] === undefined ||
        updatedValues[key] === ""
      ) {
        delete updatedValues[key];
      }
    });
    setFormData(updatedValues);
    getPosts(updatedValues);
    resetForm();
    setDropdownKey(dropdownKey + 1);
    formRef.current.reset();
  };

  useEffect(() => {
    getCategory();
    getTag();
    getPosts({
      page: 1,
      limit: pageLimit,
    });
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const updatedValues = {
      ...formData,
      page: page,
      limit: pageLimit,
    };
    getPosts(updatedValues);
  };
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
                              // key={dropdownKey}
                              type="text"
                              className="form-control-alternative"
                              name="tagId"
                              onChange={(selectedOption) => {
                                formikProps.setFieldValue(
                                  "tagId",
                                  selectedOption?.value
                                );
                              }}
                              options={tagOption}
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
                              // key={dropdownKey}
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
                <h3 className="mb-0">BLOGS</h3>
                <Link to="/admin/blogs/create">
                  <Button color="primary">Create</Button>
                </Link>
              </CardHeader>

              {loading && <LoaderComponent />}
              <div></div>

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
                  <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
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
