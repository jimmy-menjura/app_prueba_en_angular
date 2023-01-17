import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Post } from '../../model/ModelApi';
import { ApiservicesService } from '../../services/apiservices.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit,OnDestroy {
  form:FormGroup;
  postable:Post;
  suscription: Subscription;
  id = 0;
  constructor(public ruta : Router,public servicio: ApiservicesService, private formBuilder: FormBuilder,private alertController: AlertController) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      body:  ['', [ Validators.required,]],
      userid: ['', [ Validators.required]]
   })

  }
  ngOnInit() {
    this.suscription = this.servicio.getPostById().subscribe({
      next:(data:any)=>{
        this.postable = data
        this.form.patchValue({
          title:this.postable.title,
          body:this.postable.body,
          userId:this.postable.userId
        })
        this.id = this.postable.id;
      },
      error:(data:any)=>{console.log(data)}
      
    })
  }

  async alert(number:any){
    if(number === 1){
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Registered ',
      buttons: ['OK'],
    });
    return await alert.present();
  }
  else if(number === 2){
      const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Updated ',
      buttons: ['OK'],
    });
    return await alert.present();
  }
  }

  save(){
    if(this.id === 0 ){
      this.Register();
    }
    else {
      this.update();
    }
  }

  update(){
      const formulario : Post= {
      title: this.form.get('title')?.value,
      body: this.form.get('body')?.value,
      userId: this.form.get('userid')?.value
    }
    this.servicio.UpdatePostById(this.id,formulario).subscribe({
      next:(value:any) =>{
        this.alert(2);
        this.ruta.navigate(['/home']);
      },
      error:(error:any) => {console.log(error)}
    })
  }
  
  Register(){
    const formulario : Post= {
      title: this.form.get('title')?.value,
      body: this.form.get('body')?.value,
      userId: this.form.get('userid')?.value
    }
    this.servicio.Create(formulario).subscribe({
      next:(value:any) =>{
        this.alert(1);
        this.ruta.navigate(['/home']);
      },
      error:(error) => {console.log(error)}
    })
  }
  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }
}

