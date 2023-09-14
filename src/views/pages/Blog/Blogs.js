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
} from "reactstrap";
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublicData } from "core/apiClient";
import { GET_BLOGS_API } from "core/apiEndpoints";

const Blogs = () => {
  const [data, setData] = useState({});
  async function getPosts(params = {}) {
    await getPublicData(GET_BLOGS_API, params)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getPosts({
      page: 1,
      limit: 10,
    });
  }, []);

  console.log(data);

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
                <h3 className="mb-0">Card tables</h3>
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
