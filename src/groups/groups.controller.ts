import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { Prisma } from '@prisma/client';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body() createGroupDto: Prisma.GroupsCreateInput) {
    return this.groupsService.create(createGroupDto);
  }

  @Get('/userGroups/:id')
  findAllGroupsForUser(@Param('id') userId: string) {
    return this.groupsService.findAllGroupsForUser(+userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: Prisma.GroupsUpdateInput) {
    return this.groupsService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.remove(+id);
  }
}
