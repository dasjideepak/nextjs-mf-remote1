import { Card } from "@dasjideepak/mf-shared-ui";

export function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Customer Profile</h2>
        <p className="mt-1 text-sm text-gray-500">
          This page is fully owned by remote1.
        </p>
      </div>

      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
            C
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Customer User
            </h3>
            <p className="text-sm text-gray-500">customer@example.com</p>
            <p className="mt-1 text-xs text-gray-400">ID: u-customer-01</p>
          </div>
        </div>
      </Card>

      <Card title="Account Details">
        <dl className="divide-y divide-gray-100">
          {[
            ["Full Name", "Customer User"],
            ["Email", "customer@example.com"],
            ["Role", "Customer"],
            ["Member Since", "January 2025"],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between py-2.5 text-sm">
              <dt className="text-gray-500">{label}</dt>
              <dd className="font-medium text-gray-900">{value}</dd>
            </div>
          ))}
        </dl>
      </Card>
    </div>
  );
}
