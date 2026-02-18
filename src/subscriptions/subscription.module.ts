import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../est-depo/entities/user.entity';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { WebhookController } from './webhook.controller';
import { PremiumGuard } from './guards/premium.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [SubscriptionController, WebhookController],
  providers: [SubscriptionService, PremiumGuard],
  exports: [SubscriptionService, PremiumGuard],
})
export class SubscriptionModule { }
