import { useForm } from "react-hook-form";
import {
  ButtonDanger,
  ButtonSuccess,
} from "../components/styled/Button.styled";
import ButtonGroup from "../components/styled/ButtonGroup.styled";
import { Input, FileInput, TextArea } from "../components/styled/Input.styled";
import FormControl from "./styled/FormControl.styled";
import FormError from "./styled/FormError.styled";
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
  const coverFieldValue = watch("cover")?.item(0);

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
      <FormControl>
        <label htmlFor="cover">Cover</label>
        <FileInput id="cover" aria-invalid={errors.cover ? true : false}>
          <img
            alt=""
            src={
              coverFieldValue
                ? loadCoverImage(coverFieldValue, coverImageRef.current)
                : ""
            }
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
          />
        </FileInput>
        {<FormError>{errors.cover?.message}</FormError>}
      </FormControl>
      <FormControl>
        <label htmlFor="title">Title</label>
        <Input
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
          aria-invalid={errors.title ? true : false}
        />
        {<FormError>{errors.title?.message}</FormError>}
      </FormControl>
      <FormControl>
        <label htmlFor="description">Description</label>
        <TextArea
          {...register("description", {
            required: { value: true, message: "Description is required" },
            maxLength: {
              value: 255,
              message:
                "Description should be less than or equals to 255 characters length.",
            },
          })}
          cols="30"
          rows="5"
          aria-invalid={errors.description ? true : false}
        />
        {<FormError>{errors.description?.message}</FormError>}
      </FormControl>
      <ButtonGroup>
        <ButtonSuccess type="submit">Publish</ButtonSuccess>
        <ButtonDanger
          type="reset"
          onClick={() => reset({ cover: "", title: "", description: "" })}
        >
          Clear
        </ButtonDanger>
      </ButtonGroup>
    </form>
  );
};

export default WriteForm;
