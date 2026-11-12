import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { message, Card, Button, Popconfirm } from "antd";
import moment from "moment";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { getSeatMap } from "../apiCalls/shows";
import { holdSeats, confirmBooking, cancelBooking } from "../apiCalls/booking";

const MAX_SEATS = 6; // same limit as the backend

const BookShow = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [seatMap, setSeatMap] = useState(null);
  const [selected, setSelected] = useState([]);
  const [booking, setBooking] = useState(null); // set after a successful hold
  const [secondsLeft, setSecondsLeft] = useState(0);

  const loadSeatMap = async () => {
    try {
      dispatch(showLoading());
      const response = await getSeatMap(params.id);
      setSeatMap(response.data);
    } catch (err) {
      message.error(err.message);
      navigate("/");
    } finally {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    loadSeatMap();
  }, [params.id]);

  // countdown while a hold is active
  useEffect(() => {
    if (!booking) return;
    const tick = () => {
      const left = Math.max(0, Math.floor(moment(booking.expiresAt).diff(moment()) / 1000));
      setSecondsLeft(left);
      if (left === 0) {
        message.warning("Your seat hold expired, please select seats again");
        resetSelection();
        loadSeatMap();
      }
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [booking]);

  const resetSelection = () => {
    setBooking(null);
    setSelected([]);
  };

  const toggleSeat = (seat) => {
    if (booking || seat.status !== "AVAILABLE") return;
    if (selected.includes(seat.label)) {
      setSelected(selected.filter((l) => l !== seat.label));
    } else if (selected.length >= MAX_SEATS) {
      message.warning(`You can select up to ${MAX_SEATS} seats`);
    } else {
      setSelected([...selected, seat.label]);
    }
  };

  const handleHold = async () => {
    try {
      dispatch(showLoading());
      const response = await holdSeats(seatMap.showId, selected);
      setBooking(response.data);
      message.success("Seats held, complete payment before the timer ends");
      const refreshed = await getSeatMap(params.id);
      setSeatMap(refreshed.data);
    } catch (err) {
      message.error(err.message);
      resetSelection();
      const refreshed = await getSeatMap(params.id).catch(() => null);
      if (refreshed) setSeatMap(refreshed.data);
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleConfirm = async () => {
    try {
      dispatch(showLoading());
      await confirmBooking(booking.bookingId);
      message.success("Booking confirmed!");
      navigate("/profile");
    } catch (err) {
      message.error(err.message);
      resetSelection();
      await loadSeatMap();
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleCancelHold = async () => {
    try {
      dispatch(showLoading());
      await cancelBooking(booking.bookingId);
      message.info("Hold released");
    } catch (err) {
      message.error(err.message);
    } finally {
      resetSelection();
      dispatch(hideLoading());
      await loadSeatMap();
    }
  };

  const seatClass = (seat) => {
    if (booking && booking.seatLabels.includes(seat.label)) return "seat mine";
    if (selected.includes(seat.label)) return "seat selected";
    if (seat.status === "BOOKED") return "seat booked";
    if (seat.status === "HELD") return "seat held";
    return "seat";
  };

  // group seats by row letter: A1, A2... -> { A: [...], B: [...] }
  const renderSeats = () => {
    const rows = {};
    seatMap.seats.forEach((seat) => {
      const letter = seat.label.charAt(0);
      (rows[letter] = rows[letter] || []).push(seat);
    });
    return Object.keys(rows)
      .sort()
      .map((letter) => (
        <div className="seat-line" key={letter}>
          <span className="seat-row-label">{letter}</span>
          {rows[letter].map((seat) => (
            <button
              key={seat.label}
              className={seatClass(seat)}
              disabled={!!booking || seat.status !== "AVAILABLE"}
              onClick={() => toggleSeat(seat)}
            >
              {seat.label.slice(1)}
            </button>
          ))}
        </div>
      ));
  };

  if (!seatMap) return null;

  const price = Number(seatMap.ticketPrice);
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <Card
      title={
        <div className="movie-title-details">
          <h1>{seatMap.movieTitle}</h1>
          <p>
            {seatMap.theatreName}, {seatMap.theatreAddress}
          </p>
        </div>
      }
      extra={
        <div className="show-name py-3">
          <h3>
            <span>Date & Time:</span> {moment(seatMap.startTime).format("MMM Do YYYY, hh:mm A")}
          </h3>
          <h3>
            <span>Ticket Price:</span> Rs. {price}
          </h3>
          <h3>
            <span>Available Seats:</span> {seatMap.availableSeats} / {seatMap.totalSeats}
          </h3>
        </div>
      }
    >
      <div className="screen-bar"></div>
      <p className="screen-caption">All eyes this way, the screen is here</p>

      <div className="seat-map">{renderSeats()}</div>

      <div className="seat-legend">
        <span><i style={{ background: "#fff" }}></i> Available</span>
        <span><i style={{ background: "#1890ff" }}></i> Selected</span>
        <span><i style={{ background: "#fa8c16", borderColor: "#fa8c16" }}></i> Your hold</span>
        <span><i style={{ background: "#fff7e6", borderColor: "#ffd591" }}></i> Held by someone</span>
        <span><i style={{ background: "#f0f0f0", borderColor: "#d9d9d9" }}></i> Booked</span>
      </div>

      {!booking && selected.length > 0 && (
        <div className="booking-bar">
          <p>
            Seats: <b>{selected.join(", ")}</b>
          </p>
          <p>
            Total: <b>Rs. {selected.length * price}</b>
          </p>
          <Button type="primary" block onClick={handleHold}>
            Hold seats
          </Button>
        </div>
      )}

      {booking && (
        <div className="booking-bar">
          <p>
            Seats: <b>{booking.seatLabels.join(", ")}</b>
          </p>
          <p>
            Total: <b>Rs. {Number(booking.totalAmount)}</b>
          </p>
          <p>
            Time left to pay: <b style={{ color: secondsLeft < 60 ? "#cf1322" : "inherit" }}>{mm}:{ss}</b>
          </p>
          <div className="d-flex gap-10">
            <Popconfirm title="Release these seats?" onConfirm={handleCancelHold}>
              <Button block>Cancel</Button>
            </Popconfirm>
            <Button type="primary" block onClick={handleConfirm}>
              Pay & confirm
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default BookShow;