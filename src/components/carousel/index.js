import Carousel from 'react-bootstrap/Carousel';
import "./index.css";

function HomeCarousel() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/Designer.jpeg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Track Your Spending</h3>
          <p>Easily manage all your expenses in one place.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/Designer (1).jpeg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Visual Insights</h3>
          <p>Understand your finances with graphs and reports.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/Designer (2).jpeg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Safe and Secure</h3>
          <p>Your data is protected using Clerk authentication.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;
