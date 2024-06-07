import { ChakraProvider, Box, VStack, Heading } from "@chakra-ui/react";
import ExpenseForm from "./components/Form";
import ExpenseList from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";
import { useState } from "react";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState([
    { id: 1, description: "apple", amount: 20, category: "groceries" },
    { id: 2, description: "rent", amount: 50, category: "utilities" },
    { id: 3, description: "movie", amount: 10, category: "entertainement" },
  ]);

  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  return (
    <ChakraProvider>
      <Box maxWidth='800px' mx="auto" py={8}>
        <Heading mb={6}>Expense Tracker</Heading>
        <VStack spacing={6}>
          <Box w="100%">
            <ExpenseForm
              onSubmit={(expense) =>
                setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
              }
            />
          </Box>
          <Box w="100%">
            <ExpenseFilter
              onSelectCategory={(category) => setSelectedCategory(category)}
            />
          </Box>
          <Box w="100%">
            <ExpenseList
              expenses={visibleExpenses}
              onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
            />
          </Box>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;