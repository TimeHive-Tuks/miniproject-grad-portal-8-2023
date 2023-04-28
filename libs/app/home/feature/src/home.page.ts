import { Component, OnInit, Renderer2 } from '@angular/core';
import { IProfile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { SubscribeToAuthState } from '@mp/app/auth/util';
import { AuthState } from '@mp/app/auth/data-access';
import { User } from '@angular/fire/auth';
import { Logout } from '@mp/app/auth/util';
import { SharedPageComponent } from '@mp/app/shared/feature';
import { SubscribeToUserProfile } from '@mp/app/user-profile/util';//'../../util/src/user-profile.actions';

@Component({
  selector: 'ms-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;
  @Select(AuthState.user) authProfile$!: Observable<User | null>;

  displayName : any;
  username : any;
  email : any;
  complete : any;
  iconColor: any;
  route : any;
  shared : any;


  constructor(
    private router: Router,
    private readonly store: Store,
    private renderer: Renderer2,
    private alertController: AlertController,
    private menuCtrl?: MenuController
  ) {
    this.profile$.subscribe((profile)=>{
      console.log(profile);
    });

    

    this.shared = new SharedPageComponent(new AlertController, store);

    // this.shared.calculateTimeDifference();
    // this.shared.decreaseTime('hours', 'minutes', 'ses'); //It is no longer necessary to decrease the time since we have a due date from firestore.
    // this.shared.decreaseTime('hoursM', 'minutesM', 'sesM');
    

    this.authProfile$.subscribe((var2) => {
      if (var2) {
        if (var2.email) {
          this.email = var2.email;
          this.username = var2.email?.substring(
            0,
            var2.email.indexOf('@')
          );
        }

        if (var2.displayName ) {
          this.displayName = var2.displayName;
        }else{
          this.displayName = "invalid";
        }

      }

      this.profile$.subscribe((profile)=>{
        if(profile?.accountDetails?.email === this.email && profile?.accountDetails?.email){
          //something
        }else{
          // this.router.navigate(['home/settings/account-settings']);
          // this.presentAlert();
        }
      });
      
    });

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Time Out!',
      subHeader: 'Your time has run out.',
      message: 'Ask a friend to add more time for you.',
      buttons: ['Ask a friend'],
    });

    await alert.present();
  }

  ngOnInit() {
    
    this.store.dispatch(new SubscribeToAuthState()).subscribe((authstate) => {
      
      console.log(authstate);
    });

    console.log('var2');
    this.profile$.subscribe((user) => {
      console.log(user);
    });

    const colorTheme = localStorage.getItem('color-theme');

    if (colorTheme) {
      this.renderer.setAttribute(document.body, 'color-theme', colorTheme);
    }

    const activityStatusValue = localStorage.getItem('activityStatus');

    if (activityStatusValue === 'true') {
      this.iconColor = 'tertiary';
    } else {
      this.iconColor = 'danger';
    }
    
    

  }
  

  checkStatus(){
      console.log('checkStatus');
      const activityStatusValue=localStorage.getItem('activityStatus');
      if(activityStatusValue==='true'){
        this.iconColor='tertiary';
      }else{
        this.iconColor='danger';
      }
    }
  logout() {
    // this.popover.dismiss();
    this.store.dispatch(new Logout());
  }

  goToSearch() {
    this.router.navigate(['/home/search']);
  }

  goToChat() {
    this.router.navigate(['/home/inbox']);
  }

  goToFeed() {
    this.router.navigate(['/home/feed']);
  }

  goToNotifications() {
    this.router.navigate(['/home/notifications']);
  }

  goToPost() {
    this.router.navigate(['/home/post']);
  }

  goToChallenge() {
    this.router.navigate(['/home/challenge']);
  }

  goToSettings() {
    if (this.menuCtrl) {
      this.menuCtrl.close();
    }
    this.router.navigate(['/home/settings']);
  }

  goToProfile() {
    if (this.menuCtrl) {
      this.menuCtrl.close();
    }
    this.router.navigate(['/home/profile']);
  }

  checkFollowers() {
    // this.router.navigate(['/home/challenge']);
  }
  checkFollowing() {
    // this.router.navigate(['/home/challenge']);
  }

  goToLeaderboard() {
    // this.router.navigate(['/home/challenge']);
  }

  goToMyProfile() {
    if (this.menuCtrl) {
      this.menuCtrl.close();
    }
  
    this.router.navigate(['/home/userprofile']);
  }

  ngOnDestroy() {
    clearTimeout(this.shared.timeoutId);
  }
}
