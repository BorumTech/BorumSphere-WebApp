import Footer from "../Footer/footer";
import "./layout.css";
import { useEffect, useState } from "react";

export default function Layout(props) {
  const [bgImage, setBgImage] = useState("/confetti.gif");
  const [majorAnnouncementDisplay, setMajorAnnouncementDisplay] = useState("grid");
  useEffect(() => {
    const clearBgDelay = setTimeout(() => {
      setBgImage("");
    }, 5000);

    return () => clearTimeout(clearBgDelay);
  }, []);

  const hideMajorAnnouncement = e => {
    setMajorAnnouncementDisplay("none");
  };

  return (
    <div className="container" style={{ backgroundImage: `url(${bgImage})`}}>
      <section id="major-announcement" style={{display: majorAnnouncementDisplay}}>
        <h1>Happy New Year! SSO is <a style={{ color: "blue" }} target="_blank" rel="noreferrer" href="https://borum-tech.noticeable.news/publications/borum-single-sign-on-is-finally-here">finally here</a>!</h1>
        <button onClick={hideMajorAnnouncement} id="exit-major-announcement">X</button>
      </section>
      <section className="App">
        {props.children}
      </section>

      <Footer />
    </div>
  );
}
