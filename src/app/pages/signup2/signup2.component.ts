import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as english } from './i18n/en';

@Component({
  selector: 'app-signup2',
  templateUrl: './signup2.component.html',
  styleUrls: ['./signup2.component.scss']
})
export class Signup2Component implements OnInit {

  constructor(private translationLoader: FuseTranslationLoaderService) {
    this.translationLoader.loadTranslations(english);
  }

  ngOnInit() {
  }

}
