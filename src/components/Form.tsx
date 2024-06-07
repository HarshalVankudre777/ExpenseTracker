import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import categories from "../categories";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description should be at least 3 characters." })
    .max(50),
  amount: z
    .number({ invalid_type_error: "Amount is required." })
    .min(0.01)
    .max(100_000),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Category is required." }),
  }),
});
type ExpenseFormData = z.infer<typeof schema>;
interface Props {
  onSubmit: (data: ExpenseFormData) => void;
}

const Form = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });

  return (
    <Box as="form" onSubmit={handleSubmit((data) => {
      onSubmit(data);
      reset();
    })}>
      <FormControl isInvalid={!!errors.description} mb={4}>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Input
          {...register("description")}
          id="description"
          type="text"
        />
        <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.amount} mb={4}>
        <FormLabel htmlFor="amount">Amount</FormLabel>
        <Input
          {...register("amount", { valueAsNumber: true })}
          id="amount"
          type="number"
        />
        <FormErrorMessage>{errors.amount?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.category} mb={4}>
        <FormLabel htmlFor="category">Category</FormLabel>
        <Select {...register("category")} id="category">
          <option value=""></option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
        <FormErrorMessage>{errors.category?.message}</FormErrorMessage>
      </FormControl>

      <Button colorScheme="blue" type="submit">
        Submit
      </Button>
    </Box>
  );
};

export default Form;