// This script creates: public/test-docs/risk-sample.pdf
// Usage: Ask me to run the script, or run it from your v0 Scripts UI.

import fs from "fs"
import path from "path"
import PDFDocument from "pdfkit"

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function h1(doc, text) {
  doc.moveDown(0.5).fontSize(20).fillColor("#0f172a").text(text, { underline: false })
  doc.moveDown(0.25)
}

function h2(doc, text) {
  doc.moveDown(0.25).fontSize(14).fillColor("#0f172a").text(text)
}

function p(doc, text) {
  doc.moveDown(0.15).fontSize(11).fillColor("#111827").text(text, { align: "left" })
}

function li(doc, text) {
  doc.fontSize(11).text(`• ${text}`, { indent: 10 })
}

function code(doc, text) {
  doc.moveDown(0.2).fontSize(10).fillColor("#374151").text(text, { align: "left" })
}

function run() {
  const outDir = path.join("public", "test-docs")
  ensureDir(outDir)
  const outPath = path.join(outDir, "risk-sample.pdf")

  const doc = new PDFDocument({ size: "A4", margin: 54 })
  const stream = fs.createWriteStream(outPath)
  doc.pipe(stream)

  h1(doc, "Customer Banking Portal — Risk Brief")
  p(doc, `Generated: ${new Date().toISOString()}`)
  p(doc, "This document describes the Customer Banking Portal to support automated risk analysis and clarification prompts.")

  h2(doc, "System Overview")
  li(doc, "Primary Function: Customer account access, balance view, fund transfers, card management.")
  li(doc, "Environment: Public internet access via a responsive web application.")
  li(doc, "Users: Retail customers and internal support agents.")

  h2(doc, "Technology Stack")
  li(doc, "Frontend: React 18, Tailwind CSS, served via CDN.")
  li(doc, "Backend: Node.js 20 (Express), REST APIs.")
  li(doc, "Database: PostgreSQL 14 for transactional data; Redis for sessions.")
  li(doc, "Infra: Kubernetes on managed cloud, NGINX ingress, Cloud WAF enabled.")
  li(doc, "Third-Parties: Payment Processor (PCI-DSS scope), Email/SMS provider.")

  h2(doc, "Data Classification & Stores")
  li(doc, "PII: Full name, email, phone (moderate sensitivity).")
  li(doc, "Sensitive: Account numbers, transaction history (high sensitivity).")
  li(doc, "Secrets: API keys managed in cloud secret manager.")
  li(doc, "Logs: Centralized in ELK; some fields partially masked.")

  h2(doc, "Authentication & Authorization")
  li(doc, "Auth: Username/password; MFA enforced for admins. Customer MFA rollout planned within 6 months.")
  li(doc, "Sessions: HTTP-only secure cookies; 24h expiry.")
  li(doc, "RBAC: Customer, Support Agent, Admin roles.")

  h2(doc, "Security Controls")
  li(doc, "Transport: TLS 1.2+ enforced; HSTS enabled.")
  li(doc, "At-Rest: Volume-level encryption via cloud provider. Field-level encryption for PII is not yet implemented.")
  li(doc, "WAF: Managed rules active; custom rules for credential stuffing not tuned yet.")
  li(doc, "Scanning: Weekly SAST; monthly DAST. Container images scanned on push.")
  li(doc, "Backups: Nightly; restore tested quarterly.")

  h2(doc, "Third-Party & Compliance")
  li(doc, "Payment Processor: PCI-DSS SAQ A-EP evidence pending. Current 3rd-party audit report status is unclear.")
  li(doc, "Email/SMS: Data processing agreement signed; geo set to EU region, but verification pending.")
  li(doc, "Privacy: DSAR handled by separate service; data retention policy 7 years.")

  h2(doc, "Known Gaps & Assumptions (Intentionally Ambiguous)")
  li(doc, "Field-level encryption for PII is planned but not implemented. Timeline proposed for Q4.")
  li(doc, "MFA for all customers is in staged rollout; exact completion date to be confirmed.")
  li(doc, "Incident runbooks draft exists; tabletop exercise not yet performed.")
  li(doc, "Cloud WAF custom rules for bot/credential-stuffing mitigation are not tuned.")
  li(doc, "Vendor audit status for the payment processor is pending confirmation from procurement.")

  h2(doc, "Representative Use Cases")
  li(doc, "Customer signs in and views balances.")
  li(doc, "Customer transfers funds between accounts.")
  li(doc, "Customer updates profile and requests statement export.")

  h2(doc, "Suggested Clarification Themes (for AI)")
  p(doc, "The following themes are intentionally present to elicit clarifying questions with options:")
  li(doc, "Encryption at rest for sensitive fields (None, Volume-only, Field-level, Tokenization).")
  li(doc, "Third-party vendor audit status (Not started, In progress, Completed, Unknown).")
  li(doc, "MFA rollout timeline (0–3 months, 3–6 months, 6–12 months, Unknown).")
  li(doc, "PII masking in logs (None, Partial, Full, Unknown).")

  h2(doc, "Embedded JSON Metadata (to aid parsers)")
  code(doc, JSON.stringify({
    system: {
      name: "Customer Banking Portal",
      env: "prod",
      pii: ["name", "email", "phone"],
      sensitive: ["account_number", "transactions"]
    },
    security: {
      tls: "1.2+",
      hsts: true,
      encryption_at_rest: "volume-only",
      field_level_encryption: false,
      waf: { managed: true, custom_rules: "not_tuned" },
      mfa: { admins: true, customers_rollout_months: 6 }
    },
    third_party: {
      payment_processor_audit: "unknown",
      email_sms_geo: "eu",
      dpa_signed: true
    },
    gaps: [
      "field_level_encryption_missing",
      "waf_custom_rules_not_tuned",
      "vendor_audit_unknown"
    ]
  }, null, 2))

  doc.moveDown(0.5)
  p(doc, "Ambiguities above are intentional to drive clarifying questions with selectable options.")
  doc.end()

  stream.on("finish", () => {
    console.log("[v0] Test PDF generated:", outPath)
  })
}

run()
