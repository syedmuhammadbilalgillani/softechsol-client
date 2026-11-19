"use server";
import logger from "@/lib/logger";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";
import { getAllServicesList } from "@/constants/services";

// Email templates (keeping existing templates)
const getHREmailTemplate = (data: {
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string | null;
  service: string | null;
}) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            background-color: #2563eb;
            color: white;
            padding: 20px;
            border-radius: 8px 8px 0 0;
            margin: -30px -30px 30px -30px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .info-section {
            margin-bottom: 20px;
        }
        .info-label {
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 5px;
            display: block;
        }
        .info-value {
            background-color: #f8f9fa;
            padding: 10px;
            border-radius: 4px;
            border-left: 3px solid #2563eb;
            margin-bottom: 15px;
        }
        .message-box {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 4px;
            border-left: 3px solid #2563eb;
            margin-top: 10px;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 12px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Contact Form Submission</h1>
        </div>
        
        <div class="info-section">
            <span class="info-label">Name:</span>
            <div class="info-value">${data.name}</div>
        </div>

        ${
          data.company
            ? `
        <div class="info-section">
            <span class="info-label">Company / Organization:</span>
            <div class="info-value">${data.company}</div>
        </div>
        `
            : ""
        }
        
        <div class="info-section">
            <span class="info-label">Email:</span>
            <div class="info-value">${data.email}</div>
        </div>
        
        ${
          data.phone
            ? `
        <div class="info-section">
            <span class="info-label">Phone:</span>
            <div class="info-value">${data.phone}</div>
        </div>
        `
            : ""
        }
        
        ${
          data.service
            ? `
        <div class="info-section">
            <span class="info-label">Service Interest:</span>
            <div class="info-value">${data.service}</div>
        </div>
        `
            : ""
        }
        
        ${
          data.message
            ? `
        <div class="info-section">
            <span class="info-label">Message:</span>
            <div class="message-box">${data.message.replace(
              /\n/g,
              "<br>"
            )}</div>
        </div>
        `
            : ""
        }
        
        <div class="footer">
            <p>This is an automated email from the contact form.</p>
            <p>Please respond to the user at: <a href="mailto:${data.email}">${
    data.email
  }</a></p>
        </div>
    </div>
</body>
</html>
  `;
};

const getUserEmailTemplate = (data: { name: string }) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Contacting Us</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            color: white;
            padding: 30px;
            border-radius: 8px 8px 0 0;
            margin: -30px -30px 30px -30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
        }
        .content {
            margin: 20px 0;
        }
        .content p {
            margin-bottom: 15px;
            font-size: 16px;
        }
        .highlight {
            background-color: #eff6ff;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #2563eb;
            margin: 20px 0;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
            text-align: center;
        }
        .footer p {
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Thank You, ${data.name}!</h1>
        </div>
        
        <div class="content">
            <p>Dear ${data.name},</p>
            
            <p>Thank you for reaching out to us! We have successfully received your contact form submission.</p>
            
            <div class="highlight">
                <p style="margin: 0; font-weight: bold;">What happens next?</p>
                <p style="margin: 10px 0 0 0;">Our team will review your message and get back to you as soon as possible, typically within 24-48 hours.</p>
            </div>
            
            <p>We appreciate your interest in our services and look forward to assisting you.</p>
            
            <p>If you have any urgent questions, please feel free to contact us directly.</p>
        </div>
        
        <div class="footer">
            <p><strong>Best regards,</strong></p>
            <p>SoftTech Solutions Team</p>
            <p style="margin-top: 20px; font-size: 12px;">
                This is an automated confirmation email. Please do not reply to this message.
            </p>
        </div>
    </div>
</body>
</html>
  `;
};

// Create reusable transporter
const createTransporter = () => {
  // Validate SMTP credentials
  logger.debug(process.env.SMTP_USER, "SMTP_USER");
  logger.debug(process.env.SMTP_PASSWORD, "SMTP_PASSWORD");
  logger.debug(process.env.SMTP_HOST, "SMTP_HOST");
  logger.debug(process.env.SMTP_PORT, "SMTP_PORT");
  logger.debug(process.env.SMTP_SECURE, "SMTP_SECURE");
  logger.debug(process.env.SMTP_FROM, "SMTP_FROM");
  logger.debug(process.env.COMPANY_NAME, "COMPANY_NAME");
  logger.debug(process.env.NODE_ENV, "NODE_ENV");
  logger.debug(process.env.NEXT_PUBLIC_NODE_ENV, "NEXT_PUBLIC_NODE_ENV");
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    throw new Error(
      "SMTP credentials are not configured. Please check your .env.local file."
    );
  }

  // Check for placeholder password
  const placeholderPatterns = [
    "/* secret */",
    "your-password",
    "your-email-password",
    "password",
  ];
  if (
    placeholderPatterns.some((pattern) =>
      process.env.SMTP_PASSWORD?.includes(pattern)
    )
  ) {
    throw new Error(
      "SMTP_PASSWORD appears to be a placeholder. Please set your actual email password in .env.local"
    );
  }

  // GoDaddy Email Configuration (secureserver.net)
  const smtpHost = process.env.SMTP_HOST || "smtpout.secureserver.net";
  const smtpPort = parseInt(process.env.SMTP_PORT || "587");
  const isSecure = process.env.SMTP_SECURE === "true";

  // Ensure SMTP_USER is the full email address
  const smtpUser = process.env.SMTP_USER.includes("@")
    ? process.env.SMTP_USER
    : `${process.env.SMTP_USER}@${process.env.SMTP_DOMAIN || "softechsol.com"}`;

  // GoDaddy secureserver.net configuration
  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: isSecure, // false for 587, true for 465
    requireTLS: !isSecure, // Require TLS for port 587
    auth: {
      user: smtpUser, // Full email address required
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
      minVersion: "TLSv1.2", // Use TLS 1.2 or higher (NOT SSLv3)
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
    debug: process.env.NODE_ENV === "development",
    logger: process.env.NODE_ENV === "development",
  });
};

// DoS protection: Maximum field lengths (must match client-side)
const MAX_FIELD_LENGTHS = {
  name: 100,
  email: 254, // RFC 5321 limit
  phone: 35,
  company: 150,
  message: 5000,
} as const;

// Verify reCAPTCHA token
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error("[Contact Form Server] RECAPTCHA_SECRET_KEY is missing from environment variables!");
    return false;
  }

  try {
    console.log("[Contact Form Server] Verifying reCAPTCHA token with Google API...");
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${secretKey}&response=${token}`,
      }
    );

    const data = await response.json();
    console.log("[Contact Form Server] Google reCAPTCHA response:", data);

    if (data.success !== true) {
      console.warn("[Contact Form Server] Google reCAPTCHA verification failed! Error codes:", data["error-codes"]);
    }
    return data.success === true;
  } catch (error: any) {
    console.error("[Contact Form Server] reCAPTCHA verification exception:", error?.message || error);
    return false;
  }
}

export const ContactAction = async (formData: FormData) => {
  const timestamp = new Date().toISOString();
  console.log(`\n================== [Contact Form Submission ${timestamp}] ==================`);

  const name = formData.get("name") as string;
  const company = formData.get("company") as string | null;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string | null;
  const message = formData.get("message") as string | null;
  const service = formData.get("service") as string | null;
  const recaptchaToken = formData.get("recaptchaToken") as string;

  console.log("[Contact Form Server] Form fields received:", {
    name,
    email,
    phone,
    company,
    service,
    hasRecaptchaToken: Boolean(recaptchaToken),
  });

  // Verify reCAPTCHA
  if (!recaptchaToken) {
    console.warn("[Contact Form Server] Submission rejected: reCAPTCHA token is missing");
    return {
      success: false,
      error: "reCAPTCHA verification is required",
    };
  }

  const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
  if (!isRecaptchaValid) {
    console.warn(`[Contact Form Server] reCAPTCHA rejected for user email: "${email}"`);
    return {
      success: false,
      error: "reCAPTCHA verification failed. Please try again.",
    };
  }

  // Basic validation
  if (!name || !email) {
    return {
      success: false,
      error: "Name and email are required",
    };
  }

  // DoS protection: Length validation
  if (name.length > MAX_FIELD_LENGTHS.name) {
    return {
      success: false,
      error: `Name must be less than ${MAX_FIELD_LENGTHS.name} characters`,
    };
  }
  if (company && company.length > MAX_FIELD_LENGTHS.company) {
    return {
      success: false,
      error: `Company must be less than ${MAX_FIELD_LENGTHS.company} characters`,
    };
  }
  if (email.length > MAX_FIELD_LENGTHS.email) {
    return {
      success: false,
      error: `Email must be less than ${MAX_FIELD_LENGTHS.email} characters`,
    };
  }
  if (phone && phone.length > MAX_FIELD_LENGTHS.phone) {
    return {
      success: false,
      error: `Phone must be less than ${MAX_FIELD_LENGTHS.phone} characters`,
    };
  }
  if (message && message.length > MAX_FIELD_LENGTHS.message) {
    return {
      success: false,
      error: `Message must be less than ${MAX_FIELD_LENGTHS.message} characters`,
    };
  }

  // DoS protection: Detect suspicious patterns
  const suspiciousPatterns = [
    /(.)\1{50,}/, // Repeated characters (e.g., "aaaaaaaa...")
    /<script|javascript:|onerror=|onload=/i, // XSS attempts
  ];

  const allFields = [name, company, email, phone, message].filter(Boolean).join(" ");
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(allFields)) {
      logger.warn("Suspicious input pattern detected", { pattern: pattern.toString() });
      return {
        success: false,
        error: "Invalid input detected. Please check your submission.",
      };
    }
  }

  // Resolve service name from static list if provided
  const serviceStr = service && service.trim() !== "" ? service.trim() : null;
  const foundService = serviceStr
    ? getAllServicesList().find((s) => s.id === serviceStr)
    : null;
  const serviceName = foundService?.title || serviceStr || null;

  const combinedNotes = [
    company?.trim() ? `Company: ${company.trim()}` : null,
    serviceName ? `Selected Service: ${serviceName}` : null,
    message?.trim() || null,
  ]
    .filter(Boolean)
    .join("\n\n");

  try {
    // Save to database
    console.log("[Contact Form Server] Inserting contact inquiry into database...");
    const response = await prisma.contactUs.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        notes: combinedNotes || null,
        service_id: null,
        status: "NEW",
      },
    });
    console.log(`[Contact Form Server] Database entry created successfully! contact_id: ${response.contact_id}`);

    // Send emails
    let transporter;
    try {
      console.log("[Contact Form Server] Setting up SMTP transport...");
      transporter = createTransporter();
      console.log("[Contact Form Server] SMTP transport ready");
    } catch (transporterError: any) {
      console.error("[Contact Form Server] SMTP Config Error:", transporterError.message);
      // Still save to database even if email fails
      return {
        success: true,
        response,
        warning: transporterError.message,
      };
    }

    const hrEmail =
      process.env.HR_EMAIL || process.env.SMTP_USER || "hr@example.com";
    const fromEmail =
      process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@example.com";
    const companyName = process.env.COMPANY_NAME || "SoftTech Solutions";

    // Prepare email data
    const emailData = {
      name: name.trim(),
      company: company?.trim() || null,
      email: email.trim(),
      phone: phone?.trim() || null,
      message: message?.trim() || null,
      service: serviceName,
    };
    
    // Send email to HR
    try {
      console.log(`[Contact Form Server] Sending alert email to HR (${hrEmail})...`);
      const hrResult = await transporter.sendMail({
        from: `"${companyName}" <${fromEmail}>`,
        to: hrEmail,
        subject: `New Contact Form Submission from ${name.trim()}`,
        html: getHREmailTemplate(emailData),
      });
      console.log(`[Contact Form Server] HR email sent successfully! MessageId: ${hrResult.messageId}`);
    } catch (emailError: any) {
      console.error("[Contact Form Server] Failed to send HR email:", emailError.message || emailError);
    }

    // Send confirmation email to user
    try {
      console.log(`[Contact Form Server] Sending confirmation email to user (${email.trim()})...`);
      const userResult = await transporter.sendMail({
        from: `"${companyName}" <${fromEmail}>`,
        to: email.trim(),
        subject: `Thank You for Contacting ${companyName}`,
        html: getUserEmailTemplate({ name: name.trim() }),
      });
      console.log(`[Contact Form Server] Confirmation email sent successfully to user! MessageId: ${userResult.messageId}`);
    } catch (emailError: any) {
      console.error("[Contact Form Server] Failed to send user confirmation email:", emailError.message || emailError);
    }

    console.log("================== [Contact Form Process Complete: SUCCESS] ==================\n");
    return { success: true, response };
  } catch (error: any) {
    console.error("[Contact Form Server] Fatal submission error:", error.message || error);
    return {
      success: false,
      error: "Failed to submit contact form. Please try again.",
    };
  }
};