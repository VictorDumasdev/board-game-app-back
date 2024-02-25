import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { GamesModule } from './games/games.module';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { InvitationsModule } from './invitations/invitations.module';
import { FriendsModule } from './friends/friends.module';
import { GroupsModule } from './groups/groups.module';
import { GroupsInvitationsModule } from './groups-invitations/groups-invitations.module';

@Module({
    imports: [
        GamesModule,
        DatabaseModule,
        EmployeesModule,
        ThrottlerModule.forRoot([{
            name: 'short',
            ttl: 1000,
            limit: 3
        }, {
            name: 'long',
            ttl: 60000,
            limit: 100
        }]),
        UsersModule,
        AuthenticationModule,
        InvitationsModule,
        FriendsModule,
        GroupsModule,
        GroupsInvitationsModule
    ],
    controllers: [AppController],
    providers: [AppService, {
        provide: APP_GUARD,
        useClass: ThrottlerGuard
    }],
})
export class AppModule {}
