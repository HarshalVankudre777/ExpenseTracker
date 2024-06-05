import Form from "./components/Form";
import ExpenseList from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";
import { useState } from "react";

export const categories = ["groceries", "utilities", "entertainement"];

function App() {
  const [selectedCategory, setSelectedCategory] = useState(" ");

  const [expenses, setExpenses] = useState([
    { id: 1, description: "apple", amount: 20, category: "groceries" },
    { id: 2, description: "rent", amount: 50, category: "utilities" },
    { id: 3, description: "movie", amount: 10, category: "entertainement" },
  ]);

  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  return (
    <div>
      <div className="mb-5"><Form /></div>
      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div>

      <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
      />
    </div>
  );
}

export default App;
