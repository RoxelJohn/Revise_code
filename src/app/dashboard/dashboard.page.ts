import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  tasks: string[] = []; // Initialize tasks array
  fullname: string = '';
  email: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private alertController: AlertController) {}

  ngOnInit() {
    // Retrieve the fullname and email from query parameters
    this.route.queryParams.subscribe(params => {
      this.fullname = params['fullname'];
      this.email = params['email'];
    });
  }

  // Present alert to add a task
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Add Task',
      inputs: [
        {
          name: 'taskInput',
          type: 'text',
          placeholder: 'Type your task here...',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Add',
          handler: (data) => {
            if (data.taskInput) {
              this.addTask(data.taskInput);
            }
          },
        },
      ],
    });

    await alert.present();
  }

  // Add a task to the tasks array
  addTask(task: string) {
    this.tasks.push(task);
  }

  // Update a task using an alert
  async updateTaskPrompt(index: number) {
    const alert = await this.alertController.create({
      header: 'Update Task',
      inputs: [
        {
          name: 'taskInput',
          type: 'text',
          value: this.tasks[index], // Pre-fill with the current task value
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Update',
          handler: (data) => {
            if (data.taskInput) {
              this.updateTask(index, data.taskInput);
            }
          },
        },
      ],
    });

    await alert.present();
  }

  // Update a task at the given index
  updateTask(index: number, updatedTask: string) {
    this.tasks[index] = updatedTask;
  }

  // Delete a task from the tasks array
  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }

  // Log out and navigate to the login screen
  logOut() {
    this.router.navigate(['/login']);
  }
}
