import axios from "axios";
import { Suspense, useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [res, setRes] = useState("");
  const [data, setData] = useState(null)

  useEffect(() => {
    axios('/api/')
      .then((data) => {
        setData(data)
      })
  }, [])

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleString("fr-FR", options);
  };

  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    await axios({
      method: "POST",
      url: "http://localhost:3000/api/sendCall",
      data: {
        phone,
        message,
      },
    }).then((response) => {
      if (response.status === 201) {
        setRes("Message Sent.");
        setPhone("");
        setMessage("");
        setTimeout(() => {
          setRes("");
        }, 3000);
      } else if (response.status === 401) {
        setRes("Message failed to send.");
      }
    });
  };

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <form
          id="contact-form"
          onSubmit={async (e) => await handleSubmitMessage(e)}
          method="POST"
        >
          <div className="form-group mt-5">
            <label htmlFor="phone">Phone</label>
            <input
              type="number"
              className="form-control"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              className="form-control"
              rows="5"
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Send Message
          </button>
          {res !== "" ? <p>{res}</p> : ""}
        </form>
        {data && data.map((post) => (
          <div key={post.uri}>
            <div className="card mt-3 bg-secondary text-light">
              <div className="card-body">
                <h5 className="card-title">Message envoyé à : {post.to}</h5>
                <p className="card-text">{post.body}</p>
                <p className="card-text">
                  Date et heure : {formatDate(post.dateCreated)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Suspense>
    </div>
  );
}

