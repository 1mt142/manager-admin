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
import { GET_TAG_API } from "core/apiEndpoints";
import { toast } from "react-toastify";
import { formatDate } from "utils/time";

const Tags = () => {
  const [data, setData] = useState([]);
  async function getCategory() {
    await getPublicData(GET_TAG_API)
      .then((response) => {
        toast.success(response?.data?.message);
        setData(response?.data?.results);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex align-items-center justify-content-between">
                <h3 className="mb-0">All Tags</h3>
                <Link to="/admin/tag/create">
                  <Button color="primary">Create</Button>
                </Link>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Actions </th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.title}</td>
                        <td>{formatDate(item.created_at)}</td>
                        <th>
                          {" "}
                          <Link to={`${item.id}/edit`}>
                            <Button>Edit</Button>
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

export default Tags;
