import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Post } from '../model/ModelApi';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiservicesService {
  url = environment.url;
  private formUpdate  = new BehaviorSubject<Post>({} as any);
  constructor(public http:HttpClient) { }

  obtenerPersonajes():Observable<Post>{
    return this.http.get<Post>(this.url);
  }
  Create(post:Post):Observable<Post>{
    return this.http.post<Post>(this.url,post);
  }
  update(list:Post){
    this.formUpdate.next(list);
  }
  deleteById(id:number):Observable<Post>{
    return this.http.delete<Post>(this.url + "/" + id);
  }
  getPostById():Observable<Post>{
    return this.formUpdate.asObservable();
  }
  UpdatePostById(id:number,post:Post):Observable<Post>{
    return this.http.put<Post>(this.url + "/" + id,post);
  }
}
