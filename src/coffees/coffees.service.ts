import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: '1',
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  public findAll(): Coffee[] {
    return this.coffees;
  }

  public findOne(id): Coffee {
    const coffee = this.coffees.find((coffee) => coffee.id === id);

    if (coffee === undefined) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  public create(createCoffeeDTO: any): void {
    this.coffees.push(createCoffeeDTO);
    return createCoffeeDTO;
  }

  update(id: string, updateCoffeeDto: any) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      // update the existing entity
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((coffee) => coffee.id === id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
