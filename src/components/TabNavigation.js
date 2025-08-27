export default function TabNavigation({ activeTab }) {
  const tabs = [
    { id: "account", label: "Account", href: "/account-settings" },
    { id: "coin-management", label: "Coin Management", href: "/coin-management" },
  ]

  return (
    <div className="mb-8">
      <ul className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <li key={tab.id} className="mr-8">
            <a
              href={tab.href}
              className={`inline-block py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-teal-500 text-teal-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
