import { Card, CardHeader, Container, Row, CardBody } from "reactstrap";
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_BLOG_API } from "core/apiEndpoints";
import { getPublicData } from "core/apiClient";
import { BASE_API } from "core/apiEndpoints";

const BlogDetails = () => {
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

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Blog Details</h3>
              </CardHeader>
              <CardBody>
                <h1>{data.title}</h1>
                <p>{data.content}</p>
                <img src={`${BASE_API}/${data.imagePath}`} alt="Blog" />
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default BlogDetails;
