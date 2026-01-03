import nodemailer from "nodemailer";

// =====================
// KONFIGURASI EMAIL (DENGAN DEBUG)
// =====================

// Buat transporter dengan debugging
const createTransporter = () => {
  // Cek environment variables
  console.log("📧 Email Configuration Check:");
  console.log("EMAIL_HOST:", process.env.EMAIL_HOST);
  console.log("EMAIL_PORT:", process.env.EMAIL_PORT);
  console.log("EMAIL_USER:", process.env.EMAIL_USER ? "***SET***" : "NOT SET");
  console.log(
    "EMAIL_PASSWORD:",
    process.env.EMAIL_PASSWORD ? "***SET***" : "NOT SET"
  );
  console.log("EMAIL_SECURE:", process.env.EMAIL_SECURE);
  console.log("EMAIL_FROM:", process.env.EMAIL_FROM);
  console.log("NODE_ENV:", process.env.NODE_ENV);

  // Konfigurasi transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: parseInt(process.env.EMAIL_PORT || "587"),
    secure: process.env.EMAIL_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    // Debug mode
    debug: process.env.NODE_ENV === "development",
    logger: process.env.NODE_ENV === "development",
    // Timeout settings
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 10000, // 10 seconds
    socketTimeout: 10000, // 10 seconds
  });

  // Verify connection
  transporter.verify(function (error, success) {
    if (error) {
      console.error("❌ Email transporter verification failed:", error);
    } else {
      console.log("✅ Email transporter is ready");
    }
  });

  return transporter;
};

const transporter = createTransporter();

// =====================
// FUNGSI KIRIM EMAIL VERIFIKASI
// =====================
export async function sendVerificationCode(
  to: string,
  code: string,
  expiresInMinutes: number = 3
): Promise<boolean> {
  console.log(`📧 Attempting to send verification code to: ${to}`);

  // Jika di development mode dan EMAIL_DRY_RUN=true, skip pengiriman
  if (
    process.env.NODE_ENV === "development" &&
    process.env.EMAIL_DRY_RUN === "true"
  ) {
    console.log(`📧 [DRY RUN] Verification code for ${to}: ${code}`);
    console.log(`📧 [DRY RUN] Code expires in: ${expiresInMinutes} minutes`);
    return true;
  }

  try {
    // Validasi email penerima
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      console.error(`❌ Invalid recipient email: ${to}`);
      return false;
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM || `"No Reply" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: `Kode Verifikasi: ${code} - Reset Password`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .container { background-color: #f9f9f9; border-radius: 10px; padding: 30px; }
            .header { text-align: center; margin-bottom: 30px; }
            .code-box { 
              background-color: #fff; 
              border: 2px dashed #4CAF50; 
              border-radius: 8px; 
              padding: 20px; 
              text-align: center; 
              margin: 20px 0;
              font-size: 32px;
              font-weight: bold;
              letter-spacing: 5px;
              color: #333;
            }
            .warning { 
              background-color: #fff3cd; 
              border-left: 4px solid #ffc107; 
              padding: 15px; 
              margin: 20px 0;
              border-radius: 4px;
            }
            .footer { 
              margin-top: 30px; 
              padding-top: 20px; 
              border-top: 1px solid #ddd; 
              font-size: 12px; 
              color: #666; 
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="color: #4CAF50;">Reset Password</h1>
              <p>Anda meminta untuk mereset password akun Anda.</p>
            </div>
            
            <p>Gunakan kode verifikasi berikut untuk melanjutkan proses reset password:</p>
            
            <div class="code-box">
              ${code}
            </div>
            
            <div class="warning">
              <strong>⚠️ PERHATIAN:</strong>
              <ul>
                <li>Kode ini berlaku selama <strong>${expiresInMinutes} menit</strong></li>
                <li>Jangan berikan kode ini kepada siapapun</li>
                <li>Kode ini hanya bisa digunakan satu kali</li>
              </ul>
            </div>
            
            <p>Jika Anda tidak meminta reset password, abaikan email ini. Password Anda tidak akan berubah.</p>
            
            <div class="footer">
              <p>Email ini dikirim secara otomatis, mohon tidak membalas.</p>
              <p>© ${new Date().getFullYear()} ${
        process.env.APP_NAME || "Aplikasi Anda"
      }. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `Kode verifikasi Anda: ${code}\n\nKode ini berlaku ${expiresInMinutes} menit.\n\nJika Anda tidak meminta reset password, abaikan email ini.`,
    };

    console.log("📧 Sending email with options:", {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
    });

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully:", {
      messageId: info.messageId,
      response: info.response,
      accepted: info.accepted,
      rejected: info.rejected,
    });

    return true;
  } catch (error: any) {
    console.error("❌ Error sending verification email:", {
      to,
      errorCode: error.code,
      errorMessage: error.message,
      command: error.command,
      stack: error.stack,
    });

    // Handle specific errors
    if (error.code === "EAUTH") {
      console.error("❌ AUTHENTICATION ERROR - Check your email credentials:");
      console.error("1. Ensure EMAIL_USER and EMAIL_PASSWORD are correct");
      console.error(
        "2. For Gmail, use App Password instead of regular password"
      );
      console.error(
        '3. Check if "Less secure app access" is enabled (for Gmail)'
      );
      console.error("4. Verify SMTP settings are correct");
    } else if (error.code === "ECONNECTION") {
      console.error("❌ CONNECTION ERROR - Check network/SMTP settings");
    }

    return false;
  }
}

// =====================
// FUNGSI LAIN-LAIN
// =====================
export async function sendPasswordResetSuccess(
  to: string,
  name?: string
): Promise<boolean> {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || `"No Reply" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: "Password Berhasil Direset",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4CAF50;">✅ Password Berhasil Direset</h2>
          <p>Halo ${name || "Pengguna"},</p>
          <p>Password akun Anda telah berhasil direset pada ${new Date().toLocaleString(
            "id-ID"
          )}.</p>
          <div style="background-color: #e8f5e9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Informasi:</strong></p>
            <p>• Waktu reset: ${new Date().toLocaleString("id-ID")}</p>
            <p>• Email: ${to}</p>
          </div>
          <p>Jika Anda tidak melakukan perubahan ini, segera hubungi admin atau support.</p>
          <hr style="margin: 20px 0;">
          <p style="font-size: 12px; color: #666;">Email notifikasi keamanan.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Reset success email sent to ${to}`);
    return true;
  } catch (error) {
    console.error("Error sending reset success email:", error);
    return false;
  }
}

// =====================
// TEST FUNCTION
// =====================
export async function testEmailConnection(): Promise<boolean> {
  try {
    console.log("🔧 Testing email connection...");

    // Test transporter
    await transporter.verify();
    console.log("✅ Email transporter verified");

    // Test send (to ourselves)
    const testEmail = process.env.EMAIL_USER;
    if (testEmail) {
      const testResult = await sendVerificationCode(testEmail, "123456", 5);
      if (testResult) {
        console.log("✅ Test email sent successfully");
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error("❌ Email connection test failed:", error);
    return false;
  }
}
