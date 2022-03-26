import Footer from "../Footer/footer";
import "./layout.css";

/**
 * To use major announcement, replace <div className="container" with <MajorAnnouncement>
 * @param {*} props 
 * @returns 
 */
export default function Layout(props) {
  return (
    <div className="container" >
      <section className="App">
        {props.children}
      </section>

      <Footer />
    </div>
  );
}
