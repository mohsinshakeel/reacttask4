import { useEffect, useState } from "react";

const useImageRetriever = ({ url, albumId, contentSet }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError(null);
      let allImages = [];

      try {
        // Fetch from external API if URL is provided
        if (url) {
          const response = await fetch(url);
          const data = await response.json();
          allImages = [
            ...allImages,
            ...(data.images || [
              {
                url: "https://i.ibb.co/fYsq2Wk/00.jpg",
                alt: "Placeholder Image 3",
              },
              {
                url: "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg",
                alt: "Placeholder Image 2",
              },
            ]),
          ];
        }

        // Fetch from CloudCannon content set
        if (contentSet) {
          const response = await fetch(
            `/_cloudcannon/content_data/${contentSet}`
          );
          if (!response.ok) throw new Error("Content set fetch failed");

          const data = await response.json();
          const contentSetImages = data.map((item) => ({
            url: item.image?.path || item.url,
            alt: item.alt || item.description,
            title: item.title,
          }));

          allImages = [...allImages, ...contentSetImages];
        }

        // Filter by album if specified
        if (albumId) {
          allImages = allImages.filter((img) => img.albumId === albumId);
        }

        setImages(allImages);
      } catch (error) {
        setError(error.message);
        // Fallback images on error
        allImages = [
          {
            url: "https://i.ibb.co/fYsq2Wk/00.jpg",
            alt: "Placeholder Image 3",
            albumId: "123",
            contentSet: "gallery",
          },
          {
            url: "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg",
            alt: "Placeholder Image 2",
            albumId: "123",
            contentSet: "gallery",
          },
        ];
        setImages(allImages);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [url, albumId, contentSet]);

  return { images, loading, error };
};

export default useImageRetriever;
