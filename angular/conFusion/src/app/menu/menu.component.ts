import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes: Dish[];
  selectDish: Dish;

  constructor(private dishService: DishService) { }

  ngOnInit(): void {
    this.dishService.getDishes()
      .subscribe(dishes => this.dishes = dishes);
  }

  onSelect(dish: Dish): void {
    this.selectDish = dish;
  }
}
