import React from 'react';

// Restringimos T para asegurar que cualquier objeto que pasemos TENGA un 'id'
interface TableProps<T extends { id: string | number }> {
  data: T[];
  renderRow: (item: T) => React.ReactNode;
}

// El componente infiere automáticamente el tipo T basándose en el prop 'data'
function DataTable<T extends { id: string | number }>({ data, renderRow }: TableProps<T>) {
  return (
    <div className="flex flex-col border border-gray-200 rounded-lg shadow-sm">
      {data.map((item) => (
        // Sabemos que item.id existe de forma segura gracias a T extends { id: ... }
        <div key={item.id} className="border-b p-4 hover:bg-gray-50">
          {renderRow(item)}
        </div>
      ))}
    </div>
  );
}

// Uso:
const users = [
  { id: 1, name: 'Carlos' },
  { id: 2, name: 'Ana' },
];
// TypeScript sabe que 'user' en renderRow tiene id (number) y name (string)
<DataTable data={users} renderRow={(user) => <span>{user.name}</span>} />;
