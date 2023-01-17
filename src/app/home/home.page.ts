import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Post } from '../model/ModelApi';
import { ApiservicesService } from '../services/apiservices.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  post: Post[]=[]
  constructor(public service: ApiservicesService,private alertController: AlertController) {}

  ngOnInit(){
  this.Personajes();
}

Personajes(){
  this.service.obtenerPersonajes().subscribe({
    next: (data:any)=>{
      console.log(data)
      this.post = data
    }
    })
  }
  async alert()
  {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Register deleted',
      buttons: ['OK'],
    });
    return await alert.present();
  }
  delete(id:number){
    this.service.deleteById(id).subscribe({
      next: (data:any)=>{
        this.alert();
      },error:(error:any)=>{console.log(error)}
    })
    
  }
  update(list:Post){
    this.service.update(list)
  }
  
}
