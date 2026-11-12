import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card, Col, Popconfirm, Row, Tag, message } from "antd";
import moment from "moment";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { getMyBookings, confirmBooking, cancelBooking } from "../../apiCalls/booking";

const statusView = (booking) => {
  const expired = booking.status === "PENDING" && moment(booking.expiresAt).isBefore(moment());
  if (expired) return { color: "red", text: "Expired" };
  switch (booking.status) {
    case "SUCCESSFUL": return { color: "green", text: "Confirmed" };
    case "PENDING": return { color: "orange", text: "Payment pending" };
    case "CANCELLED": return { color: "default", text: "Cancelled" };
    default: return { color: "red", text: "Failed" };
  }
};

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();

  const loadBookings = async () => {
    try {
      dispatch(showLoading());
      const response = await getMyBookings(0, 50);
      setBookings(response.data);
    } catch (err) {
      message.error(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const act = async (fn, bookingId, successText) => {
    try {
      dispatch(showLoading());
      await fn(bookingId);
      message.success(successText);
    } catch (err) {
      message.error(err.message);
    } finally {
      dispatch(hideLoading());
      loadBookings();
    }
  };

  return (
    <>
      <Row gutter={[24, 24]}>
        {bookings.map((b) => {
          const view = statusView(b);
          const showStarted = moment(b.startTime).isBefore(moment());
          const canPay = b.status === "PENDING" && view.text !== "Expired";
          const canCancel = (canPay || b.status === "SUCCESSFUL") && !showStarted;
          return (
            <Col key={b.bookingId} xs={24} lg={12}>
              <Card>
                <div className="d-flex justify-content-between">
                  <h3 className="mt-0">{b.movieTitle}</h3>
                  <Tag color={view.color}>{view.text}</Tag>
                </div>
                <p>
                  Theatre: <b>{b.theatreName}</b>
                </p>
                <p>
                  Date & Time: <b>{moment(b.startTime).format("MMM Do YYYY, hh:mm A")}</b>
                </p>
                <p>
                  Seats: <b>{b.seatLabels.join(", ")}</b>
                </p>
                <p>
                  Amount: <b>Rs. {Number(b.totalAmount)}</b>
                </p>
                <p>
                  Booking #: <b>{b.bookingId}</b>
                  {b.paymentRef && <> · Payment: <b>{b.paymentRef}</b></>}
                </p>

                <div className="d-flex gap-10">
                  {canPay && (
                    <Button type="primary" onClick={() => act(confirmBooking, b.bookingId, "Booking confirmed")}>
                      Pay & confirm
                    </Button>
                  )}
                  {canCancel && (
                    <Popconfirm
                      title="Cancel this booking?"
                      onConfirm={() => act(cancelBooking, b.bookingId, "Booking cancelled")}
                    >
                      <Button danger>Cancel</Button>
                    </Popconfirm>
                  )}
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>

      {bookings.length === 0 && (
        <div className="text-center pt-3">
          <h1>You have not booked any show yet!</h1>
          <Link to="/">
            <Button type="primary">Start Booking</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Bookings;