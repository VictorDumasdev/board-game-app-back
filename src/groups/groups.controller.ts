import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { GroupsService } from './groups.service';

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
