import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  credentials:FormGroup;
 
  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) { }
 
  get email(){
    return this.credentials.get('email')
  }
 
  get password(){
    return this.credentials.get('password');
  }
 
  ngOnInit() {
    this.credentials=this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
 
  async register(){
    const loading = await this.loadingController.create();
    await loading.present();
 
    const user=await this.authService.register(this.credentials.value.email, this.credentials.value.password);
    await loading.dismiss();
 
    if (user){
      this.router.navigateByUrl('/home',{replaceUrl:true});
    }else{
      this.showAlert('login fallido','Intentar nuevamente');
    }
  }
 
  async login(){
    const loading = await this.loadingController.create();
    await loading.present();
 
    const user= await this.authService.login(this.credentials.value.email, this.credentials.value.password);
    await loading.dismiss();
 
    if (user){
      this.router.navigateByUrl('/home',{replaceUrl:true});
    }else{
      this.showAlert('login fallido','Intentar nuevamente')
    }
   }
  async showAlert(header, message){
    const alert =await this.alertController.create({
      header,
      message,
      buttons:['ok']
    });
    await alert.present();
  }
 
}

