import { Component } from '@angular/core';

import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

interface Card {
  title: string;
  subtitle: string;
  content: string;
  image: string;
  clickAction: Function;
}

@Component({
  selector: 'app-home',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  openInvoicesComponent = () => this.router.navigate(["/invoices/"]);





  cards: Card[] = [{
    title: 'Invoicing',
    subtitle: 'Manage Sales',
    content: 'Efficiently manage and streamline your sales invoicing processes with our comprehensive invoicing module. Designed for seamless integration and ease of use, this tool helps you handle all aspects of invoice generation and tracking.',
    image: 'assets/images/invoices.webp',
    clickAction: this.openInvoicesComponent
  },{
    title: 'Invoicing',
    subtitle: 'Manage Sales',
    content: 'Efficiently manage and streamline your sales invoicing processes with our comprehensive invoicing module. Designed for seamless integration and ease of use, this tool helps you handle all aspects of invoice generation and tracking.',
    image: 'assets/images/invoices.webp',
    clickAction: undefined
  },{
    title: 'Invoicing',
    subtitle: 'Manage Sales',
    content: 'Efficiently manage and streamline your sales invoicing processes with our comprehensive invoicing module. Designed for seamless integration and ease of use, this tool helps you handle all aspects of invoice generation and tracking.',
    image: 'assets/images/invoices.webp',
    clickAction: undefined
  },{
    title: 'Invoicing',
    subtitle: 'Manage Sales',
    content: 'Efficiently manage and streamline your sales invoicing processes with our comprehensive invoicing module. Designed for seamless integration and ease of use, this tool helps you handle all aspects of invoice generation and tracking.',
    image: 'assets/images/invoices.webp',
    clickAction: undefined
  },{
    title: 'Invoicing',
    subtitle: 'Manage Sales',
    content: 'Efficiently manage and streamline your sales invoicing processes with our comprehensive invoicing module. Designed for seamless integration and ease of use, this tool helps you handle all aspects of invoice generation and tracking.',
    image: 'assets/images/invoices.webp',
    clickAction: undefined
  },{
    title: 'Invoicing',
    subtitle: 'Manage Sales',
    content: 'Efficiently manage and streamline your sales invoicing processes with our comprehensive invoicing module. Designed for seamless integration and ease of use, this tool helps you handle all aspects of invoice generation and tracking.',
    image: 'assets/images/invoices.webp',
    clickAction: undefined
  },{
    title: 'Invoicing',
    subtitle: 'Manage Sales',
    content: 'Efficiently manage and streamline your sales invoicing processes with our comprehensive invoicing module. Designed for seamless integration and ease of use, this tool helps you handle all aspects of invoice generation and tracking.',
    image: 'assets/images/invoices.webp',
    clickAction: undefined
  },{
    title: 'Invoicing',
    subtitle: 'Manage Sales',
    content: 'Efficiently manage and streamline your sales invoicing processes with our comprehensive invoicing module. Designed for seamless integration and ease of use, this tool helps you handle all aspects of invoice generation and tracking.',
    image: 'assets/images/invoices.webp',
    clickAction: undefined
  },// Add more cards as needed
  ];


  drop(event: CdkDragDrop<Card[]>) {
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
  }

  constructor(
    private readonly router:Router
  ){}
}
