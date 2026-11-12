import { useEffect, useState } from "react";
import { message, Row, Col, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMovies } from "../../apiCalls/movies";
import { hideLoading, showLoading } from "../../redux/loaderSlice";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // search on the server, 300 ms after the user stops typing
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        dispatch(showLoading());
        const response = await getMovies({ title: searchText, page: 0, pageSize: 50 });
        setMovies(response.data);
      } catch (err) {
        message.error(err.message);
      } finally {
        dispatch(hideLoading());
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchText]);

  return (
    <>
      <Row className="justify-content-center w-100">
        <Col xs={24} lg={12}>
          <Input
            placeholder="Type here to search for movies"
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<SearchOutlined />}
          />
          <br />
          <br />
          <br />
        </Col>
      </Row>

      <Row className="justify-content-center" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {movies.map((movie) => (
          <Col className="gutter-row mb-5" key={movie.id} xs={12} sm={8} md={6}>
            <div className="text-center">
              <img
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="cursor-pointer"
                src={movie.poster}
                alt={movie.title}
                width={200}
                style={{ borderRadius: "8px" }}
              />
              <h3 onClick={() => navigate(`/movie/${movie.id}`)} className="cursor-pointer">
                {movie.title}
              </h3>
            </div>
          </Col>
        ))}
      </Row>

      {movies.length === 0 && (
        <h2 className="text-center blue-clr">No movies found</h2>
      )}
    </>
  );
};

export default Home;