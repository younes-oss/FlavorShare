import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../services/recipe.service';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HttpClientModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  recipes: any[] = [];

  constructor(private recipeService: RecipeService , private router: Router) {}

  ngOnInit() {
    this.recipeService.getRecipes().subscribe(data => {
      this.recipes = data.meals.slice(0, 6).map((recipe: any) => ({
        ...recipe,
        rating: Math.floor(Math.random() * 5) + 1  // note aléatoire entre 1 et 5
      }));
      console.log(this.recipes);
    });
  }

  goToDetail(recipe: any) {
    this.router.navigate(['/detail', recipe.idMeal]);
  }
  
}
