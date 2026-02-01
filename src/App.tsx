import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import DashboardLayout from "@/layouts/DashboardLayout"
import AuditAssuranceDashboard from "@/pages/audit-assurance/Dashboard"
import AuditAssuranceAddRecord from "@/pages/audit-assurance/AddRecord"
import AuditAssuranceClientDetail from "@/pages/audit-assurance/ClientDetail"

import InternalAuditDashboard from "@/pages/internal-audit/Dashboard"
import InternalAuditAddRecord from "@/pages/internal-audit/AddRecord"
import InternalAuditClientDetail from "@/pages/internal-audit/ClientDetail"

import ForensicAuditDashboard from "@/pages/forensic-audit/Dashboard"
import ForensicAuditAddRecord from "@/pages/forensic-audit/AddRecord"
import ForensicAuditClientDetail from "@/pages/forensic-audit/ClientDetail"

import ManagementAccountDashboard from "@/pages/management-account/Dashboard"
import ManagementAccountAddRecord from "@/pages/management-account/AddRecord"
import ManagementAccountClientDetail from "@/pages/management-account/ClientDetail"

import TaxAccountDashboard from "@/pages/tax-account/Dashboard"
import TaxAccountAddRecord from "@/pages/tax-account/AddRecord"
import TaxAccountClientDetail from "@/pages/tax-account/ClientDetail"

import InternalControlDashboard from "@/pages/internal-control-outsourcing/Dashboard"
import InternalControlAddRecord from "@/pages/internal-control-outsourcing/AddRecord"
import InternalControlClientDetail from "@/pages/internal-control-outsourcing/ClientDetail"

import ClientPortal from "@/pages/client-portal"
import EmployeeManagement from "@/pages/employee-management"
import TeamPage from "@/pages/team"
import AnalyticsPage from "@/pages/analytics"
import ReportsPage from "@/pages/reports"
import SettingsPage from "@/pages/settings"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<AuditAssuranceDashboard />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="employee-management" element={<EmployeeManagement />} />
          <Route path="client-portal" element={<ClientPortal />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />

          <Route path="audit-assurance" element={<AuditAssuranceDashboard />} />
          <Route path="audit-assurance/new" element={<AuditAssuranceAddRecord />} />
          <Route path="audit-assurance/:id" element={<AuditAssuranceClientDetail />} />

          <Route path="internal-audit" element={<InternalAuditDashboard />} />
          <Route path="internal-audit/new" element={<InternalAuditAddRecord />} />
          <Route path="internal-audit/:id" element={<InternalAuditClientDetail />} />

          <Route path="forensic-audit" element={<ForensicAuditDashboard />} />
          <Route path="forensic-audit/new" element={<ForensicAuditAddRecord />} />
          <Route path="forensic-audit/:id" element={<ForensicAuditClientDetail />} />

          <Route path="management-account" element={<ManagementAccountDashboard />} />
          <Route path="management-account/new" element={<ManagementAccountAddRecord />} />
          <Route path="management-account/:id" element={<ManagementAccountClientDetail />} />

          <Route path="tax-account" element={<TaxAccountDashboard />} />
          <Route path="tax-account/new" element={<TaxAccountAddRecord />} />
          <Route path="tax-account/:id" element={<TaxAccountClientDetail />} />

          <Route path="internal-control-outsourcing" element={<InternalControlDashboard />} />
          <Route path="internal-control-outsourcing/new" element={<InternalControlAddRecord />} />
          <Route path="internal-control-outsourcing/:id" element={<InternalControlClientDetail />} />
        </Route>
      </Routes>
    </Router >
  )
}

export default App
