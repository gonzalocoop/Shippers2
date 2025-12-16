import { Injectable } from '@angular/core';
import emailjs from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private serviceID = 'service_1z34oza';
  private templateID = 'template_3pkl3ke';
  private publicKey = 'kHOTCI28CSYGUHPiP';

   constructor() {
    emailjs.init(this.publicKey);
  }

  enviarBienvenida(nombre: string, correo: string) {
    const params = {
      nombre: nombre,
      to_email: correo
    };

    return emailjs.send(
      this.serviceID,
      this.templateID,
      params
    );
  }
}
