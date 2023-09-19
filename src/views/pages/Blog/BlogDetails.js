import {
  Card,
  CardHeader,
  Container,
  Row,
  CardBody,
  Button,
  CardTitle,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_BLOG_API } from "core/apiEndpoints";
import { getPublicData } from "core/apiClient";
import { BASE_API } from "core/apiEndpoints";
import { toast } from "react-toastify";

const BlogDetails = () => {
  const [data, setData] = useState({});
  const { id } = useParams();

  async function getPost(ID) {
    await getPublicData(GET_BLOG_API + ID)
      .then((response) => {
        toast.success(response.data.message);
        setData(response.data.results);
      })
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
              <CardTitle className="text-center ">
                <h1>{data.title}</h1>
              </CardTitle>
              <CardBody>
                <div className="mt-1 mb-1 text-center">
                  <span
                    style={{ width: "fitContent", fontSize: "10px" }}
                    className="bg-primary text-white p-2 m-1 rounded"
                  >
                    {data ? data?.category?.name : ""}
                  </span>
                  {data?.tags?.map((item) => (
                    <span
                      style={{ width: "fitContent", fontSize: "10px" }}
                      className="bg-green text-white p-2 m-1 rounded"
                    >
                      #{item.title}
                    </span>
                  ))}
                </div>
                <div className="pt-2 text-center">
                  <img
                    width="50%"
                    src={`${BASE_API}/${data.imagePath}`}
                    alt="Blog"
                  />
                </div>

                <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default BlogDetails;
