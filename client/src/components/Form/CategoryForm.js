
const CategoryForm = ({
  handleSubmit,
  name,
  image,
  setName,
  setImage,
  btnName,
}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter New Category"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3 ">
          <label className="btn btn-outline-secondary col-md-12">
            {image ? image.name : "Upload Image"}
            <input
              type="file"
              name="image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            ></input>
          </label>
        </div>
        <div className="mb-3">
          {image && (
            <div className="text-center">
              <img
                src={URL.createObjectURL(image)}
                alt="category-image"
                height={"200px"}
                className="img img-responsive"
              />
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          {btnName}
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
