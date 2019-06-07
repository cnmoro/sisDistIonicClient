import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WsconnService {
  baseUrl = "http://192.168.1.32:8080/";
  listagemUrl = this.baseUrl + "sisdistWs/rest/transfers/listar";
  listagemDisponiveisUrl = this.baseUrl + "sisdistWs/rest/transfers/listar/disponiveis";
  reservaUrl = this.baseUrl + "sisdistWs/rest/transfers/reservar/";

  constructor(public http: HttpClient) {
    console.log('Hello WsconnProvider Provider');
  }

  listarTransfers(): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.listagemUrl, {})
        .subscribe(data => {
          resolve(data);
        }, error => {
          console.log("Erro Detalhado: " + JSON.stringify(error, Object.getOwnPropertyNames(error)));
          resolve(error);
        });
    });
  }

  listarTransfersDisponiveis(): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.listagemDisponiveisUrl, {})
        .subscribe(data => {
          resolve(data);
        }, error => {
          console.log("Erro Detalhado: " + JSON.stringify(error, Object.getOwnPropertyNames(error)));
          resolve(error);
        });
    });
  }

  reservarTransfer(id, datahr, itinerario): Promise<any> {
    return new Promise(resolve => {
      console.log("ip: " + this.baseUrl);
      this.http.get(this.reservaUrl + id + "/" + btoa(datahr) + "/" + btoa(itinerario) + "/", { responseType: 'text' })
        .subscribe(data => {
          resolve(data);
        }, error => {
          console.log("Erro Detalhado: " + JSON.stringify(error, Object.getOwnPropertyNames(error)));
          resolve(error);
        });
    });
  }

  setBaseIp(ip: string) {
    var ref = this;

    ref.baseUrl = "http://" + ip + ":8080/"
    ref.listagemUrl = ref.baseUrl + "sisdistWs/rest/transfers/listar";
    ref.listagemDisponiveisUrl = ref.baseUrl + "sisdistWs/rest/transfers/listar/disponiveis";
    ref.reservaUrl = ref.baseUrl + "sisdistWs/rest/transfers/reservar/";
  }

}
