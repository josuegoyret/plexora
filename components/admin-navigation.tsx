import Link from "next/link";

const AdminNavigation = () => {
  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/services", label: "Services" },
    { href: "/availability", label: "Availability" },
  ];

  return (
    <nav className="mb-8">
      <div className="flex gap-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="px-4 py-2 rounded-lg transition-colors hover:bg-muted"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default AdminNavigation;
