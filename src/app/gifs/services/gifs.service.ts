import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private API_KEY: string = "PH1HwT8yFemEDAk4ZDeIRC3XOutI2Hki";
  private URL: string = "https://api.giphy.com/v1/gifs/search";
  private _historial: string[] = [];
  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    const historial = localStorage.getItem('historial');
    const resultados = localStorage.getItem('resultadosGif');
    if (historial) {
      this._historial = JSON.parse(historial);
    }
    if (resultados) {
      this.resultados = JSON.parse(resultados);
    }
  }

  buscarGifs(query: string){
    query = query.trim().toLowerCase();
    //Evitar que inserte duplicados
    if ( !this._historial.includes(query)) {
      //Insertar el inicio del arreglo
      this._historial.unshift(query);
      //Mantener solo 10 elementos
      if (this._historial.length > 10) {
        this._historial.pop();
      }
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    //Peticion a la API
    const params = new HttpParams()
                    .set('api_key', this.API_KEY)
                    .set('limit', '10')
                    .set('q', query);
    this.http.get<SearchGifsResponse>(`${this.URL}`, {params}).subscribe(resp => {
      this.resultados = resp.data;
      localStorage.setItem('resultadosGif', JSON.stringify(resp.data));
    });
  }

  borrarHistorial(){
    this._historial = [];
    localStorage.removeItem('historial');
  }
}
