import { Component } from '@angular/core';

interface Application {
  id: number;
  name: string;
  icon: string;
  desc: string;
  url: string;
}

@Component({
  selector: 'app-home-gateway',
  templateUrl: './home-gateway.component.html',
  styleUrls: ['./home-gateway.component.scss']
})
export class HomeGatewayComponent {
  index: number = 0
  applications: Application[] = [
    {
      id: 1,
      name: 'Autonomous Maintenance',
      icon: 'assets/image/app-am.png',
      desc: 'Total finding open/close.',
      url: './am'
    },
    {
      id: 2,
      name: 'Predictive Maintenance',
      icon: 'assets/image/app-pm.png',
      desc: 'Due date aktivitas predictive.',
      url: './pm'
    },
    {
      id: 3,
      name: 'Activity CILT',
      icon: 'assets/image/app-cilt.png',
      desc: 'Achievement aktivitas.',
      url: './cilt'
    },
    {
      id: 4,
      name: 'Stock Spareparts',
      icon: 'assets/image/app-stock.png',
      desc: 'Jumlah barang atau sparepart masuk/keluar.',
      url: './stockparts'
    },
    // Tambahkan data aplikasi lainnya di sini
  ];
}
