import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  fullname: string = '';
  email: string = '';
  password: string = '';            // Define password property
  confirmPassword: string = '';     // Define confirmPassword property

  constructor(private router: Router, private route: ActivatedRoute, private toastController: ToastController) {}

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

  register() {
    // Check if any fields are empty
    if (!this.fullname || !this.email || !this.password || !this.confirmPassword) {
      this.presentToast('Please fill in all fields before proceeding.');
      return;
    }

    // Check if passwords match
    if (this.password !== this.confirmPassword) {
      console.log('Passwords do not match');
      this.presentToast('Password did not match');
      return;
    }

    // If all validations pass, navigate to the dashboard and pass fullname and email as query parameters
    this.router.navigate(['/dashboard'], {
      queryParams: {
        fullname: this.fullname,
        email: this.email,
      },
    });
  }

  ngOnInit() {
    // Retrieve query parameters if necessary
    this.route.queryParams.subscribe(params => {
      this.fullname = params['fullname'];
    });
  }
}
