import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GetById } from 'src/app/Interface/get-by-id';
const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
const options = { headers: headers, crossDomain: true, withCredentials: true };

@Injectable({
  providedIn: 'root'
})
export class CardService {

  baseUrl = environment.baseUrl

  //BACKEND URL HERE/API
  //baseUrl = "https://api.themoviedb.org/3/discover/movie?api_key=80a33826576591aad78e11cfbde39527&language=en-US&primary_release_date.gte=2022-01-15&primary_release_date.lte=2022-05-22"
  constructor ( private http : HttpClient) { }
  

//THIS FUCTION HELPS US GET THE URL USING HTTP CLIENT


  getCard(){
    return this.http.get(`${this.baseUrl}product_list`, options)
    //return this.http.get(this.baseUrl)+"product_list";
  }
  getCardbyId(prod_id:GetById){
    return this.http.get(`${this.baseUrl}productbyid/${prod_id}`, options)
    //return this.http.get(this.baseUrl)+"product_list";
  }
  
  getunit(id:GetById){
    return this.http.get(`${this.baseUrl}stock/${id}`)
  }
}
