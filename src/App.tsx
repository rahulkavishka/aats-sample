import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from "@/pages/Login"
import MainLayout from "@/layouts/MainLayout"
import Dashboard from "@/pages/Dashboard"
import Clients from "@/pages/Clients"
import Team from "@/pages/Team"
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

import CITPage from "@/pages/tax-filing/cit/CITPage"
import IITPage from "@/pages/tax-filing/iit/IITPage"
import VATPage from "@/pages/tax-filing/vat/VATPage"
import SSCLPage from "@/pages/tax-filing/sscl/SSCLPage"
import WHTPage from "@/pages/tax-filing/wht/WHTPage"

import CompanyRegistrationDetail from "@/pages/secretarial-advisory/company-registration/ClientDetail"
import CompanyRegistrationDashboard from "@/pages/secretarial-advisory/company-registration/Dashboard"
import CompanyRegistrationAdd from "@/pages/secretarial-advisory/company-registration/AddRecord"
import EpfEtfDashboard from "@/pages/secretarial-advisory/epf-etf/Dashboard"
import EpfEtfAdd from "@/pages/secretarial-advisory/epf-etf/AddRecord"
import EpfEtfDetail from "@/pages/secretarial-advisory/epf-etf/EPFDetail"
import TradeLicenseDashboard from "@/pages/secretarial-advisory/trade-license/Dashboard"
import TradeLicenseAdd from "@/pages/secretarial-advisory/trade-license/AddRecord"
import TradeLicenseDetail from "@/pages/secretarial-advisory/trade-license/TradeLicenseDetail"
import TradeMarkDashboard from "@/pages/secretarial-advisory/trade-mark/Dashboard"
import TradeMarkAdd from "@/pages/secretarial-advisory/trade-mark/AddRecord"
import TradeMarkDetail from "@/pages/secretarial-advisory/trade-mark/TradeMarkDetail"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="clients" element={<Clients />} />
          <Route path="team" element={<Team />} />
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

          {/* Tax Filing Section */}
          <Route path="tax-filing/cit" element={<CITPage />} />
          <Route path="tax-filing/iit" element={<IITPage />} />
          <Route path="tax-filing/vat" element={<VATPage />} />
          <Route path="tax-filing/sscl" element={<SSCLPage />} />
          <Route path="tax-filing/wht" element={<WHTPage />} />

          {/* Secretarial & Advisory */}
          <Route path="secretarial-advisory/company-registration" element={<CompanyRegistrationDashboard />} />
          <Route path="secretarial-advisory/company-registration/new" element={<CompanyRegistrationAdd />} />
          <Route path="secretarial-advisory/company-registration/:id" element={<CompanyRegistrationDetail />} />

          <Route path="secretarial-advisory/epf-etf" element={<EpfEtfDashboard />} />
          <Route path="secretarial-advisory/epf-etf/new" element={<EpfEtfAdd />} />
          <Route path="secretarial-advisory/epf-etf/:id" element={<EpfEtfDetail />} />

          <Route path="secretarial-advisory/trade-license" element={<TradeLicenseDashboard />} />
          <Route path="secretarial-advisory/trade-license/new" element={<TradeLicenseAdd />} />
          <Route path="secretarial-advisory/trade-license/:id" element={<TradeLicenseDetail />} />

          <Route path="secretarial-advisory/trade-mark" element={<TradeMarkDashboard />} />
          <Route path="secretarial-advisory/trade-mark/new" element={<TradeMarkAdd />} />
          <Route path="secretarial-advisory/trade-mark/:id" element={<TradeMarkDetail />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
