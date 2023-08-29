import { Component } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment.development';
import { AppsModalComponent } from './apps-modal/apps-modal.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-gateway',
  templateUrl: './home-gateway.component.html',
  styleUrls: ['./home-gateway.component.scss'],
})
export class HomeGatewayComponent {
  apps: any;
  userData: any;

  imageUrl = `${environment.API_URL}${environment.getImage}`;
  modalRef: MdbModalRef<AppsModalComponent> | null = null;

  isAdmin: boolean = false;

  isEditModeActive: boolean = false;

  isConnected: boolean = false

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private modalService: MdbModalService
  ) {}

  onLoading(): boolean {
    if (this.isConnected) {
      return true
    } else return false
  }

  ngOnInit(): void {
    this.userData = this.authService.getUserData()
    this.isAdmin = this.authService.isAdmin()
    this.getAllApps();
  }

  openEditMode() {
    if (!this.isEditModeActive) {
      this.isEditModeActive = true;
    } else this.isEditModeActive = false;
  }

  openLogoutModal() {
    const modalData = {
      title: `Log Out`
    };
    this.setModal(modalData)
  }

  openAddModal() {
    if (!this.isAdmin) {
      return;
    } else {
      const modalData = {
        title: `Add Application`,
      };
      this.setModal(modalData);
    }
  }

  openEditModal(appData: any) {
    const modalData = {
      title: `Edit Application`,
      appData: {
        app_id: appData.app_id,
        name: appData.name,
        icon: appData.icon,
        description: appData.description,
        url: appData.url,
      },
    };
    this.setModal(modalData);
  }

  setModal(modalData: object) {
    this.modalRef = this.modalService.open(AppsModalComponent, {
      data: modalData,
      modalClass: 'modal-dialog-scrollable',
    });
    this.modalRef.onClose.subscribe((success: boolean) => {
      if (success) {
        this.getAllApps();
      }
    });
  }

  onFavoriteAppClick(app: any) {
    if (app.custom_id !== null) {
      console.log("Custom id touched: " + app.custom_id);
      this.deleteFavoriteApp(app.custom_id)
    } else {
      const customAppData = { 
        user_id: this.userData.id,
        app_id: app.app_id,
        custom_order: 1
       }
       this.insertFavoriteApp(customAppData)
    }
  }

  getAllApps() {
    if (this.userData.id !== undefined) {
      this.isConnected = true
      this.apiService.getCustomApps(this.userData.id).subscribe(
        (res: any) => {
          if (res.status) {
            this.apps = res.data;
            this.isConnected = true
            console.log(res)
          } else {
            console.error(`${res.data.message}`);
            // setTimeout(() => {
            //   this.isConnected = false
            // }, 1000)
            
          }
        },
        (error) => {
          console.error(`Failed to get apps. Error: ${error}`)
          // setTimeout(() => {
          //   this.isConnected = false
          // }, 1000)
        }
      );
    }
  }

  insertFavoriteApp(data: any) {
    if (this.userData.id !== undefined) {
      this.apiService.insertCustomApp(data).subscribe(
        (res: any) => {
          if (res.status) {
            this.getAllApps()
          }
        },
        (error) => {
          console.error("Failed to insert application. Error: " + error)
        }
      )
    }
  }

  deleteFavoriteApp(customId: number) {
    if (customId !== null) {
      this.apiService.deleteCustomApp(customId).subscribe(
        (res: any) => {
          if (res.data == 1) {
            this.getAllApps()
          } else console.error("Failed to delete application. Error: custom_id not found!")
        },
        (error) => {
          console.error("Failed to delete application. Error: ", error)
        }
      )
    }
  }
}
