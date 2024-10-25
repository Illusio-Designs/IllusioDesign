// utils/generateProposalPDF.js
const PDFDocument = require('pdfkit');
const fs = require('fs');

function generateProposalPDF(proposalData, filePath) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();

        // Stream the PDF to a file
        const writeStream = fs.createWriteStream(filePath);
        doc.pipe(writeStream);

        // Proposal Header
        doc.fontSize(18).text('Proposal for Shopify Development', { align: 'center' });
        doc.fontSize(12).text(`Proposal Number: ${proposalData.id} Date: ${new Date().toLocaleDateString()}`, { align: 'center' });
        doc.moveDown();

        // Client Information
        doc.text(`Client:\n${proposalData.clientName} (${proposalData.clientAlias})`);
        doc.text(`${proposalData.clientAddress}`);
        doc.moveDown();

        // Service Provider Information
        doc.text(`Service Provider:\nILLUSIO DESIGNS`);
        doc.text(`212, 2nd Floor, Runway Heights,`);
        doc.text(`Ayodhya Chowk, Rajkot, Gujarat - 360001`);
        doc.text(`Contact Number: 7600046416`);
        doc.moveDown();

        // Introduction
        doc.text(`Dear ${proposalData.clientName},`);
        doc.text(`Thank you for considering ILLUSIO DESIGNS for your Shopify development needs.`);
        doc.moveDown();

        // Scope of Work
        doc.fontSize(12).text('Scope of Work:', { underline: true });
        doc.moveDown();
        proposalData.scopeOfWork.forEach(item => {
            doc.text(`- ${item}`);
        });
        doc.moveDown();

        // Total Cost
        doc.fontSize(12).text('Total Cost:', { underline: true });
        doc.text(`- Development Charges: ₹${proposalData.totalCost}`);
        doc.moveDown();

        // Payment Terms
        doc.fontSize(12).text('Payment Terms:', { underline: true });
        doc.moveDown();
        proposalData.paymentTerms.forEach(term => {
            doc.text(`- ${term}`);
        });
        doc.moveDown();

        // Project Timeline
        doc.fontSize(12).text('Project Timeline:', { underline: true });
        doc.text(`- Estimated Completion: ${proposalData.timeline}`);
        doc.moveDown();

        // Terms & Conditions
        doc.fontSize(12).text('Terms & Conditions:', { underline: true });
        doc.moveDown();
        proposalData.termsConditions.forEach(condition => {
            doc.text(`- ${condition}`);
        });
        doc.moveDown();

        // Closing Message
        doc.text(`We look forward to working with you and making your Shopify store a great success!`);
        doc.moveDown();
        doc.text(`Best regards,\nRushikesh Zinzuvadiya\nILLUSIO DESIGNS\nContact Number: 7600046416`);

        // Finalize the document
        doc.end();

        // Resolve when PDF is fully written
        writeStream.on('finish', () => resolve(filePath));
        writeStream.on('error', reject);
    });
}

module.exports = generateProposalPDF;
