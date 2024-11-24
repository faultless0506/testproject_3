import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { likeImage, deleteImage, addImage } from "../../store/slices/dogsSlice";
import { useState } from "react";
import { AppDispatch } from "../../store/store";
import Header from "../../components/Header";
import { useFetchImages } from "../../customHooks/useFetchImages";

export default function Gallery() {
  const dispatch: AppDispatch = useDispatch();
  const images = useSelector((state: RootState) => state.dog.images);
  const status = useSelector((state: RootState) => state.dog.status);
  const error = useSelector((state: RootState) => state.dog.error);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const { handleMakeMagic } = useFetchImages();

  // useEffect(() => {
  //   if (status === "idle") {
  //     dispatch(fetchDogImages());
  //   }
  // }, [status, dispatch]);
  // const handleMakeMagic = () => {
  //   dispatch(fetchDogImages());
  // };
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          dispatch(addImage(e.target.result as string));
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleLike = (index: number) => {
    dispatch(likeImage(index));
  };

  const handleDelete = (index: number) => {
    dispatch(deleteImage(index));
  };

  const handleImageClick = (url: string) => {
    setModalImage(url);
  };

  const handleCloseModal = () => {
    setModalImage(null);
  };

  const handleCopyLink = () => {
    if (modalImage) {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };
  let content;
  if (status === "loading") {
    content = <p>Loading...</p>;
  } else if (images.length === 0) {
    content = <p>No images yet</p>;
  } else if (status === "succeeded") {
    content = (
      <div>
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              display: "inline-block",
              margin: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              padding: "10px",
              width: "300px",
              height: "300px",
            }}
          >
            <img
              src={image.url}
              alt={`Dog ${index}`}
              onClick={() => handleImageClick(image.url)}
              style={{ cursor: "pointer", width: "268px", height: "268px" }}
            />
            <button
              onClick={() => handleLike(index)}
              style={{ position: "absolute", top: "10px", right: "10px" }}
            >
              ❤️ {image.likes}
            </button>
            <button
              onClick={() => handleDelete(index)}
              style={{ position: "absolute", top: "10px", left: "10px" }}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    );
  } else if (status === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <Header />
      <button onClick={handleMakeMagic}>Make Magic</button>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        Drag and drop images here
      </div>
      {content}
      {modalImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <img
              src={modalImage}
              alt="Dog"
              style={{ width: "200px", borderRadius: "8px" }}
            />
            <button onClick={handleCopyLink} style={{ marginTop: "10px" }}>
              Copy Link
            </button>
            <button onClick={handleCloseModal} style={{ marginTop: "10px" }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
