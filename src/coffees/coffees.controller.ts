import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll(@Res() response) {
    response.status(200).send('This method returns all coffees');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Find a coffee with id: ${id}`;
  }

  @Post()
  create(@Body() body) {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `This method updates coffee ${id}.`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This method removes coffee ${id}.`;
  }
}
