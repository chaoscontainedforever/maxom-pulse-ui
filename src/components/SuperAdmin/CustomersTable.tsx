
import CustomerTableMock from "./CustomerTableMock";

interface CustomersTableProps {
  searchTerm?: string;
}

// This component is a wrapper around the mock table
// In a real application, this would fetch data from the API
// For now, we're just using the mock table
const CustomersTable = ({ searchTerm }: CustomersTableProps) => {
  return <CustomerTableMock searchTerm={searchTerm} />;
};

export default CustomersTable;
