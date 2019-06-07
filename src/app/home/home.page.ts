import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { WsconnService } from '../wsconn.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  transferList: [] = [];

  datahr;
  itinerario;
  id;

  constructor(private toastCtrl: ToastController, public wsProvider: WsconnService, public alertCtrl: AlertController) {

  }

  ngOnInit() {
    var ref = this;

    ref.loadTransfers();
  }

  async doRefresh(event) {
    var ref = this;

    setTimeout(() => {
      event.target.complete();
    }, 1200);

    ref.loadTransfers();
  }

  loadTransfers() {
    var ref = this;

    ref.wsProvider.listarTransfers().then(result => {
      for (let i = 0; i < result.length; i++) {
        if (result[i].reservado == true) {
          result[i].reservado = "Sim";
        }
        if (result[i].reservado == false) {
          result[i].reservado = "Não";
        }
      }
      ref.transferList = result;
    })
    .catch((err) => {
      console.log("Erro Detalhado goToOcorrenciaCompleta: " + JSON.stringify(err, Object.getOwnPropertyNames(err)));
    });
  }

  async reservarTransferGetData(id) {
    var ref = this;

    const prompt = await ref.alertCtrl.create({
      header: 'Reserva',
      message: "Insira a data desejada",
      inputs: [
        {
          name: 'data',
          placeholder: 'Ex: 10/10/2019 15:00'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            ref.datahr = null;
            ref.itinerario = null;
            ref.id = null;
          }
        },
        {
          text: 'Ok',
          handler: data => {
            ref.id = id;
            ref.datahr = data.data;
            ref.reservarTransferGetItinerario();
          }
        }
      ]
    });
    prompt.present();
  }

  async reservarTransferGetItinerario() {
    var ref = this;

    const prompt = await ref.alertCtrl.create({
      header: 'Reserva',
      message: "Insira o itinerário desejado",
      inputs: [
        {
          name: 'data',
          placeholder: 'Ex: Shopping -> Aeroporto'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            ref.datahr = null;
            ref.itinerario = null;
            ref.id = null;
          }
        },
        {
          text: 'Reservar',
          handler: data => {
            ref.itinerario = data.data;
            ref.reservarTransfer();
          }
        }
      ]
    });
    prompt.present();
  }

  reservarTransfer() {
    var ref = this;

    ref.wsProvider.reservarTransfer(ref.id, ref.datahr, ref.itinerario).then(result => {
      console.log(result);
      if (result.includes("Sucesso")) {
        ref.toast("Transfer reservado com sucesso!");
        ref.loadTransfers();
      } else {
        ref.toast("Este transfer já está reservado.");
      }
    })
    .catch((err) => {
      console.log("Erro Detalhado goToOcorrenciaCompleta: " + JSON.stringify(err, Object.getOwnPropertyNames(err)));
    });
  }

  async toast(msg) {
    var ref = this;

    let toast = await ref.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'middle'
    });

    toast.present();
  }

  async openIpConfig() {
    var ref = this;

    const prompt = await ref.alertCtrl.create({
      header: 'Mudar IP',
      message: "Insira o IP",
      inputs: [
        {
          name: 'data',
          placeholder: 'Ex: 192.168.1.5'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
          }
        },
        {
          text: 'Ok',
          handler: data => {
            ref.wsProvider.setBaseIp(data.data);
            ref.loadTransfers();
          }
        }
      ]
    });
    prompt.present();
  }

}