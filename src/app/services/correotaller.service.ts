import { Injectable } from '@angular/core';
import emailjs from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class CorreotallerService {

  private serviceID = 'service_1z34oza';
  private templateID = 'template_ud9eqk4';
  private publicKey = 'kHOTCI28CSYGUHPiP';

   constructor() {
    emailjs.init(this.publicKey);
  }

  enviarTaller(titulo: string, correo: string, participantes:number, precio:number, taller_link_imagen:string, total:number) {
    const params = {
      taller_titulo: titulo,
      to_email: correo,
      participantes:participantes,
      precio:precio,
      taller_link_imagen:taller_link_imagen,
      total:total
    };

    return emailjs.send(
      this.serviceID,
      this.templateID,
      params
    );
  }
}
