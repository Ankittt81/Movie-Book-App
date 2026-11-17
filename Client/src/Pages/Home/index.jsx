import { useEffect, useState } from "react";
import { message, Row, Col, Input, Tag, Card } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { getMovies } from "../../apiCalls/movies";
import { smartSearch } from "../../apiCalls/search";
import { hideLoading, showLoading } from "../../redux/loaderSlice";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchResult, setSearchResult] = useState(null); // null = show the normal movie grid
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loadMovies = async () => {
      try {
        dispatch(showLoading());
        const response = await getMovies({ pageSize: 50 });
        setMovies(response.data);
      } catch (err) {
        message.error(err.message);
      } finally {
        dispatch(hideLoading());
      }
    };
    loadMovies();
  }, []);

  const handleSearch = async (value) => {
    const text = value.trim();
    if (!text) {
      setSearchResult(null);
      return;
    }
    try {
      dispatch(showLoading());
      const response = await smartSearch(text);
      setSearchResult(response.data);
    } catch (err) {
      message.error(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  // what the AI understood, shown as tags
  const filterTags = (f) => {
    const tags = [];
    if (f.title) tags.push(`Title: ${f.title}`);
    if (f.genre) tags.push(f.genre);
    if (f.language) tags.push(f.language);
    if (f.city) tags.push(f.city);
    if (f.maxPrice) tags.push(`Under Rs. ${f.maxPrice}`);
    if (f.date) tags.push(moment(f.date).format("ddd, MMM D"));
    if (f.timeOfDay) tags.push(f.timeOfDay.toLowerCase());
    if(f.maxDuration) tags.push(`Under ${f.maxDuration} mins`);
    return tags;
  };

  return (
    <>
      <Row className="justify-content-center w-100">
        <Col xs={24} lg={14}>
          <Input.Search
            placeholder='Try "funny Hindi movie tonight in Noida under 300"'
            enterButton="Search"
            size="large"
            allowClear
            maxLength={200}
            onSearch={handleSearch}
            onChange={(e) => {
              if (!e.target.value) setSearchResult(null);
            }}
          />
          <br />
          <br />
        </Col>
      </Row>

      {searchResult ? (
        <>
          <div className="text-center mb-3">
            {searchResult.aiUsed ? (
              <>
                <span>Understood: </span>
                {filterTags(searchResult.filters).map((t) => (
                  <Tag color="blue" key={t}>{t}</Tag>
                ))}
              </>
            ) : (
              <span>Could not read filters from that, searched movie titles instead.</span>
            )}
          </div>

          {searchResult.results.length === 0 && (
            <h2 className="text-center blue-clr">No shows found for that search</h2>
          )}

          <Row gutter={[16, 16]}>
            {searchResult.results.map((r) => (
              <Col key={r.showId} xs={24} md={12} lg={8}>
                <Card
                  hoverable
                  onClick={() => navigate(`/book-show/${r.showId}`)}
                >
                  <div className="d-flex">
                    <img src={r.poster} width={80} alt={r.movieTitle} className="me-3" />
                    <div>
                      <h3 className="mt-0">{r.movieTitle}</h3>
                      <p className="m-0">{r.genre} · {r.language}</p>
                      <p className="m-0">{r.theatreName}, {r.city}</p>
                      <p className="m-0">
                        <b>{moment(r.startTime).format("ddd, MMM D, hh:mm A")}</b>
                      </p>
                      <p className="m-0">Rs. {Number(r.ticketPrice)}</p>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <>
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
          {movies.length === 0 && <h2 className="text-center blue-clr">No movies found</h2>}
        </>
      )}
    </>
  );
};

export default Home;