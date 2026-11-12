import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Popconfirm, Table, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { deleteMovie, getMovies } from "../../apiCalls/movies";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import MovieForm from "./MovieForm";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [selected, setSelected] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const dispatch = useDispatch();

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

  useEffect(() => {
    loadMovies();
  }, []);

  const handleDelete = async (id) => {
    try {
      dispatch(showLoading());
      const response = await deleteMovie(id);
      message.success(response.message);
      await loadMovies();
    } catch (err) {
      message.error(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  const columns = [
    {
      title: "Poster",
      render: (_, m) => (
        <img
          width="60"
          height="90"
          style={{ objectFit: "cover" }}
          src={m.poster}
          alt={m.title}
        />
      ),
    },
    { title: "Title", dataIndex: "title" },
    { title: "Genre", dataIndex: "genre" },
    { title: "Language", dataIndex: "language" },
    { title: "Duration", dataIndex: "duration", render: (d) => `${d} min` },
    {
      title: "Release",
      dataIndex: "releaseDate",
      render: (d) => moment(d).format("DD-MMM-YYYY"),
    },
    {
      title: "Action",
      render: (_, m) => (
        <div className="d-flex gap-10">
          <Button
            onClick={() => {
              setSelected(m);
              setFormOpen(true);
            }}
          >
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Delete this movie?"
            description="It will disappear from the app. Existing bookings stay."
            onConfirm={() => handleDelete(m.id)}
          >
            <Button danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <Button
          type="primary"
          onClick={() => {
            setSelected(null);
            setFormOpen(true);
          }}
        >
          Add Movie
        </Button>
      </div>

      <Table rowKey="id" dataSource={movies} columns={columns} />

      {formOpen && (
        <MovieForm
          movie={selected}
          onClose={() => setFormOpen(false)}
          onSaved={loadMovies}
        />
      )}
    </>
  );
};

export default MovieList;