import categories from '../categories';
import { Select } from '@chakra-ui/react'

interface Props { 
  onSelectCategory: (category: string) => void;
}

const ExpenseFilter = ({ onSelectCategory }: Props) => {
  return (
    <Select variant = 'filled' className="form-select" onChange={(event) => onSelectCategory(event.target.value)}>
      <option value="">All categories</option>
      {categories.map(category => <option key={category} value={category}>{category}</option>)}
    </Select>
  )
}

export default ExpenseFilter