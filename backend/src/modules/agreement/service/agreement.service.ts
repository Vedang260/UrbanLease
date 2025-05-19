import { Injectable } from "@nestjs/common";
import { AgreementRepository } from "../repositories/agreement.repository";
import { RentalApplication } from "src/modules/rentals/entities/rentalApplication.entity";
import { Property } from "src/modules/properties/entities/property.entity";
import * as PDFDocument from 'pdfkit';
import { CreateAgreementDto } from "../dtos/createAgreement.dto";
import { User } from "src/modules/users/entities/users.entity";

@Injectable()
export class AgreementService{
    constructor(
        private readonly agreementRepository: AgreementRepository
    ){}

    async generateRentalAgreementBuffer(rentalApplication: RentalApplication, property: Property, owner: User): Promise<Buffer> {
        const doc = new PDFDocument();
        const buffers: Buffer[] = [];

        doc.on('data', buffers.push.bind(buffers));

        return new Promise((resolve, reject) => {
            doc.on('end', () => {
            try {
                const pdfBuffer = Buffer.concat(buffers);
                    resolve(pdfBuffer); // Return buffer
                } catch (error) {
                    reject(error);
                }
            });

            this.generateAgreementContent(doc, rentalApplication, property, owner);
            doc.end();
        }); 
    }

    private generateAgreementContent(
        doc: PDFKit.PDFDocument,
        application: RentalApplication,
        property: Property,
        owner: User
    ) {
        // Header
        doc
        .fontSize(20)
        .text('RENTAL AGREEMENT', { align: 'center' })
        .moveDown();

        doc
        .fontSize(12)
        .text(`This Rental Agreement ("Agreement") is made and entered into this ${new Date().toLocaleDateString()} by and between:`)
        .moveDown();

        // Parties Section
        doc
        .fontSize(14)
        .text('1. PARTIES', { underline: true })
        .moveDown(0.5);

        doc
        .fontSize(12)
        .text(`Landlord: ${owner.fullName}`, { indent: 20 })
        .text(`Property Address: ${property.address.street}, ${property.address.city}, ${property.address.state}
                ${property.address.country}, ${property.address.zipcode}`, { indent: 20 })
        .moveDown(0.5);

        doc
        .text(`Tenant: ${application.fullName}`, { indent: 20 })
        .text(`Current Address: ${application.currentAddress}`, { indent: 20 })
        .text(`Phone: ${application.phoneNumber}`, { indent: 20 })
        .text(`Email: ${application.email}`, { indent: 20 })
        .moveDown();

        // Property Details
        doc
        .fontSize(14)
        .text('2. PROPERTY DETAILS', { underline: true })
        .moveDown(0.5);

        doc
        .fontSize(12)
        .text(`Address: ${property.address.street}, ${property.address.city}, ${property.address.state}
                ${property.address.country}, ${property.address.zipcode}`, { indent: 20 })
        .text(`Type: ${property.propertyType}`, { indent: 20 })
        .text(`Bedrooms: ${property.numberOfBedrooms}`, { indent: 20 })
        .text(`Bathrooms: ${property.numberOfBathrooms}`, { indent: 20 })
        .text(`Area: ${property.areaSqft} sq.ft`, { indent: 20 })
        .moveDown();

        // Rental Terms
        doc
        .fontSize(14)
        .text('3. RENTAL TERMS', { underline: true })
        .moveDown(0.5);

        doc
        .fontSize(12)
        .text(`Monthly Rent: $${property.rentAmount.toFixed(2)}`, { indent: 20 })
        .text(`Security Deposit: $${property.depositAmount.toFixed(2)}`, { indent: 20 })
        .text(`Rental Period: ${application.rentalDuration} ${application.rentalDurationType}`, { indent: 20 })
        .text(`Lease Start Date: ${application.expectedMoveInDate}`, { indent: 20 })
        .moveDown();

        // Occupants
        doc
        .fontSize(14)
        .text('4. OCCUPANTS', { underline: true })
        .moveDown(0.5);

        doc
        .fontSize(12)
        .text(`Total Occupants: ${application.numberOfOccupants}`, { indent: 20 });

        if (application.occupantDetails) {
        doc.text(`Occupant Details: ${application.occupantDetails}`, { indent: 20 });
        }

        if (application.hasPets) {
        doc.text(`Pet Details: ${application.petDetails || 'Not specified'}`, { indent: 20 });
        }
        doc.moveDown();

        // Terms and Conditions
        doc
        .fontSize(14)
        .text('5. TERMS AND CONDITIONS', { underline: true })
        .moveDown(0.5);

        const terms = [
        'The Tenant shall use the Property exclusively as a private residence.',
        'The Tenant shall not sublet the Property without the Landlord\'s written consent.',
        'The Tenant shall pay all utilities unless otherwise agreed in writing.',
        'The Tenant shall maintain the Property in good condition.',
        'The Landlord shall be responsible for major repairs and maintenance.',
        'Either party may terminate this Agreement with 30 days written notice.',
        ];

        terms.forEach((term, index) => {
        doc.text(`${index + 1}. ${term}`, { indent: 20 });
        });
        doc.moveDown();

        // Signatures
        doc
        .fontSize(14)
        .text('6. SIGNATURES', { underline: true })
        .moveDown(2);

        doc
        .text('_________________________', { align: 'left' })
        .text('Landlord Signature', { align: 'left' })
        .moveDown(2);

        doc
        .text('_________________________', { align: 'left' })
        .text('Tenant Signature', { align: 'left' })
        .moveDown();

        doc
        .fontSize(10)
        .text(`Document generated on: ${new Date().toLocaleString()}`, { align: 'right' });
    }

    async createAgreement(createAgreementDto: CreateAgreementDto){
        try{
            const newAgreement = await this.agreementRepository.createAgreement(createAgreementDto);
            return{
                success: true,
                message: 'Agreement is created'
            }
        }catch(error){
            console.error('Error in creating agreement: ', error.message);
            return{
                success: false,
                message: 'Failed to create agreement'
            }
        }
    }

    async getAgreementsForTenant(tenantId: string){
        try{
            const agreements = await this.agreementRepository.getAgreementsForTenant(tenantId);
            return{
                success: true,
                message: 'Agreement is fetched',
                agreements: agreements
            }
        }catch(error){
            console.error('Error in creating agreement: ', error.message);
            return{
                success: false,
                message: 'Failed to create agreement',
                agreements: []
            }
        }
    }

    // async getAgreementsForOwner(ownerId: string){
    //     try{
    //         const newAgreement = await this.agreementRepository.getOwnerAgreements(ownerId);
    //         return{
    //             success: true,
    //             message: 'Agreement is created'
    //         }
    //     }catch(error){
    //         console.error('Error in creating agreement: ', error.message);
    //         return{
    //             success: false,
    //             message: 'Failed to create agreement'
    //         }
    //     }
    // }

    async getAgreementsForAdmin(){
        try{
            const agreements = await this.agreementRepository.getAllAgreements();
            return{
                success: true,
                message: 'Agreements are fetched',
                agreements: agreements
            }
        }catch(error){
            console.error('Error in fetching all the agreements: ', error.message);
            return{
                success: false,
                message: 'Failed to fetch all the agreements',
                agreements: []
            }
        }
    }
}