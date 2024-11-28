/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import { Event } from '@/types/event';
import toast from 'react-hot-toast';

interface UseEventPDFProps {
    event: Event;
}

export const useEventPDF = ({ event }: UseEventPDFProps) => {
    const [isGenerating, setIsGenerating] = useState(false);

    const generatePDF = useCallback(async () => {
        try {
            setIsGenerating(true);

            // iitialize PDF doc
            const doc = new jsPDF();

            // TODO : here i will addd logo of event

            // doc.addImage(event.logo, 'JPEG', 14, 10, 30, 30);

            // Add title
            doc.setFontSize(24);
            doc.setTextColor(40, 40, 40);
            doc.text(event.name, 14, 30);

            // Add event details
            doc.setFontSize(12);
            doc.setTextColor(80, 80, 80);

            const eventDetails = [
                ['Event Status', event.status],
                ['Start Date', format(new Date(event.startDate), 'PPP p')],
                ['End Date', format(new Date(event.endDate), 'PPP p')],
                ['Total Participants', event.participants.length.toString()],
                ['Created At', format(new Date(event.createdAt), 'PPP')]
            ];

            // add event details table
            autoTable(doc, {
                startY: 40,
                head: [['Detail', 'Value']],
                body: eventDetails,
                theme: 'striped',
                headStyles: {
                    fillColor: [66, 66, 66],
                    textColor: 255,
                    fontSize: 12,
                    fontStyle: 'bold'
                },
                styles: {
                    fontSize: 10,
                    cellPadding: 5
                },
                columnStyles: {
                    0: { fontStyle: 'bold' }
                }
            });

            // add participants section
            const finalY = (doc as any).lastAutoTable.finalY;
            doc.setFontSize(16);
            doc.setTextColor(40, 40, 40);
            doc.text('Participants List', 14, finalY + 15);

            // create participants table data
            const participantsData = event.participants.map((participant, index) => [
                index + 1,
                participant.name,
                participant.email
            ]);

            // add participants table
            autoTable(doc, {
                startY: finalY + 20,
                head: [['#', 'Name', 'Email']],
                body: participantsData,
                theme: 'striped',
                headStyles: {
                    fillColor: [66, 66, 66],
                    textColor: 255,
                    fontSize: 12,
                    fontStyle: 'bold'
                },
                styles: {
                    fontSize: 10,
                    cellPadding: 5
                },
                columnStyles: {
                    0: { cellWidth: 20 },
                    1: { cellWidth: 70 },
                    2: { cellWidth: 100 }
                }
            });

            // add footer
            const pageCount = doc.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(10);
                doc.setTextColor(128, 128, 128);

                // add page number
                doc.text(
                    `Page ${i} of ${pageCount}`,
                    doc.internal.pageSize.width / 2,
                    doc.internal.pageSize.height - 10,
                    { align: 'center' }
                );

                // add generation date
                doc.text(
                    `Generated on ${format(new Date(), 'PPP p')}`,
                    14,
                    doc.internal.pageSize.height - 10
                );
            }

            // here i save the PDF
            const fileName = `${event.name.toLowerCase().replace(/\s+/g, '-')}-participants-${format(new Date(), 'yyyy-MM-dd')}.pdf`;
            doc.save(fileName);

            toast.success('PDF generated successfully!');
        } catch (error) {
            console.error('Error generating PDF:', error);
            toast.error('Failed to generate PDF');
        } finally {
            setIsGenerating(false);
        }
    }, [event]);

    return { generatePDF, isGenerating };
};