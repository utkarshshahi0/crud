import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { BarChartModule } from '@swimlane/ngx-charts';
import { NgxChartsModule } from "@swimlane/ngx-charts";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [
    CommonModule,

    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    BarChartModule,
    NgxChartsModule,

  ],
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent {

  products: Product[] = [];
  productDialog: boolean = false;
  product: Product = { id: 0, name: '', price: 0, category: '' };
  submitted: boolean = false;

  chartData: any[] = [];
  colorScheme: any = { domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'] };

  openNew() {
    this.product = { id: 0, name: '', price: 0, category: '' };
    this.submitted = false;
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }
  // Saves the product and updates the chart
  saveProduct(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      if (this.product.id) {
        // If the product has an ID, it means we are editing an existing product
        this.products[this.findIndexById(this.product.id)] = this.product;
      } else {
        // Creating id from create id function createId
        this.product.id = this.createId();
        this.products.push(this.product);
      }
      this.updateChart();
      this.productDialog = false;
      this.product = { id: 0, name: '', price: 0, category: '' };
    }
  }

  deleteProduct(product: Product) {
    // getting the id which need to to be deleted
    this.products = this.products.filter(val => val.id !== product.id);
    this.updateChart();
  }

  editProduct(product: Product) {
    this.product = { ...product }; //Using rest operator to copy products which need to be edited
    this.productDialog = true;
  }

  // Finds the index of a product in the array by its ID
  findIndexById(id: number): number {
    return this.products.findIndex(product => product.id === id);
  }

  createId(): number {
    return Math.floor(Math.random() * 1000);
  }

  // Updates the chart data to reflect the current state of the products array
  updateChart() {
    this.chartData = this.products.map(product => ({
      name: product.name,
      value: product.price
    }));
  }
}
