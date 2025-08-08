import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    // Create transporter using your Gmail credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_PW
      }
    });

    // Email content with professional styling
    const mailOptions = {
      from: process.env.MAIL,
      to: 'adeepashashintha@gmail.com',
      subject: `🚀 Portfolio Contact: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Portfolio Contact</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                💼 New Portfolio Contact
              </h1>
              <p style="color: #e2e8f0; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
                You have received a new message from your website
              </p>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">
              
              <!-- Contact Info Card -->
              <div style="background-color: #f8fafc; border-radius: 12px; padding: 25px; margin-bottom: 25px; border-left: 4px solid #667eea;">
                <h2 style="color: #2d3748; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">
                  👤 Contact Information
                </h2>
                
                <div style="display: grid; gap: 15px;">
                  <div style="display: flex; align-items: center;">
                    <span style="color: #667eea; font-weight: 600; min-width: 80px; font-size: 14px;">NAME:</span>
                    <span style="color: #2d3748; font-size: 16px; font-weight: 500;">${name}</span>
                  </div>
                  
                  <div style="display: flex; align-items: center;">
                    <span style="color: #667eea; font-weight: 600; min-width: 80px; font-size: 14px;">EMAIL:</span>
                    <a href="mailto:${email}" style="color: #667eea; text-decoration: none; font-size: 16px; font-weight: 500;">${email}</a>
                  </div>
                  
                  <div style="display: flex; align-items: center;">
                    <span style="color: #667eea; font-weight: 600; min-width: 80px; font-size: 14px;">PHONE:</span>
                    <a href="tel:${phone}" style="color: #667eea; text-decoration: none; font-size: 16px; font-weight: 500;">${phone}</a>
                  </div>
                  
                  <div style="display: flex; align-items: center;">
                    <span style="color: #667eea; font-weight: 600; min-width: 80px; font-size: 14px;">SUBJECT:</span>
                    <span style="color: #2d3748; font-size: 16px; font-weight: 500;">${subject}</span>
                  </div>
                </div>
              </div>

              <!-- Message Card -->
              <div style="background-color: #ffffff; border-radius: 12px; padding: 25px; border: 2px solid #e2e8f0; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <h2 style="color: #2d3748; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">
                  💬 Message
                </h2>
                <div style="background-color: #f7fafc; border-radius: 8px; padding: 20px; border-left: 4px solid #48bb78;">
                  <p style="color: #2d3748; margin: 0; font-size: 16px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
                </div>
              </div>

              <!-- Quick Actions -->
              <div style="margin-top: 30px; text-align: center;">
                <a href="mailto:${email}?subject=Re: ${subject}" 
                   style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 6px; font-weight: 600; font-size: 14px; box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3); margin-right: 10px;">
                  📧 Reply to ${name}
                </a>
                <a href="tel:${phone}" 
                   style="display: inline-block; background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 6px; font-weight: 600; font-size: 14px; box-shadow: 0 2px 4px rgba(72, 187, 120, 0.3);">
                  📞 Call ${name}
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #f8fafc; padding: 25px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #718096; margin: 0; font-size: 14px;">
                🌐 Sent from your portfolio contact form at 
                <strong style="color: #667eea;">adeepa.tech</strong>
              </p>
              <p style="color: #a0aec0; margin: 10px 0 0 0; font-size: 12px;">
                ${new Date().toLocaleString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric', 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}