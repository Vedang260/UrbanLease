import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt_auth.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { UserRole } from "src/common/enums/roles.enums";
import { Roles } from "src/common/decorators/roles.decorators";
import { AgreementService } from "../service/agreement.service";

@Controller('agreements')
@UseGuards(JwtAuthGuard)
export class AgreementController{
    constructor(
        private readonly agreementService: AgreementService
    ){}

    @Get('/tenant')
    @UseGuards(RolesGuard)
    @Roles(UserRole.TENANT)
    async getTenantAgreements(@Req() req: Request){
        return await this.agreementService.getAgreementsForTenant(req['user'].userId);
    }
}