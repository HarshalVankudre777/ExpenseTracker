import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button
} from '@chakra-ui/react'


interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

interface Props {
  expenses: Expense[];
  onDelete: (id: number) => void;
}

const ExpenseList = ({ expenses, onDelete }: Props) => {
  if (expenses.length === 0) return null;

  return (
    <TableContainer>
    <Table variant = 'striped' colorScheme='blue' >
      <TableCaption>List of Expenses with Total Amount</TableCaption>
      <Thead>
        <Tr>
          <Th>Description</Th>
          <Th>Amount</Th>
          <Th>Category</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {expenses.map((expense) => (
          <Tr key={expense.id}>
            <Td>{expense.description}</Td>
            <Td>€{expense.amount.toFixed(2)}</Td>
            <Td>{expense.category}</Td>
            <Td>
              <Button
                colorScheme='red'
                onClick={() => onDelete(expense.id)}
              >
                Delete
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
          <Td>Total</Td>
          <Td>€{expenses.reduce((acc, expense) => expense.amount + acc, 0).toFixed(2)}</Td>
          <Td></Td>
          <Td></Td>
        </Tr>
      </Tfoot>
    </Table>
    </TableContainer>
  );
};

export default ExpenseList;