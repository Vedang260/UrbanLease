import { Controller, Delete, Get, Param, Put, Req, UseGuards } from "@nestjs/common";
import { NotificationService } from "../services/notification.service";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt_auth.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { UserRole } from "src/common/enums/roles.enums";
import { Roles } from "src/common/decorators/roles.decorators";

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationController{
    constructor(
        private readonly notificationService: NotificationService
    ){}

    @Get()
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.OWNER, UserRole.TENANT)
    async getAllNotifications(@Req() req: Request){
        return await this.notificationService.markAllNotificationsAsRead(req['user'].userId);
    }

    @Delete(':id')
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.OWNER, UserRole.TENANT)
    async deleteNotification(@Param('id') notificationId: string){
        return await this.notificationService.deleteNotification(notificationId);
    }

    @Put()
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.OWNER, UserRole.TENANT)
    async markAllAsRead(@Req() req: Request){
        return await this.notificationService.markAllNotificationsAsRead(req['user'].userId);
    }
}