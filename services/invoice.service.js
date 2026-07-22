import PDFDocument from 'pdfkit/js/pdfkit.standalone.js';
import { getOrder } from './order.service';
import { format } from 'date-fns';
import path from 'path';
import fs from 'fs';

/**
 * Generates an invoice PDF as a Buffer
 * @param {string} orderId 
 * @returns {Promise<Buffer>}
 */
export async function generateInvoicePDF(orderId) {
  const { data: order, error } = await getOrder(orderId, 'id');
  
  if (error || !order) {
    throw new Error('Order not found');
  }

  const customer = order.customers;
  const product = order.products;

  const state = customer.state ? customer.state.toLowerCase() : '';
  const isKerala = state.includes('kerala') || state === 'kl';

  const productMRP = order.subtotal || 0;
  const taxableValue = Number((productMRP / 1.05).toFixed(2));
  const totalGST = Number((productMRP - taxableValue).toFixed(2));

  let cgst = 0;
  let sgst = 0;
  let igst = 0;

  if (isKerala) {
    cgst = Number((totalGST / 2).toFixed(2));
    sgst = Number((totalGST / 2).toFixed(2));
  } else {
    igst = totalGST;
  }

  const shippingCharge = order.shipping_charge || 0;
  const grandTotal = order.total || (productMRP + shippingCharge);

  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 30, size: 'A4' });
      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      // --- PAGE BORDER ---
      doc.rect(15, 15, doc.page.width - 30, doc.page.height - 30).stroke();

      // --- HEADER ---
      doc.font('Helvetica-Bold').fontSize(12).text('TAX INVOICE', { align: 'center' });
      doc.font('Helvetica').fontSize(10).text('Original Copy For Customer', { align: 'right' });
      doc.moveDown();

      const headerY = doc.y;
      
      // LOGO
      try {
        const logoPath = path.join(process.cwd(), 'public', 'logo', 'teal.png');
        const logoBuffer = fs.readFileSync(logoPath);
        doc.image(logoBuffer, 30, headerY, { width: 120 });
      } catch (e) {
        console.error("PDF Logo Render Error:", e);
        // Fallback if logo not found
        doc.font('Helvetica-Bold').fontSize(12).text('Vanameya Exports And Imports', 30, headerY);
      }

      doc.font('Helvetica').fontSize(9)
         .text('MANNARKKAD P.O, PALAKKAD 678582,', 30, headerY + 45)
         .text('Phone : 94 95 96 5955', 30, headerY + 57)
         .text('Email : info@vanameya.com', 30, headerY + 69)
         .text('GSTIN: 32DHOPA7605F1ZM', 30, headerY + 81)
         .text('State:Kerala', 30, headerY + 93)
         .text('fssai Lic.No.: 11326009000235', 30, headerY + 105);

      const maxCompanyY = doc.y;

      doc.text(`Date      : ${format(new Date(order.created_at), 'dd/MM/yyyy')}`, 350, headerY + 15);
      doc.text(`Invoice No: VMC/${new Date(order.created_at).getFullYear()}/${order.order_number}`, 350, headerY + 30);
      doc.text(`Place of Supply: ${customer.state}`, 350, headerY + 45);
      
      doc.y = Math.max(maxCompanyY, headerY + 60);
      
      doc.moveDown(2);
      doc.moveTo(30, doc.y).lineTo(565, doc.y).stroke();
      doc.moveDown(0.5);

      // --- BUYER / CONSIGNEE ---
      const buyerY = doc.y;
      
      doc.font('Helvetica-Bold').text('Buyer Details:', 30, buyerY);
      doc.font('Helvetica').text(`Name: ${customer.full_name}`, 30, buyerY + 15);
      doc.text(`Address: ${customer.address_line1}, ${customer.city}, ${customer.state} ${customer.pincode}`, 30, buyerY + 30, { width: 250 });
      doc.text(`Contact: ${customer.phone}`, 30, buyerY + 60);
      if (customer.email) doc.text(`Email: ${customer.email}`, 30, buyerY + 75);

      doc.font('Helvetica-Bold').text('Consignee Details:', 300, buyerY);
      doc.font('Helvetica').text(`Name: ${customer.full_name}`, 300, buyerY + 15);
      doc.text(`Address: ${customer.address_line1}, ${customer.city}, ${customer.state} ${customer.pincode}`, 300, buyerY + 30, { width: 250 });
      doc.text(`Contact: ${customer.phone}`, 300, buyerY + 60);

      doc.moveDown(4);

      // --- MANUAL TABLE ---
      const tableTop = doc.y + 10;
      doc.font('Helvetica-Bold').fontSize(8);
      
      // Draw Headers
      let currentX = 30;
      const headers = isKerala 
        ? ["SL", "Description", "HSN", "GST%", "Qty", "Rate", "Taxable", "CGST", "SGST", "Total"]
        : ["SL", "Description", "HSN", "GST%", "Qty", "Rate", "Taxable", "IGST", "Total"];
        
      const colWidths = isKerala 
        ? [20, 140, 50, 30, 30, 40, 50, 40, 40, 45]
        : [20, 180, 50, 35, 30, 40, 55, 45, 50];

      headers.forEach((header, i) => {
        doc.text(header, currentX, tableTop, { width: colWidths[i], align: 'left' });
        currentX += colWidths[i];
      });

      // Draw Line below header
      doc.moveTo(30, tableTop + 15).lineTo(565, tableTop + 15).stroke();

      // Draw Row
      const rowY = tableTop + 20;
      doc.font('Helvetica').fontSize(8);
      currentX = 30;
      
      const rowData = isKerala 
        ? ["1", product.name, "09011111", "5%", `${order.quantity}`, (taxableValue/order.quantity).toFixed(2), taxableValue.toFixed(2), cgst.toFixed(2), sgst.toFixed(2), productMRP.toFixed(2)]
        : ["1", product.name, "09011111", "5%", `${order.quantity}`, (taxableValue/order.quantity).toFixed(2), taxableValue.toFixed(2), igst.toFixed(2), productMRP.toFixed(2)];

      rowData.forEach((text, i) => {
        doc.text(text, currentX, rowY, { width: colWidths[i], align: 'left' });
        currentX += colWidths[i];
      });

      let shippingRowY = rowY;
      if (shippingCharge > 0) {
        shippingRowY += 15;
        currentX = 30;
        const shippingRowData = isKerala
          ? ["2", "Shipping Charge", "-", "0%", "1", shippingCharge.toFixed(2), shippingCharge.toFixed(2), "0.00", "0.00", shippingCharge.toFixed(2)]
          : ["2", "Shipping Charge", "-", "0%", "1", shippingCharge.toFixed(2), shippingCharge.toFixed(2), "0.00", shippingCharge.toFixed(2)];
        
        shippingRowData.forEach((text, i) => {
          doc.text(text, currentX, shippingRowY, { width: colWidths[i], align: 'left' });
          currentX += colWidths[i];
        });
      }

      // Draw line below row
      const tableBottom = shippingRowY + 15;
      doc.moveTo(30, tableBottom).lineTo(565, tableBottom).stroke();
      doc.y = tableBottom + 10;

      doc.moveDown(1);
      
      // Total amount
      const totalY = doc.y;
      
      // Amount in words
      doc.font('Helvetica-Bold').fontSize(9);
      doc.text(`Amount in Words: INR ${grandTotal} Only`, 30, totalY);
      
      // Grand Total
      doc.text(`Grand Total: Rs ${grandTotal.toFixed(2)}`, 350, totalY, { width: 215, align: 'right' });
      doc.font('Helvetica').fontSize(8).text('(incl. GST)', 350, totalY + 12, { width: 215, align: 'right' });

      doc.moveDown(2);

      // --- FOOTER / BANK DETAILS ---
      const footerY = doc.y;
      
      doc.font('Helvetica-Bold').text('Company Bank Details:', 30, footerY);
      doc.font('Helvetica').text('Bank: FEDERAL BANK', 30, footerY + 15);
      doc.text('A/C No: 14090200012404', 30, footerY + 30);
      doc.text('Branch & IFSC Code: Mannarkkad , FDRL0001409', 30, footerY + 45);

      doc.font('Helvetica-Bold').text('For Vanameya Exports and Imports', 350, footerY);
      doc.moveDown(3);
      doc.font('Helvetica').text('Authorized Signatory', 350, doc.y);

      // Center footer text
      doc.text('This is a Computer Generated Invoice', 0, 780, { align: 'center' });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}
