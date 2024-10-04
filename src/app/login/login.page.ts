import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  fullname: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router, private toastController: ToastController) {}

  ngOnInit() {}

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

  validateInputs() {
    // Check if any fields are empty
    if (!this.fullname || !this.email || !this.password) {
      this.presentToast('Please fill in all fields before proceeding.');
      return;
    }

    // Validate email format
    if (!this.email.includes('@gmail.com')) {
      this.presentToast('Your email must be a Gmail address.');
      return;
    }

    // If all validations pass, navigate to the dashboard
    this.Dashboard();
  }

  Dashboard() {
    this.router.navigate(['/dashboard'], { 
      queryParams: { 
        email: this.email, 
        fullname: this.fullname // Pass fullname here
      } 
    });
  }

  Registration() {
    this.router.navigate(['/registration']);
  }
}
