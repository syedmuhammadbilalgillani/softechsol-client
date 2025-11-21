"use server";   
import logger from "@/lib/logger";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";

// Email templates
const getHREmailTemplate = (data: {
  name: string;
  email: string;
  phone: string | null;
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
            <h1>📧 New Contact Form Submission</h1>
        </div>
        
        <div class="info-section">
            <span class="info-label">Name:</span>
            <div class="info-value">${data.name}</div>
        </div>
        
        <div class="info-section">
            <span class="info-label">Email:</span>
            <div class="info-value">${data.email}</div>
        </div>
        
        ${data.phone ? `
        <div class="info-section">
            <span class="info-label">Phone:</span>
            <div class="info-value">${data.phone}</div>
        </div>
        ` : ''}
        
        ${data.service ? `
        <div class="info-section">
            <span class="info-label">Service Interest:</span>
            <div class="info-value">${data.service}</div>
        </div>
        ` : ''}
        
        ${data.message ? `
        <div class="info-section">
            <span class="info-label">Message:</span>
            <div class="message-box">${data.message.replace(/\n/g, '<br>')}</div>
        </div>
        ` : ''}
        
        <div class="footer">
            <p>This is an automated email from the contact form.</p>
            <p>Please respond to the user at: <a href="mailto:${data.email}">${data.email}</a></p>
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
            <h1>✨ Thank You, ${data.name}!</h1>
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
    throw new Error("SMTP credentials are not configured. Please check your .env.local file.");
  }

  // Check for placeholder password
  const placeholderPatterns = ['/* secret */', 'your-password', 'your-email-password', 'password'];
  if (placeholderPatterns.some(pattern => process.env.SMTP_PASSWORD?.includes(pattern))) {
    throw new Error("SMTP_PASSWORD appears to be a placeholder. Please set your actual email password in .env.local");
  }

  // Titan Email (GoDaddy) configuration
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.titan.email",
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: process.env.SMTP_SECURE === "true", // true for 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    authMethod: 'LOGIN', // Try LOGIN authentication method
    tls: {
      rejectUnauthorized: false,
      minVersion: 'TLSv1.2',
    },
    debug: process.env.NODE_ENV === 'development',
    logger: process.env.NODE_ENV === 'development',
  });
};

export const ContactAction = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string | null;
  const message = formData.get("message") as string | null; // This maps to `notes` in schema
  const service = formData.get("service") as string | null;

  // Validation
  if (!name || !email) {
    return { 
      success: false, 
      error: "Name and email are required" 
    };
  }

  // Convert service to integer if provided
  const serviceId = service && service !== "" 
    ? parseInt(service, 10) 
    : null;

  // Validate service ID if provided
  if (serviceId !== null && isNaN(serviceId)) {
    return { 
      success: false, 
      error: "Invalid service selection" 
    };
  }

  try {
    // Save to database
    const response = await prisma.contactUs.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        notes: message?.trim() || null, // Map 'message' to 'notes'
        service_id: serviceId, // Use service_id instead of service
        status: "NEW", // Explicitly set status
      },
    });

    // Get service name if service_id exists
    let serviceName = null;
    if (serviceId) {
      try {
        const serviceData = await prisma.serviceCategory.findUnique({
          where: { id: serviceId },
          select: { name: true },
        });
        serviceName = serviceData?.name || null;
      } catch (error) {
        console.error("Error fetching service name:", error);
      }
    }

    // Send emails
    let transporter;
    try {
      transporter = createTransporter();
    } catch (transporterError: any) {
      console.error("SMTP Configuration Error:", transporterError.message);
      // Still save to database even if email fails
      return { 
        success: true, 
        response,
        warning: transporterError.message 
      };
    }

    const hrEmail = process.env.HR_EMAIL || process.env.SMTP_USER || "hr@example.com";
    const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@example.com";
    const companyName = process.env.COMPANY_NAME || "SoftTech Solutions";

    // Prepare email data
    const emailData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || null,
      message: message?.trim() || null,
      service: serviceName,
    };

    // Send email to HR
    try {
      await transporter.sendMail({
        from: `"${companyName}" <${fromEmail}>`,
        to: hrEmail,
        subject: `New Contact Form Submission from ${name.trim()}`,
        html: getHREmailTemplate(emailData),
      });
      console.log("HR email sent successfully");
    } catch (emailError) {
      console.error("Error sending HR email:", emailError);
      // Don't fail the whole request if email fails
    }

    // Send confirmation email to user
    try {
      await transporter.sendMail({
        from: `"${companyName}" <${fromEmail}>`,
        to: email.trim(),
        subject: `Thank You for Contacting ${companyName}`,
        html: getUserEmailTemplate({ name: name.trim() }),
      });
      console.log("User confirmation email sent successfully");
    } catch (emailError) {
      console.error("Error sending user confirmation email:", emailError);
      // Don't fail the whole request if email fails
    }

    return { success: true, response };
  } catch (error) {
    console.error("Contact form submission error:", error);
    return { 
      success: false, 
      error: "Failed to submit contact form. Please try again." 
    };
  }
};