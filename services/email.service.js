import nodemailer from 'nodemailer';

/**
 * Sends an order confirmation email with the invoice attached
 * @param {string} toEmail - The customer's email address
 * @param {string} orderNumber - The order number (e.g. VNM000001)
 * @param {Buffer} invoicePdfBuffer - The generated PDF buffer
 */
export async function sendOrderConfirmationEmail(toEmail, orderNumber, invoicePdfBuffer) {
  try {
    // If SMTP credentials aren't set, log and skip (prevents crash in development)
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn('⚠️ SMTP credentials not found in environment. Skipping order confirmation email.');
      console.warn(`Would have sent email to ${toEmail} for Order ${orderNumber}`);
      return { success: false, reason: 'SMTP not configured' };
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;
    const mailOptions = {
      from: `"Vanameya Exports And Imports" <${fromEmail}>`,
      to: toEmail,
      subject: `Order Confirmation - ${orderNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f6f9fc; margin: 0; padding: 40px 0; color: #333333;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center">
                <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
                  
                  <!-- Header with Logo -->
                  <tr>
                    <td align="center" style="padding: 40px 40px 30px 40px; background-color: #ffffff; border-bottom: 1px solid #f0f0f0;">
                      <img src="cid:vanameya-logo" alt="Vanameya Exports And Imports" style="height: 50px; width: auto; display: block;" />
                    </td>
                  </tr>

                  <!-- Hero Image / Illustration area (Optional, skipping to keep clean) -->

                  <!-- Body Content -->
                  <tr>
                    <td style="padding: 40px 40px;">
                      <h1 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 700; color: #1a1a1a;">Your journey to wellness begins.</h1>
                      
                      <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                        Namaste,
                      </p>
                      
                      <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                        Thank you for inviting Vanameya into your daily ritual. We are honored to share the rich, grounding heritage of our Kerala Dry Ginger Coffee with you.
                      </p>
                      
                      <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                        Your payment was successful and your order <strong>${orderNumber}</strong> has been confirmed. 
                      </p>

                      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
                        <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: #1a1a1a;">What's next?</h3>
                        <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #64748b;">
                          Our team is mindfully preparing and packing your items. You will receive another email with tracking information as soon as your package ships. 
                          <br/><br/>
                          We've attached your official tax invoice to this email for your records.
                        </p>
                      </div>

                      <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                        Wishing you warmth and balance,<br/>
                        <strong style="color: #1a1a1a;">The Vanameya Team</strong>
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td align="center" style="padding: 32px 40px; background-color: #f8fafc; border-top: 1px solid #f0f0f0;">
                      <p style="margin: 0 0 12px 0; font-size: 12px; color: #64748b; line-height: 1.5;">
                        Vanameya Exports And Imports<br/>
                        Mannarkkad P.O, Palakkad, Kerala 678582
                      </p>
                      <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                        © ${new Date().getFullYear()} Vanameya. All rights reserved.
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
      attachments: [
        {
          filename: 'teal.png',
          path: require('path').join(process.cwd(), 'public', 'logo', 'teal.png'),
          cid: 'vanameya-logo' // same cid value as in the html img src
        },
        {
          filename: `Invoice_${orderNumber}.pdf`,
          content: invoicePdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Order confirmation email sent to ${toEmail}: ${info.messageId}`);
    
    return { success: true };
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    return { success: false, error };
  }
}
