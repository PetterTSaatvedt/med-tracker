import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { home, calendar, medkit  } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class AppComponent {
  constructor() {
    addIcons({home, calendar, medkit});
  }
}
