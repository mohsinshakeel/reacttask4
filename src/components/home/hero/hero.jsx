import React from "react";
import MarkdownIt from "markdown-it";
import useImageRetriever from "../../ImageRetriever/useImageRetriever";
const md = new MarkdownIt({ html: true });

export default function HomeHero(block) {
  const url = "www.";
  const albumId = 1;
  const contentSet = null;

  const {
    images: retrievedImages,
    loading,
    error,
  } = useImageRetriever({ url, albumId, contentSet });
  console.log("retrievedImages", retrievedImages);
  const images = [
    { src: block.image, alt: "Gallery Image 1" },
    {
      src: "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg",
      alt: "Gallery Image 2",
    },
    { src: "https://i.ibb.co/fYsq2Wk/00.jpg", alt: "Gallery Image 3" },
    {
      src: "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg",
      alt: "Gallery Image 4",
    },
    { src: "https://i.ibb.co/fYsq2Wk/00.jpg", alt: "Gallery Image 5" },
  ];
  const allImages = [...images, ...retrievedImages];
  return (
    <div
      style={{ backgroundColor: "#0f0f0f", height: "100vh", padding: "20px" }}
    >
      <section className="text-center px-[40px] py-[20px]  ">
        <h1
          style={{
            fontFamily: "'Oswald', sans-serif",
            color: "white",
            fontSize: "46px",
            fontWeight: "500",
            letterSpacing: "1.5px",
            marginBottom: "20px",
            textTransform: "uppercase",
          }}
        >
          {block.title}
        </h1>

        <div
          style={{
            fontFamily: "'Open Sans', sans-serif",
            color: "#b6b6b6",
            maxWidth: "800px",
            margin: "0 auto",
            lineHeight: "1.5",
            fontSize: "15px",
            fontWeight: "400",
          }}
          dangerouslySetInnerHTML={{
            __html: md.render(block.description),
          }}
        />
      </section>
      <section className="gallery-container">
        <div
          id="imageGalleryCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {allImages.map((image, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="d-block w-100 main-gallery-image"
                />
              </div>
            ))}
          </div>

          <div className="navigation-buttons">
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#imageGalleryCarousel"
              data-bs-slide="prev"
            >
              <span className="nav-arrow">←</span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#imageGalleryCarousel"
              data-bs-slide="next"
            >
              <span className="nav-arrow">→</span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          <div className="thumbnail-wrapper">
            <div className="carousel-indicators thumbnail-container">
              {allImages.map((image, index) => (
                <div key={index} className="thumbnail-item">
                  <img
                    src={image.src}
                    alt={`Thumbnail ${index + 1}`}
                    data-bs-target="#imageGalleryCarousel"
                    data-bs-slide-to={index}
                    className={
                      index === 0
                        ? "thumbnail-image active w-100"
                        : "thumbnail-image w-100"
                    }
                    role="button"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
                .gallery-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                }

                .carousel {
                    position: relative;
                }

                .main-gallery-image {
                    width: 100%;
                    height: 500px;
                    object-fit: cover;
                }

                .navigation-buttons {
                    position: absolute;
                    top: 50%;
                    left: -25px;
                    right: -25px;
                    transform: translateY(-50%);
                    display: flex;
                    justify-content: space-between;
                    padding: 0;
                    pointer-events: none;
                }

                .carousel-control-prev,
                .carousel-control-next {
                    width: 50px;
                    height: 50px;
                    background: #e5c24a;
                    border: none;
                    opacity: 1;
                    pointer-events: auto;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0;
                    padding: 0;
                    z-index: 10;
                }

                .carousel-control-prev {
                    left: 0;
                    transform: translateX(0);
                }

                .carousel-control-next {
                    right: 0;
                    transform: translateX(0);
                }

                .nav-arrow {
                    color: black;
                    font-size: 34px;
                    font-weight: bold;
                    line-height: 1;
                }

                .carousel-control-prev:hover,
                .carousel-control-next:hover {
                    background: #e5c24a;
                    opacity: 1;
                }

                .thumbnail-wrapper {
                    margin-top: 20px;
                    display: flex;
                    justify-content: center;
                }

                .carousel-indicators {
                    position: relative;
                    margin: 0;
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    width: auto;
                    position: static;
                }

                .thumbnail-container {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    margin: 0;
                    padding: 0;
                    background: none;
                }

                .thumbnail-item {
                    width: 100px;
                    height: 70px;
                    margin: 0;
                    padding: 0;
                    background: none;
                }

                .thumbnail-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    cursor: pointer;
                    opacity: 0.6;
                    transition: opacity 0.3s;
                    border: none;
                    padding: 0;
                    background: none;
                }

                .thumbnail-image.active {
                    opacity: 1;
                    border: 2px solid #fff;
                }

                .carousel-indicators [data-bs-target] {
                    background: none;
                    border: none;
                    padding: 0;
                    margin: 0;
                    width: auto;
                    height: auto;
                }
            `}</style>
      </section>
    </div>
  );
}
