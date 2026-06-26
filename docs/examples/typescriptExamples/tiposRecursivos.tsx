// El tipo se llama a sí mismo en la propiedad opcional 'children'
type MenuItem = {
  label: string;
  url?: string;
  icon?: React.ReactNode;
  children?: MenuItem[]; // <--- Recursividad
};

interface SidebarProps {
  items: MenuItem[];
}

function SidebarMenu({ items }: SidebarProps) {
  return (
    <ul className="pl-4 space-y-2">
      {items.map((item, index) => (
        <li key={index} className="text-gray-700">
          <a href={item.url} className="block hover:text-blue-600">
            {item.label}
          </a>

          {/* Si tiene hijos, el componente se llama a sí mismo */}
          {item.children && item.children.length > 0 && <SidebarMenu items={item.children} />}
        </li>
      ))}
    </ul>
  );
}
