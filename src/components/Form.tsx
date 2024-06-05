import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { categories } from "../App";

const schema = z.object({
  description: z.string().min(3),
  amount: z.number({ invalid_type_error: "Amount is Required" }).min(18),
  category: z.string().min(3),
});

type FormData = z.infer<typeof schema>;
const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="name">Description</label>
        <input
          type="text"
          className="form-control"
          id="description"
          {...register("description")}
        />
        {errors.description && (
          <span className="text-danger">{errors.description.message}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          className="form-control"
          id="amount"
          {...register("amount", { valueAsNumber: true })}
        />
        {errors.amount && (
          <span className="text-danger">{errors.amount.message}</span>
        )}
      </div>

      <div className="form-group mb-3">
        <label htmlFor="category">Example select</label>
        <select
          className="form-control"
          id="category"
          {...register("category")}
        >
          <option></option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Form;
