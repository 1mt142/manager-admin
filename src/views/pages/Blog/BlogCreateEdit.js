// reactstrap components
import {
  Badge,
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
  CardBody,
} from "reactstrap";
import axios from "axios"; // core components
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BlogCreateEdit = () => {
  const [data, setData] = useState({});
  // http://18.141.173.147:5008/post/blogs?page=1&limit=10
  async function getPosts() {
    const resp = await axios.get(
      "http://18.141.173.147:5008/post/blogs?page=1&limit=10"
    );
    setData(resp.data);
  }

  useEffect(() => {
    getPosts();
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
              <CardBody>
                <h1>This is Create and edit</h1>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default BlogCreateEdit;
