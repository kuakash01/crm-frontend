import Link from "next/link";

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Leads", href: "/dashboard/leads" },
    { name: "Customers", href: "/dashboard/customers" },
    { name: "Deals", href: "/dashboard/deals" },
    { name: "Services", href: "/dashboard/services" },
    { name: "Tasks", href: "/dashboard/tasks" },
    { name: "Users", href: "/dashboard/users" },
    { name: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <aside className="hidden md:flex w-64 border-r bg-background flex-col">
      <div className="h-16 flex items-center px-6 border-b">
        <h2 className="text-xl font-bold">
          CRM Platform
        </h2>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="block rounded-lg px-4 py-2 text-sm hover:bg-muted"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}