import { Timestamp } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedState } from '@mp/app/feed/data-access';
import { FetchHomeFeed, FetchDiscoveryFeed} from '@mp/app/feed/util';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IPost } from '@mp/api/post/util';

import { IProfile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { SubscribeToProfile } from '@mp/app/profile/util';


@Component({
  selector: 'feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage {
  LHome!: boolean;
  LDiscovery!: boolean;

  text!: string;
  profileUrl="https://ionicframework.com/docs/img/demos/avatar.svg";
  userName!:string;
  now:Timestamp | null | undefined;
  challenge!:string;
  department!:string;
  profile!:IProfile;

  @Select(FeedState.getFeedPosts) post$! :Observable<IPost[]>;
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;
  feedPost:IPost[]=[];

  constructor(private router: Router,private readonly store: Store){
    this.LHome = true;
    this.LDiscovery = false;
    this.store.dispatch(new SubscribeToProfile());
    this.profile$.subscribe((profile) => {
      if(profile){
        this.profile = profile;
        const payload={
          uid:this.profile.userId
        };
        this.store.dispatch(new FetchHomeFeed(payload));
        this.post$.subscribe((posts) => {
          if(posts){
            this.feedPost = posts;
          }
        });
      }
    });
    this.homet();
  }

  Discoveryt(){
    this.LHome = false;
    this.LDiscovery = true;
    this.store.dispatch(new SubscribeToProfile());
    this.profile$.subscribe((profile) => {
      if(profile){
        this.profile = profile;
        const payload={
          uid:this.profile.userId
        };
        this.store.dispatch(new FetchDiscoveryFeed(payload));
        this.post$.subscribe((posts) => {
          if(posts != null)
            this.feedPost = posts;
        });
      }
    });
    // this.store.dispatch(new FetchDiscoveryFeed({uid:""}));
    this.displayFeed();
  }

  homet(){
    console.log("Home");
    this.LHome = true;
    this.LDiscovery = false;
    //this.store.dispatch(new FetchHomeFeed());
    
    this.store.dispatch(new SubscribeToProfile());
    this.profile$.subscribe((profile) => {
      if(profile){
        this.profile = profile;
        const payload={
          uid:this.profile.userId
        };

        this.store.dispatch(new FetchHomeFeed(payload));
        this.post$.subscribe((posts) => {
          if(posts != null)
            this.feedPost = posts;
        });
      }
    });
    // this.store.dispatch(new FetchHomeFeed({uid:""}));

    this.displayFeed();
  }

  displayFeed(){
    console.log("DISPLAY FEED");
    this.post$?.subscribe((res:any)=>{
      if(res!=null){
        this.feedPost=res;
        console.table(this.feedPost);
      }
        //this.feedPost=res;
    })
  }

  // toDate(date:Timestamp | null | undefined){
  //   //console.log(date);
  //   return "24 April";
  formatDateFromNanoseconds(seconds: number, nanoseconds: number): string {
    const date = new Date(seconds * 1000 + nanoseconds / 1000000);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  getProfileUrl(userId:string){
    return this.profileUrl;
  }

}
