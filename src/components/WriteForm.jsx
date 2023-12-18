import { useForm } from "react-hook-form";
import { useRef } from "react";

const WriteForm = ({ onSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm();
  const coverImageRef = useRef();
  const coverFieldValue = watch("cover");

  const loadCoverImage = (coverFieldValue, coverImageRef) => {
    if (!coverFieldValue) return;
    const fr = new FileReader();

    fr.addEventListener("loadend", () => {
      coverImageRef.src = fr.result;
    });

    fr.readAsDataURL(coverFieldValue);
  };

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control">
        <label htmlFor="cover" className="form-control__field">
          Cover
        </label>
        <div
          id="cover"
          className="file-picker"
          aria-invalid={errors.cover ? true : false}
        >
          <img
            alt=""
            src={
              coverFieldValue
                ? loadCoverImage(coverFieldValue.item(0), coverImageRef.current)
                : ""
            }
            className="file-picker__image"
            ref={coverImageRef}
          />
          <input
            type="file"
            {...register("cover", {
              required: { value: true, message: "Cover is required." },
              validate: (value) => {
                const file = value.item(0);
                return (
                  ["image/jpeg", "image/png"].includes(file.type) ||
                  "Only files with extension .jpg, .jpeg and .png are allowed."
                );
              },
            })}
            className="file-picker__input"
          />
        </div>
        <span className="form-control__error">{errors.cover?.message}</span>
      </div>
      <div className="form-control">
        <label htmlFor="title" className="form-control__field">
          Title
        </label>
        <input
          type="text"
          {...register("title", {
            required: { value: true, message: "Title is required" },
            maxLength: {
              value: 120,
              message:
                "Title should be less than or equals to 120 characters length.",
            },
          })}
          id="title"
          className="form-control__input"
          aria-invalid={errors.title ? true : false}
        />
        <span className="form-control__error">{errors.title?.message}</span>
      </div>
      <div className="form-control">
        <label htmlFor="description" className="form-control__field">
          Description
        </label>
        <textarea
          {...register("description", {
            required: { value: true, message: "Description is required" },
          })}
          cols="30"
          rows="5"
          className="form-control__input"
          aria-invalid={errors.description ? true : false}
        />
        <span className="form-control__error">
          {errors.description?.message}
        </span>
      </div>
      <div className="btn-group">
        <button type="submit" className="btn btn--success">
          Publish
        </button>
        <button
          type="reset"
          className="btn btn--danger"
          onClick={() => reset({ cover: "", title: "", description: "" })}
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default WriteForm;
