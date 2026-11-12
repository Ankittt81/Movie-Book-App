import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { message, Input, Divider, Row, Col } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import moment from "moment";
import { getMovieById } from "../apiCalls/movies";
import { getShowsForMovie } from "../apiCalls/shows";
import { showLoading, hideLoading } from "../redux/loaderSlice";

const SingleMovie = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [movie, setMovie] = useState(null);
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [theatres, setTheatres] = useState([]);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        dispatch(showLoading());
        const response = await getMovieById(params.id);
        setMovie(response.data);
      } catch (err) {
        message.error(err.message);
        navigate("/");
      } finally {
        dispatch(hideLoading());
      }
    };
    loadMovie();
  }, [params.id]);

  useEffect(() => {
    const loadShows = async () => {
      try {
        dispatch(showLoading());
        const response = await getShowsForMovie(params.id, date);
        setTheatres(response.data);
      } catch (err) {
        message.error(err.message);
      } finally {
        dispatch(hideLoading());
      }
    };
    loadShows();
  }, [params.id, date]);

  const handleDate = (e) => {
    if (e.target.value) {
      setDate(e.target.value);
    }
  };

  return (
    <div className="inner-container">
      {movie && (
        <div className="d-flex single-movie-div">
          <div className="flex-shrink-0 me-3 single-movie-img">
            <img src={movie.poster} width={150} alt={movie.title} />
          </div>
          <div className="w-100">
            <h1 className="mt-0">{movie.title}</h1>
            <p className="movie-data">
              Language: <span>{movie.language}</span>
            </p>
            <p className="movie-data">
              Genre: <span>{movie.genre}</span>
            </p>
            <p className="movie-data">
              Release Date: <span>{moment(movie.releaseDate).format("MMM Do YYYY")}</span>
            </p>
            <p className="movie-data">
              Duration: <span>{movie.duration} Minutes</span>
            </p>
            <p>{movie.description}</p>
            <hr />

            <div className="d-flex flex-column-mob mt-3">
              <label className="me-3 flex-shrink-0">Choose the date:</label>
              <Input
                onChange={handleDate}
                type="date"
                className="max-width-300 mt-8px-mob"
                value={date}
                min={moment().format("YYYY-MM-DD")}
                prefix={<CalendarOutlined />}
              />
            </div>
          </div>
        </div>
      )}

      {theatres.length === 0 && (
        <div className="pt-3">
          <h2 className="blue-clr">No shows available for this movie on this date</h2>
        </div>
      )}

      {theatres.length > 0 && (
        <div className="theatre-wrapper mt-3 pt-3">
          <h2>Theatres</h2>
          <hr />
          {theatres.map((theatre) => (
            <div key={theatre.theatreId}>
              <Row gutter={24}>
                <Col xs={24} lg={8}>
                  <h3>{theatre.theatreName}</h3>
                  <p>
                    {theatre.address}, {theatre.city}
                  </p>
                </Col>
                <Col xs={24} lg={16}>
                  <ul className="show-ul">
                    {theatre.shows.map((show) => {
                      const soldOut = show.availableSeats === 0;
                      return (
                        <li
                          key={show.id}
                          className={`show-chip ${soldOut ? "sold-out" : ""}`}
                          onClick={() => !soldOut && navigate(`/book-show/${show.id}`)}
                        >
                          {moment(show.startTime).format("hh:mm A")}
                          <small>
                            {soldOut ? "Sold out" : `Rs. ${show.ticketPrice} · ${show.availableSeats} left`}
                          </small>
                        </li>
                      );
                    })}
                  </ul>
                </Col>
              </Row>
              <Divider />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleMovie;