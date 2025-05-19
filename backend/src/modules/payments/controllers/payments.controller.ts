import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { PaymentService } from '../services/payments.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt_auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { UserRole } from 'src/common/enums/roles.enums';
import { Roles } from 'src/common/decorators/roles.decorators';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get(':paymentId')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.OWNER, UserRole.TENANT)
  async getPaymentDetails(@Param('paymentId') paymentId: string){
    return await this.paymentService.getPaymentDetails(paymentId);
  }

  @Post('checkout')
  @UseGuards(RolesGuard)
  @Roles(UserRole.TENANT)
  async handleCreateCheckoutSession(@Body() body :{ paymentId: string}) {
    try {
      return await this.paymentService.createCheckoutSession(body.paymentId);
    }catch (err) {
      console.error("Error in creating the checkout session");  
    }
  }
}