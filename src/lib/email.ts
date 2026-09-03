import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

interface SendPasswordResetEmailParams {
  to: string;
  name: string;
  resetUrl: string;
}

export async function sendPasswordResetEmail({
  to,
  name,
  resetUrl,
}: SendPasswordResetEmailParams) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [to],
    subject: "Reset your Rizcent Technologies password",
    html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Reset your Rizcent password</title>
        </head>

        <body
          style="
            margin: 0;
            padding: 0;
            background-color: #f1f5f9;
            font-family: Arial, Helvetica, sans-serif;
          "
        >
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="background-color: #f1f5f9; padding: 40px 16px;"
          >
            <tr>
              <td align="center">

                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  style="
                    max-width: 600px;
                    background-color: #ffffff;
                    border-radius: 18px;
                    overflow: hidden;
                    border: 1px solid #e2e8f0;
                  "
                >

                  <!-- Header -->
                  <tr>
                    <td
                      style="
                        background-color: #020617;
                        padding: 32px 32px 28px;
                        text-align: center;
                      "
                    >
                      <div
                        style="
                          display: inline-block;
                          background-color: #2563eb;
                          color: #ffffff;
                          width: 52px;
                          height: 52px;
                          line-height: 52px;
                          border-radius: 14px;
                          font-size: 22px;
                          font-weight: bold;
                        "
                      >
                        R
                      </div>

                      <h1
                        style="
                          margin: 18px 0 6px;
                          color: #ffffff;
                          font-size: 24px;
                          line-height: 32px;
                        "
                      >
                        Rizcent Technologies
                      </h1>

                      <p
                        style="
                          margin: 0;
                          color: #94a3b8;
                          font-size: 13px;
                        "
                      >
                        Secure technology. Built for tomorrow.
                      </p>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 32px;">

                      <p
                        style="
                          margin: 0 0 12px;
                          color: #2563eb;
                          font-size: 13px;
                          font-weight: bold;
                          text-transform: uppercase;
                          letter-spacing: 1px;
                        "
                      >
                        Account Security
                      </p>

                      <h2
                        style="
                          margin: 0 0 18px;
                          color: #0f172a;
                          font-size: 28px;
                          line-height: 36px;
                        "
                      >
                        Reset your password
                      </h2>

                      <p
                        style="
                          margin: 0 0 16px;
                          color: #334155;
                          font-size: 16px;
                          line-height: 26px;
                        "
                      >
                          Hi ${escapeHtml(name)},
                      </p>

                      <p
                        style="
                          margin: 0 0 24px;
                          color: #475569;
                          font-size: 15px;
                          line-height: 25px;
                        "
                      >
                        We received a request to reset the password
                        for your Rizcent Technologies account. Click
                        the button below to create a new password.
                      </p>

                      <!-- Button -->
                      <table
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        style="margin: 0 0 28px;"
                      >
                        <tr>
                          <td
                            style="
                              border-radius: 10px;
                              background-color: #2563eb;
                            "
                          >
                            <a
                              href="${escapeHtml(resetUrl)}"
                              style="
                                display: inline-block;
                                padding: 14px 24px;
                                color: #ffffff;
                                text-decoration: none;
                                font-size: 15px;
                                font-weight: bold;
                              "
                            >
                              Reset My Password
                            </a>
                          </td>
                        </tr>
                      </table>

                      <div
                        style="
                          background-color: #f8fafc;
                          border: 1px solid #e2e8f0;
                          border-radius: 12px;
                          padding: 18px;
                          margin-bottom: 24px;
                        "
                      >
                        <p
                          style="
                            margin: 0 0 8px;
                            color: #0f172a;
                            font-size: 13px;
                            font-weight: bold;
                          "
                        >
                          Security information
                        </p>

                        <p
                          style="
                            margin: 0;
                            color: #64748b;
                            font-size: 13px;
                            line-height: 21px;
                          "
                        >
                          This password reset link will expire
                          after 1 hour. If you did not request a
                          password reset, you can safely ignore
                          this email.
                        </p>
                      </div>

                      <p
                        style="
                          margin: 0;
                          color: #64748b;
                          font-size: 13px;
                          line-height: 21px;
                        "
                      >
                        For your security, never share your password
                        or password reset link with anyone.
                      </p>

                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td
                      style="
                        border-top: 1px solid #e2e8f0;
                        padding: 24px 32px;
                        text-align: center;
                      "
                    >
                      <p
                        style="
                          margin: 0 0 6px;
                          color: #64748b;
                          font-size: 12px;
                        "
                      >
                        © ${new Date().getFullYear()} Rizcent Technologies
                      </p>

                      <p
                        style="
                          margin: 0;
                          color: #94a3b8;
                          font-size: 11px;
                        "
                      >
                        This is an automated security email.
                        Please do not reply.
                      </p>
                    </td>
                  </tr>

                </table>

              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  });

  if (error) {
    console.error("RESEND_EMAIL_ERROR:", error);
    throw new Error("Failed to send password reset email.");
  }

  return data;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}