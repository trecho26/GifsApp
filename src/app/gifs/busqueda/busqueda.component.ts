import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  @ViewChild('txtBusqueda') txtBusqueda!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) { }

  ngOnInit(): void {
  }

  buscar(termino: string){
    if (termino.trim().length === 0) {
      return;
    }
    this.gifsService.buscarGifs(termino);
    this.txtBusqueda.nativeElement.value = "";
  }

}
